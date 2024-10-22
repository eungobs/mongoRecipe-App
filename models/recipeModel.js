const mongoose = require('mongoose'); // Import mongoose for database interaction

// Define the schema for the 'Recipe' collection
const recipeSchema = new mongoose.Schema({
  title: {
    type: String, // Title must be a string
    required: [true, 'Title is required'], // Title is mandatory, with a custom error message if missing
    minlength: [3, 'Title must be at least 3 characters long'], // Title must have at least 3 characters
  },
  ingredients: {
    type: [String], // Ingredients must be an array of strings
    required: [true, 'Ingredients are required'], // Ingredients are mandatory
    validate: {
      validator: function (v) {
        return v.length > 0; // Custom validation: Ensure there's at least one ingredient
      },
      message: 'At least one ingredient is required', // Error message if validation fails
    },
  },
  instructions: {
    type: String, // Instructions must be a string
    required: [true, 'Instructions are required'], // Instructions are mandatory, with a custom error message
  },
  cookingTime: {
    type: Number, // Cooking time must be a number
    required: [true, 'Cooking time is required'], // Cooking time is mandatory
    min: [1, 'Cooking time must be at least 1 minute'], // Cooking time must be at least 1 minute
  },
});

// Create the model from the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe; // Export the Recipe model for use in other files
