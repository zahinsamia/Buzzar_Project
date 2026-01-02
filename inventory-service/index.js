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
    const { name, description, price, imageUrl, stock, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
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



























// // 1. Import Dependencies
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const Product = require("./models/product.model"); // Import Product model
// const { auth, isVendor } = require("./middleware/auth"); // Import auth middleware

// // 2. Initialize Express App
// const app = express();
// // CRITICAL: *different port* for each service
// const PORT = process.env.PORT || 3002;

// // 3. Add Middleware
// app.use(express.json()); // This parses incoming JSON request bodies

// // 4. Connect to MongoDB (Uses the same MONGO_URI)
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully for Inventory Service");
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // 5. Define API Routes for UC005 (Browse Item)

// /**
//  * @route   GET /api/products
//  * @desc    Get a list of all products
//  * @access  Public
//  */
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// /**
//  * @route   GET /api/products/:id
//  * @desc    Get a single product by its ID
//  * @access  Public
//  */
// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.json(product);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// // --- VENDOR ROUTE ---
// // Create products (Vendor only)
// /**
//  * @route   POST /api/products
//  * @desc    (VENDOR) Create a new product (owned by the logged-in vendor)
//  * @access  Private (Vendor only)
//  */
// app.post("/api/products", [auth, isVendor], async (req, res) => {
//   try {
//     const { name, description, price, imageUrl, stock, category } = req.body;

//     // ✅ vendorId MUST come from the token, not the body
//     const vendorId = req.user.id;

//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       imageUrl,
//       stock,
//       category,
//       vendorId, // ✅ FIX
//     });

//     const product = await newProduct.save();
//     res.status(201).json(product);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// /**
//  * @route   PUT /api/products/:id
//  * @desc    (VENDOR) Update a product
//  * @access  Private (Vendor only)
//  */
// app.put("/api/products/:id", [auth, isVendor], async (req, res) => {
//   try {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // (Next step later) Ownership check: product.vendorId === req.user.id

//     product = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );

//     res.json(product);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// /**
//  * @route   DELETE /api/products/:id
//  * @desc    (VENDOR) Delete a product
//  * @access  Private (Vendor only)
//  */
// app.delete("/api/products/:id", [auth, isVendor], async (req, res) => {
//   try {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // (Next step later) Ownership check: product.vendorId === req.user.id

//     await Product.findByIdAndDelete(req.params.id);

//     res.json({ message: "Product removed successfully" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // 6. Start the Server
// app.listen(PORT, () => {
//   console.log(`🚀 Inventory Service running on http://localhost:${PORT}`);
// });


