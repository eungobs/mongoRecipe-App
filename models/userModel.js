// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Email must be unique
  },
  password: {
    type: String,
    required: true, // Store hashed password
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

