// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/userModel'); // Import your User model
const { validateUserInput } = require('../validators/userValidators'); // Validation for login input

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
  try {
    const validInput = validateUserInput(req.body); // Validate input
    const hashedPassword = await bcrypt.hash(validInput.password, 10); // Hash password
    const newUser = new User({
      email: validInput.email,
      password: hashedPassword, // Store hashed password
    });

    await newUser.save(); // Save user to the database
    res.status(201).json({ message: 'User registered successfully!', data: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // If email and password are valid, log the user in
    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
