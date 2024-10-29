const Joi = require('joi');

// Custom validation for email format
const emailValidation = Joi.string()
  .email({ tlds: { allow: false } }) // Customize TLDs if needed
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
  });

// Custom validation for password strength
const passwordValidation = Joi.string()
  .min(8) // Minimum 8 characters
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // At least one letter and one number
  .required()
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one letter and one number',
    'string.empty': 'Password is required',
  });

// Define schema using custom validation rules
const userSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

// Function to validate user input
const validateUserInput = (userInput) => {
  const { error, value } = userSchema.validate(userInput);
  if (error) {
    throw new Error(error.details[0].message); // Return first validation error
  }
  return value; // Return validated data
};

// Export the function
module.exports = { validateUserInput };