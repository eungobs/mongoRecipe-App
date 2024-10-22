// models/recipeModel.js
const mongoose = require('mongoose'); // Add this line to import mongoose

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe must have a title']
  },
  ingredients: {
    type: [String],
    required: [true, 'Recipe must have ingredients']
  },
  instructions: {
    type: String,
    required: [true, 'Recipe must have instructions']
  },
  cookingTime: {
    type: Number,
    required: [true, 'Recipe must have a cooking time']
  },
  servings: {
    type: Number,
    required: [true, 'Recipe must have servings']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

