const Joi = require('joi'); // Import Joi for schema validation

// Define the validation schema for recipes using Joi
const recipeSchema = Joi.object({
  title: Joi.string() // Validate 'title' as a string
    .min(3) // Minimum length of 3 characters for the title
    .required() // Title field is required
    .messages({
      'string.empty': 'Title is required', // Custom message when title is empty
      'string.min': 'Title must be at least 3 characters long', // Custom message for minimum length
    }),
  
  ingredients: Joi.array() // Validate 'ingredients' as an array
    .items(Joi.string().required()) // Each item in the array must be a required string
    .min(1) // The array must contain at least one ingredient
    .required() // Ingredients field is required
    .messages({
      'array.base': 'Ingredients must be an array', // Custom message if ingredients is not an array
      'array.min': 'At least one ingredient is required', // Custom message if array is empty
    }),
  
  instructions: Joi.string() // Validate 'instructions' as a string
    .required() // Instructions field is required
    .messages({
      'string.empty': 'Instructions are required', // Custom message when instructions are empty
    }),
  
  cookingTime: Joi.number() // Validate 'cookingTime' as a number
    .min(1) // Minimum value must be at least 1
    .required() // Cooking time field is required
    .messages({
      'number.base': 'Cooking time must be a number', // Custom message if cooking time is not a number
      'number.min': 'Cooking time must be at least 1 minute', // Custom message for minimum cooking time
    }),
});

// Export the validation schema
module.exports = recipeSchema; 