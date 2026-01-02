// 1. Import Dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const Cart = require("./models/cart.model");
const authMiddleware = require("./middleware/auth");

// 2. Initialize Express App
const app = express();
const PORT = process.env.PORT || 3003;

// 3. Middleware
app.use(express.json());

// 4. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected for Cart Service"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/**
 * @route   GET /api/cart
 * @desc    Get logged-in user's cart
 * @access  Private
 */
app.get("/api/cart", authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [],
        subtotal: 0,
      });
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   POST /api/cart/add
 * @desc    Add product to cart (vendorId resolved server-side)
 * @access  Private
 */
app.post("/api/cart/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    // 🔐 Fetch product from inventory-service
    const productRes = await axios.get(
      `http://localhost:3002/api/products/${productId}`
    );

    const { name, price, vendorId } = productRes.data;

    console.log("PRODUCT FROM INVENTORY:", productRes.data);

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        subtotal: 0,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        vendorId,
        name,
        price,
        quantity,
      });
    }

    


    // Recalculate subtotal
    cart.subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Cart add error:", err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   DELETE /api/cart/clear
 * @desc    Clear user's cart
 * @access  Private
 */
app.delete("/api/cart/clear", authMiddleware, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 6. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Cart Service running on http://localhost:${PORT}`);
});





