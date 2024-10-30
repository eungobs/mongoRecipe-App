// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Store user info in session
    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role, // Include role in session
    };

    res.json({ message: "Logged in successfully", user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
