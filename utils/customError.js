// utils/customError.js

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);  // Call the parent class (Error) constructor
    this.statusCode = statusCode;  // Add a custom statusCode property
  }
}

module.exports = CustomError;
