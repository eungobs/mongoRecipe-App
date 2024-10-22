const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const errorHandler = require('./middleware/errorHandler'); // Import the error handler

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Recipe routes
app.use('/api/recipes', recipeRoutes);

// Error handling middleware - catches all errors
app.use(errorHandler); 

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
