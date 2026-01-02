const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [
    {
      productId: String,
      vendorId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  // --- THIS IS THE PART THAT WAS CAUSING THE ERROR ---
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'], // <--- 'Paid' MUST be here
    default: 'Pending'
  },
  // --------------------------------------------------
  paymentMethod: {
    type: String,
    default: 'Not Selected'
  },
  transactionId: {
    type: String
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);




























// const mongoose = require('mongoose');


// const orderItemSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1
//   }
// });

// const orderSchema = new mongoose.Schema({
//   // Link to the customer who placed the order
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User' // A reference to the User model (even though it's in another service)
//   },
  
//   // A copy of all items at the time of purchase
//   items: [orderItemSchema],

//   // Final calculated total price for the order
//   totalPrice: {
//     type: Number,
//     required: true,
//     min: 0
//   },

//   // Shipping information provided by the user
//   shippingAddress: {
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     country: { type: String, required: true }
//   },


//   paymentStatus: {
//     type: String,
//     required: true,
//     enum: ['Pending', 'Completed', 'Failed'], // Only allows these values
//     default: 'Pending'
//   },
  
//   // Order status for tracking
//   orderStatus: {
//     type: String,
//     required: true,
//     enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
//     default: 'Pending'
//   }
// }, {
//   timestamps: true // Adds createdAt and updatedAt
// });

// // Compile and export the Order model
// module.exports = mongoose.model('Order', orderSchema);