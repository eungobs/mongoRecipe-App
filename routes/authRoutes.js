// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { validateUserInput } = require('../validators/userValidators'); // Import the validation function

// User registration route
router.post('/register', (req, res) => {
  try {
    const validInput = validateUserInput(req.body);
    // Proceed with registration using validInput
    res.status(201).json({ message: 'User registered successfully!', data: validInput });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Send validation error response
  }
});

module.exports = router; // Export the router
