const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String], // Changed to an array of strings
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // Ensure this field is required
  },
});

// Export the Recipe model
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

