// 1. Import Dependencies
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('./models/user.model'); // Import the User model
const {auth, isAdmin} = require('./middleware/auth'); // Import auth middleware
const jwt = require('jsonwebtoken'); // For JWT token generation
// 2. Initialize Express App
const app = express();
const PORT = process.env.PORT || 3001; // Port for this service

// 3. Add Middleware
// This parses incoming JSON request bodies
app.use(express.json());

// 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully for Account Service");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

// 5. Define API Routes

/**
 * @route   GET /
 * @desc    Test route to check if service is running
 */
app.get('/', (req, res) => {
  res.send('Account Service is running!');
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
app.post('/api/auth/register', async (req, res) => {
  try {
    // 1. Destructure username, email, and password from request body
    const { username, email, password, role } = req.body;

    // 2. Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists with that email" });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create a new user instance
    user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    // 5. Save the new user to the database
    await user.save();

    // 6. Send a success response
    res.status(201).json({ 
      message: "User registered successfully",
      userId: user._id 
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});






/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token (Login)
 * @access  Public
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. User is valid! Create a JWT Payload
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };

    // 5. Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '3h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token back to the client
      }
    );

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


/**
 * @route   GET /api/users/me
 * @desc    Get current logged-in user's profile
 * @access  Private
 */
app.get('/api/users/me', auth, async (req, res) => {
  try {
    // 1. req.user.id was added by our authMiddleware
    // 2. Find the user in the DB but *exclude* their password from the data we send back
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


/**
 * @route   GET /api/users
 * @desc    (ADMIN) Get all users
 * @access  Private (Admin only)
 */
app.get('/api/users', [auth, isAdmin], async (req, res) => {
  try {
    // Find all users but *don't* return their passwords
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE /api/users/:id
 * @desc    (ADMIN) Delete a user
 * @access  Private (Admin only)
 */
app.delete('/api/users/:id', [auth, isAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});







// 6. Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Account Service listening on port ${PORT}`);
});





