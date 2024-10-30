const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { loginUser } = require('../controllers/authController'); // Ensure this path is correct
const User = require('../models/userModel'); // Adjust the path as needed
require('dotenv').config(); // Load environment variables

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET; // Access the JWT secret from the environment variable

// User registration route
router.post(
  "/register",
  [
    check("username", "Username is required").notEmpty(), // Add validation for username
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body; // Ensure username is destructured from the request body

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      user = new User({
        username, // Include username here
        email,
        password: hashedPassword
      });

      await user.save();

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

      res.status(201).json({ message: "User registered successfully!", token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// User login route (using the controller function)
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  loginUser // Use the imported loginUser function
);

module.exports = router; // Export the router
