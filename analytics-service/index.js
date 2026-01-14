require('dotenv').config();
const axios = require('axios');
const express = require('express');
const { auth, isVendor, isAdmin } = require('./middleware/auth'); // Import our bouncers

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



/**
 * @route   GET /api/analytics/admin
 * @desc    (ADMIN) Get system-wide analytics
 * @access  Private (Admin only)
 */
app.get('/api/analytics/admin', [auth, isAdmin], async (req, res) => {
  try {
    const token = req.header('x-auth-token');

    // 1️⃣ Get order analytics from checkout-service
    const ordersRes = await axios.get(
      'http://localhost:3004/api/orders/analytics/admin',
      {
        headers: {
          'x-auth-token': token
        }
      }
    );

    // 2️⃣ Get all users from account-service
    const usersRes = await axios.get(
      'http://localhost:3001/api/users',
      {
        headers: {
          'x-auth-token': token
        }
      }
    );

    // 3️⃣ Count vendors
    const totalVendors = usersRes.data.filter(
      (u) => u.role === 'Vendor'
    ).length;

    // 4️⃣ Final aggregated response
    res.json({
      totalOrders: ordersRes.data.totalOrders,
      totalRevenue: ordersRes.data.totalRevenue,
      totalVendors,
      topVendors: ordersRes.data.topVendors
    });

  } catch (err) {
    console.error('Admin analytics error:', err.message);
    res.status(500).json({ message: 'Failed to fetch admin analytics' });
  }
});




// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Analytics Service running on http://localhost:${PORT}`);
});