const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Log a message to the console on successful connection, including the MongoDB host
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // If there is an error during the connection attempt, log the error message
    console.error(`Error: ${error.message}`);
    
    // Exit the process with failure (status code 1) to stop the app from running when the database connection fails
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
