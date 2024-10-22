// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
  res.status(statusCode).json({
    message: err.message || 'An unknown error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Show stack trace in development
  });
};

module.exports = errorHandler;
