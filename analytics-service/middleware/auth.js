const jwt = require('jsonwebtoken');

// Bouncer #1: Checks for a valid token
const auth = (req, res, next) => {
  // 1. Get the token from the request header
  const token = req.header('x-auth-token');

  // 2. Check if no token was sent
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Try to verify the token
  try {
    // 4. Decode the token and get the payload (which has user.id and user.role)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Add the user's info to the request object
    req.user = decoded.user;
    
    // 6. Let the request continue
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Bouncer #2: Checks if the user's role is 'Vendor'
// (This bouncer *must* run *after* the 'auth' bouncer)
const isVendor = (req, res, next) => {
  if (req.user.role !== 'Vendor') {
    return res.status(403).json({ message: 'Access denied: Vendor role required' });
  }
  next();
};

// 🆕 Bouncer #3: Checks if the user's role is 'Admin'
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied: Admin role required' });
  }
  next();
};

// Export *both* bouncers so our index.js can use them
module.exports = {
  auth,
  isVendor,
  isAdmin
};