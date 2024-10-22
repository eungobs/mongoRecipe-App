# Recipe App RESTful API

## Overview

This project is a RESTful API for a Recipe App built using Node.js, Express, and MongoDB. It provides endpoints to manage recipes, including creating, retrieving, updating, and deleting recipes. The API also includes pagination for efficiently handling large datasets, error handling, and input validation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Error Handling and Validation](#error-handling-and-validation)
- [Testing the API](#testing-the-api)

## Features

- **CRUD Operations**: Create, Read, Update, and Delete recipes.
- **Pagination**: Efficiently manage large datasets with pagination.
- **Error Handling**: Graceful handling of errors with informative messages.
- **Input Validation**: Validate input data for required fields and data types.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/eungobs/mongoRecipe-App.git
   cd recipe-app
Install dependencies:


npm install
Install Nodemon globally for automatic server restarts:

npm install -g nodemon
Set up your MongoDB database. If you're using MongoDB Atlas, create a cluster and get the connection string. Replace your_mongo_uri in the .env file.

Configuration
Create a .env file in the root directory with the following content:

plaintext
Copy code
MONGO_URI=your_mongo_uri
PORT=5000
MONGO_URI: Your MongoDB connection string.
PORT: The port on which the server will run (default is 5000).
Running the Application
To start the server using Nodemon, run:

nodemon server.js
Nodemon will monitor your files for changes and automatically restart the server, allowing for a smoother development experience.

API Endpoints
The API provides the following endpoints:

1. Create a New Recipe
POST /api/recipes

Request Body:
{
  "title": "Spaghetti Carbonara",
  "ingredients": ["spaghetti", "eggs", "cheese", "bacon"],
  "instructions": "Cook spaghetti, mix with beaten eggs and cheese, add bacon.",
  "cookingTime": 30
}
Response:

201 Created: Recipe created successfully.
400 Bad Request: Validation errors.
2. Get All Recipes with Pagination
GET /api/recipes?page=1&limit=10

Query Parameters:

page: The page number (default is 1).
limit: Number of recipes per page (default is 10).
Response:

200 OK: List of recipes with pagination details.
3. Get a Recipe by ID
GET /api/recipes/:id

Response:

200 OK: Recipe details.
404 Not Found: Recipe not found.
4. Update a Recipe by ID
PUT /api/recipes/:id

Request Body:
{
  "title": "Spaghetti Carbonara with Mushrooms",
  "ingredients": ["spaghetti", "eggs", "cheese", "bacon", "mushrooms"],
  "instructions": "Cook spaghetti, mix with beaten eggs and cheese, add bacon and mushrooms.",
  "cookingTime": 35
}
Response:

200 OK: Updated recipe details.
404 Not Found: Recipe not found.
400 Bad Request: Validation errors.
5. Delete a Recipe by ID
DELETE /api/recipes/:id

Response:

204 No Content: Recipe deleted successfully.
404 Not Found: Recipe not found.
Error Handling and Validation
The API handles errors gracefully and provides informative error messages for validation failures. Input data is validated for:

Required fields (e.g., title, ingredients).
Data types (e.g., strings, numbers).
Custom validation rules (e.g., checking for valid data formats).
Testing the API
You can test the API using Postman or Insomnia:


Start the server:

nodemon server.js
Use the provided endpoints in Postman or Insomnia to send requests.

Verify the responses for each endpoint.
