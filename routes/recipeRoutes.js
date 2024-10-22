// routes/recipeRoutes.js
const express = require('express');
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

const router = express.Router();

// Recipe Routes
router.post('/url', createRecipe);
router.get('/url', getRecipes);
router.get('/url/:id', getRecipeById);
router.put('/url/:id', updateRecipe);
router.delete('/url/:id', deleteRecipe);

module.exports = router;
