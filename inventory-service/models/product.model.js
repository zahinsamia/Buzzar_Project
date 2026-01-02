const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Price cannot be negative
  },
  imageUrl: {
    type: String,
    required: false 
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 1
  },
  category: {
    type: String,
    required: true,
    trim: true
  },

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
 
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Compile and export the Product model
module.exports = mongoose.model('Product', productSchema);