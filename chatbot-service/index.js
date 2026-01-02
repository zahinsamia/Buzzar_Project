require('dotenv').config();
const express = require('express');
const axios = require('axios'); // Tool to call other services
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { auth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * @route   POST /api/chat
 * @desc    (CUSTOMER) Smart AI Sales Assistant
 * @access  Private
 */
app.post('/api/chat', auth, async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ response: "Please type a message." });
  }

  try {
    // STEP 1: Fetch Real Inventory Data
    // The chatbot asks the Inventory Service: "What are we selling today?"
    // (We assume Inventory Service is running on port 3002)
    let productList = [];
    try {
      const inventoryResponse = await axios.get('http://localhost:3002/api/products');
      productList = inventoryResponse.data;
    } catch (error) {
      console.error("Could not fetch inventory:", error.message);
      // Fallback if inventory service is down
      productList = [{ name: "Error fetching products", price: 0 }];
    }

    // STEP 2: Build the "Context" for the AI
    // We limit the data to just name, price, and description to save tokens
    const simplifiedProducts = productList.map(p => 
      `- ${p.name} ($${p.price}): ${p.description}`
    ).join('\n');

    const prompt = `
      ROLE: You are "Buzzar AI", a helpful and enthusiastic fashion sales assistant.
      
      GOAL: Help the customer find the perfect product based on their needs.
      
      RULES:
      1. ONLY recommend products from the "Current Inventory" list below. Do not make up items.
      2. If they ask for an outfit or bundle, suggest matching items and calculate the total price.
      3. Be friendly and concise. Use emojis like 👕, 🧢, ✨.
      
      CURRENT INVENTORY:
      ${simplifiedProducts}
      
      CUSTOMER MESSAGE: "${message}"
      
      YOUR RESPONSE:
    `;

    // STEP 3: Ask Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // STEP 4: Send answer back to user
    res.json({ 
      userMessage: message,
      botResponse: text,
      timestamp: new Date()
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "My brain is tired. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Smart Chatbot running on http://localhost:${PORT}`);
});