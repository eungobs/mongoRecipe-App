// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { validateUserInput } = require("../validators/userValidators");
const User = require('../models/userModel'); // Adjust the path as needed


const router = express.Router();
const jwtSecret = "your_jwt_secret"; // Replace with an environment variable for production

// User registration route
router.post(
  "/register",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

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

// User login route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
