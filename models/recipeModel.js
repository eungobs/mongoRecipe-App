// models/recipeModel.js
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String], // Array of strings
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);

