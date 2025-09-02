// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const sanitizeHtml = require('sanitize-html');

// // JWT secret key - should be in environment variables in production
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// // Sanitize function to prevent XSS
// const sanitize = (input) => {
//   if (!input) return input;
//   return sanitizeHtml(input, {
//     allowedTags: [],      // No HTML tags allowed
//     allowedAttributes: {} // No attributes allowed
//   });
// };

// // Register a new user with password
// router.post('/', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     // Sanitize inputs to prevent XSS
//     const sanitizedName = sanitize(name);
//     const sanitizedEmail = email ? String(email).trim().toLowerCase() : '';
    
//     // Validate input
//     if (!sanitizedName || !sanitizedEmail || !password) {
//       return res.status(400).json({ message: 'Name, email and password are required' });
//     }
    
//     if (password.length < 6) {
//       return res.status(400).json({ message: 'Password must be at least 6 characters long' });
//     }
    
//     // Check if user already exists
//     const existingUser = await User.findOne({ email: sanitizedEmail });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }
    
//     // Create new user with sanitized input
//     const newUser = new User({ 
//       name: sanitizedName, 
//       email: sanitizedEmail, 
//       password 
//     });
//     const savedUser = await newUser.save();
    
//     // Generate JWT token
//     const token = jwt.sign(
//       { id: savedUser._id, email: savedUser.email },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );
    
//     // Return user data without password
//     res.status(201).json({
//       _id: savedUser._id,
//       name: savedUser.name,
//       email: savedUser.email,
//       token
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get all users (exclude passwords)
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find()
//       .select('-password')
//       .sort({ createdAt: -1 });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Secure login route with password verification
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // Sanitize email to prevent XSS
//     const sanitizedEmail = email ? String(email).trim().toLowerCase() : '';
    
//     // Validate input
//     if (!sanitizedEmail || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }
    
//     // Find user by email
//     const user = await User.findOne({ email: sanitizedEmail });
    
//     // Use consistent error messages to prevent user enumeration
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );
    
//     // Return user data without password
//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create new user
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login route (check if user exists)

router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
