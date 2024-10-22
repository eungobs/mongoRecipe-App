const express = require('express');
const Recipe = require('../models/recipeModel'); // Import the Recipe model
const recipeSchema = require('../validators/recipeValidator'); // Import the validation schema
const recipeController = require('../controllers/recipeController'); // Import the controller

const router = express.Router();

// POST route to create a recipe using the controller method
router.post('/', recipeController.createRecipe); // Use the createRecipe method from the controller

// GET route to retrieve all recipes
router.get('/', recipeController.getRecipes); // GET /api/recipes

// GET route to retrieve a recipe by ID
router.get('/:id', recipeController.getRecipeById); // GET /api/recipes/:id

// PUT route to update a recipe by ID
router.put('/:id', recipeController.updateRecipe); // PUT /api/recipes/:id

// DELETE route to remove a recipe by ID
router.delete('/:id', recipeController.deleteRecipe); // DELETE /api/recipes/:id

module.exports = router; // Export the router
