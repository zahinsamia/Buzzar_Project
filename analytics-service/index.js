require('dotenv').config();
const express = require('express');
const { auth, isVendor } = require('./middleware/auth'); // Import our bouncers

const app = express();
// A new port for our 6th service
const PORT = process.env.PORT || 3005; 

app.use(express.json());

/**
 * @route   GET /api/analytics/vendor
 * @desc    (VENDOR) Get mock analytics data
 * @access  Private (Vendor only)
 */
app.get('/api/analytics/vendor', [auth, isVendor], (req, res) => {
  // This is a "mock" or "stub" response.
  // We are sending fake data to prove the endpoint works.
  const mockAnalytics = {
    totalSales: 12500.75,
    totalOrders: 82,
    topProducts: [
      { name: "Stylish Blue Jeans", sales: 150 },
      { name: "Premium Hoodie", sales: 95 }
    ],
    salesOverTime: [
      { date: "2025-11-01", amount: 1200 },
      { date: "2025-11-02", amount: 1500 },
      { date: "2025-11-03", amount: 1100 }
    ]
  };

  res.json(mockAnalytics);
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Analytics Service running on http://localhost:${PORT}`);
});