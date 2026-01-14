// 1. Import Dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const { auth, isVendor } = require("./middleware/auth");

// 2. Initialize Express App
const app = express();
const PORT = process.env.PORT || 3002;

// 3. Add Middleware
app.use(express.json());

// 4. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully for Inventory Service"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/**
 * =========================
 * PUBLIC (CUSTOMER) ROUTES
 * =========================
 */

// Get all products (Customer browsing)
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * =========================
 * VENDOR ROUTES
 * =========================
 */

// Get products belonging to logged-in vendor
app.get("/api/vendor/products", [auth, isVendor], async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.user.id });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create product
app.post("/api/products", [auth, isVendor], async (req, res) => {
  try {
    const { name, description, price, images, stock, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      images: images || [],
      stock,
      category,
      vendorId: req.user.id, // 🔐 ownership enforced
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update product (OWNERSHIP ENFORCED)
app.put("/api/products/:id", [auth, isVendor], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔐 OWNERSHIP CHECK
    if (product.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: Not your product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete product (OWNERSHIP ENFORCED)
app.delete("/api/products/:id", [auth, isVendor], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔐 OWNERSHIP CHECK
    if (product.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: Not your product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 6. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Inventory Service running on http://localhost:${PORT}`);
});























