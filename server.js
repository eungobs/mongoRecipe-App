const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes"); // Import authentication routes
const errorHandler = require("./middleware/errorHandler"); // Import the error handler

// Load environment variables
dotenv.config();

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Read secret from .env
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // MongoDB session store
  cookie: {
    maxAge: 1000 * 60 * 60 // Session valid for 1 hour
  }
}));

// Recipe routes
app.use("/api/recipes", recipeRoutes);

// Authentication routes
app.use("/api/auth", authRoutes); // All auth routes will be prefixed with /api/auth

// Error handling middleware - catches all errors
app.use(errorHandler); 

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
