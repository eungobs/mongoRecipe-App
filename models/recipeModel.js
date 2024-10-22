const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long'],
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
    validate: {
      validator: function (v) {
        return v.length > 0; // Ensure array has at least one ingredient
      },
      message: 'At least one ingredient is required',
    },
  },
  instructions: {
    type: String,
    required: [true, 'Instructions are required'],
  },
  cookingTime: {
    type: Number,
    required: [true, 'Cooking time is required'],
    min: [1, 'Cooking time must be at least 1 minute'],
  },
});

// Create the model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe; // Export the Recipe model
