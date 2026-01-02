// 1. Import Dependencies
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/order.model');       // Import our Order model
const {auth, isVendor} = require('./middleware/auth'); // Import our "bouncer"


// 2. Initialize Express App
const app = express();
// CRITICAL: A new port for a new service
const PORT = process.env.PORT || 3004; 

// 3. Add Middleware
app.use(express.json());

// 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully for Checkout Service");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// 5. Define API Routes for UC007 (Checkout)

/**
 * @route   POST /api/checkout
 * @desc    Create a new order from the user's cart and shipping info
 * @access  Private
 */
app.post('/api/checkout', auth, async (req, res) => {
  try {
    // 1. Get user ID from the token
    const userId = req.user.id; 

    // 2. Get order details from request body
    const { items, totalPrice, shippingAddress } = req.body;

    // 3. Create a new order object
    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      shippingAddress
      // paymentStatus and orderStatus will use the defaults ('Pending')
    });

    // 4. Save the new order to the database
    const savedOrder = await newOrder.save();

    // 5. (Future Step) After this, the frontend would be responsible
    // for clearing the cart in the cart-service.
    
    // 6. Send the new order back as confirmation
    res.status(201).json(savedOrder);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


/**
 * @route   GET /api/orders/my
 * @desc    (CUSTOMER) Get logged-in user's orders
 * @access  Private
 */
app.get('/api/orders/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// /**
//  * @route   GET /api/orders
//  * @desc    (VENDOR) Get all orders
//  * @access  Private (Vendor only)
//  */
// app.get('/api/orders', [auth, isVendor], async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 }); // Newest first
//     res.json(orders);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

/**
 * @route   GET /api/vendor/orders
 * @desc    (VENDOR) Get orders containing this vendor's items only
 * @access  Private (Vendor)
 */
app.get('/api/vendor/orders', [auth, isVendor], async (req, res) => {
  try {
    const vendorId = req.user.id;

    // 1️⃣ Find orders that contain at least one item from this vendor
    const orders = await Order.find({
      "items.vendorId": vendorId
    }).sort({ createdAt: -1 });

    // 2️⃣ For each order, keep ONLY this vendor's items
    const filteredOrders = orders.map(order => {
      const vendorItems = order.items.filter(
        item => item.vendorId.toString() === vendorId
      );

      const vendorTotal = vendorItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        _id: order._id,
        userId: order.userId,
        items: vendorItems,
        totalPrice: vendorTotal,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt
      };
    });

    res.json(filteredOrders);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


/**
 * @route   PUT /api/orders/:id/status
 * @desc    (VENDOR) Update an order's status
 * @access  Private (Vendor only)
 */
app.put('/api/orders/:id/status', [auth, isVendor], async (req, res) => {
  const { orderStatus } = req.body; 

  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/checkout/payment
 * @desc    (CUSTOMER) Process a REAL Stripe Payment (Test Mode)
 * @access  Private
 */
app.post('/api/checkout/payment', auth, async (req, res) => {
  const { orderId } = req.body; 

  try {
    // 1. Find the order
    let order = await Order.findById(orderId);

    
    if (!order) return res.status(404).json({ message: 'Order not found' });
    //if (order.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized: IDs do not match' });
    
    // Convert both to strings to be 100% sure
if (order.userId.toString() !== req.user.id.toString()) {
    return res.status(403).json({ message: 'Unauthorized: IDs do not match' });
}

    if (order.paymentStatus === 'Paid') return res.status(400).json({ message: 'Order already paid' });

    // 2. TALK TO STRIPE
    const charge = await stripe.charges.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'myr',
      source: 'tok_visa', 
      description: `Buzzar Order #${order._id}`
    });

    // 3. Update DB
    if (charge.status === 'succeeded') {
      order.paymentStatus = 'Paid';
      order.paymentMethod = 'Stripe / Credit Card';
      order.transactionId = charge.id;
      
      await order.save();

      res.json({
        message: 'Payment Successful',
        stripeReceipt: charge.receipt_url,
        order: order
      });
    } else {
      res.status(400).json({ message: 'Payment Failed at Stripe' });
    }

  } catch (err) { // <--- This was likely missing!
    console.error(err.message);
    res.status(500).json({ message: 'Payment Error', error: err.message });
  }
});




/**
 * @route   GET /api/orders/:id
 * @desc    (CUSTOMER) Get a specific order (Track Order)
 * @access  Private (Owner only)
 */
app.get('/api/orders/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // SECURITY CHECK: Ensure the user requesting is the OWNER of the order
    if (order.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: Not your order' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
});




// 6. Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Checkout Service running on http://localhost:${PORT}`);
});