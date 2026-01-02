const jwt = require('jsonwebtoken');

// This is our "bouncer" function
module.exports = function(req, res, next) {
  // 1. Get the token from the request header
  const token = req.header('x-auth-token');

  // 2. Check if no token was sent
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Try to verify the token
  try {
    // 4. Decode the token and get the payload (which has our user.id)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Add the user's ID to the request object
    req.user = decoded.user;
    
    // 6. Call "next()" to let the request continue to its final destination
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};