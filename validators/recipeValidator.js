const Joi = require('joi');

// Define the validation schema
const recipeSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters long',
    }),
  ingredients: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      'array.base': 'Ingredients must be an array',
      'array.min': 'At least one ingredient is required',
    }),
  instructions: Joi.string()
    .required()
    .messages({
      'string.empty': 'Instructions are required',
    }),
  cookingTime: Joi.number()
    .min(1)
    .required()
    .messages({
      'number.base': 'Cooking time must be a number',
      'number.min': 'Cooking time must be at least 1 minute',
    }),
});

// Export the validation schema
module.exports = recipeSchema;
