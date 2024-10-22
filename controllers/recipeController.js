const Recipe = require('../models/recipeModel');

// Create a new recipe
const createRecipe = async (recipeData) => {
  const recipe = new Recipe(recipeData); // Create a new Recipe instance with validated data
  await recipe.save(); // Save the recipe to the database
  return recipe; // Return the saved recipe
};

// API controller methods
const recipeController = {
  createRecipe: async (req, res) => {
    try {
      const newRecipe = await createRecipe(req.body); // Call the createRecipe function
      res.status(201).json(newRecipe); // Return the created recipe
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all recipes with pagination
  getRecipes: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const recipes = await Recipe.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      const count = await Recipe.countDocuments();

      res.json({
        recipes,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single recipe by ID
  getRecipeById: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
      res.json(recipe);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a recipe by ID
  updateRecipe: async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
      res.json(updatedRecipe);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a recipe by ID
  deleteRecipe: async (req, res) => {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
      res.json({ message: 'Recipe deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

// Export the controller methods
module.exports = recipeController;
