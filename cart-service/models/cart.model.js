const mongoose = require('mongoose');

// This is the schema for a single item *inside* the cart
const cartItemSchema = new mongoose.Schema({
  productId: {
    // We will just store the ID from the inventory-service
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
   vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

// This is the schema for the cart itself
const cartSchema = new mongoose.Schema({
  // CRITICAL: This links the cart to a user in the 'User' collection
  // This ID will come from the user's JWT token
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true, // Each user has only one cart
    ref: 'User' // This technically references a model, but for microservices, it's just an ID
  },
  items: [cartItemSchema], // The cart holds an array of cart items
  
  subtotal: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compile and export the Cart model
module.exports = mongoose.model('Cart', cartSchema);