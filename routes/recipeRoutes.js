const express = require('express');
const Recipe = require('../models/recipeModel'); // Import the Recipe model
const { check, validationResult } = require("express-validator"); // Import validation functions
const recipeController = require('../controllers/recipeController'); // Import the controller

const router = express.Router();

// POST route to create a recipe using the controller method
router.post(
  '/',
  [
    check("title", "Title is required").notEmpty(),
    check("ingredients", "Ingredients are required").notEmpty(),
    check("instructions", "Instructions are required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, ingredients, instructions } = req.body;

    try {
      // Create a new recipe
      const newRecipe = new Recipe({
        title,
        ingredients,
        instructions,
      });

      await newRecipe.save();
      res.status(201).json({ message: "Recipe added successfully!", recipe: newRecipe });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
); // Use the createRecipe method from the controller

// GET route to retrieve all recipes
router.get('/', recipeController.getRecipes); // GET /api/recipes

// GET route to retrieve a recipe by ID
router.get('/:id', recipeController.getRecipeById); // GET /api/recipes/:id

// PUT route to update a recipe by ID
router.put('/:id', recipeController.updateRecipe); // PUT /api/recipes/:id

// DELETE route to remove a recipe by ID
router.delete('/:id', recipeController.deleteRecipe); // DELETE /api/recipes/:id

module.exports = router; // Export the router
