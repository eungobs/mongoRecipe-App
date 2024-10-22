const Recipe = require('../models/recipeModel');
const CustomError = require('../utils/customError');

// Create a new recipe
const createRecipe = async (recipeData) => {
  const recipe = new Recipe(recipeData); // Create a new Recipe instance with validated data
  await recipe.save(); // Save the recipe to the database
  return recipe; // Return the saved recipe
};

// API controller methods
const recipeController = {
  // Create a recipe
  createRecipe: async (req, res, next) => {
    try {
      const newRecipe = await createRecipe(req.body); // Call the createRecipe function
      res.status(201).json(newRecipe); // Return the created recipe
    } catch (error) {
      next(new CustomError('Failed to create recipe', 400)); // Pass to error handler
    }
  },

  // Get all recipes with pagination
  getRecipes: async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, 10 items per page

    try {
      // Convert query params to integers
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);

      // Get the total count of documents in the collection
      const totalCount = await Recipe.countDocuments();

      // Calculate the number of items to skip for pagination
      const skip = (pageNumber - 1) * pageSize;

      // Fetch the paginated recipes
      const recipes = await Recipe.find().limit(pageSize).skip(skip);

      // Return paginated response
      res.json({
        recipes,                   // Array of recipes
        totalItems: totalCount,     // Total number of recipes
        totalPages: Math.ceil(totalCount / pageSize),  // Total pages based on limit
        currentPage: pageNumber,    // Current page number
        pageSize: pageSize,         // Items per page
      });
    } catch (error) {
      next(new CustomError('Failed to fetch recipes', 500)); // Handle server-side errors
    }
  },

  // Get a single recipe by ID
  getRecipeById: async (req, res, next) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return next(new CustomError('Recipe not found', 404)); // Handle not found error
      }
      res.json(recipe);
    } catch (error) {
      next(new CustomError('Failed to retrieve recipe', 400)); // Handle invalid request
    }
  },

  // Update a recipe by ID
  updateRecipe: async (req, res, next) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRecipe) {
        return next(new CustomError('Recipe not found', 404)); // Recipe not found
      }
      res.json(updatedRecipe);
    } catch (error) {
      next(new CustomError('Failed to update recipe', 400)); // Handle errors
    }
  },

  // Delete a recipe by ID
  deleteRecipe: async (req, res, next) => {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!deletedRecipe) {
        return next(new CustomError('Recipe not found', 404)); // Recipe not found
      }
      res.json({ message: 'Recipe deleted' });
    } catch (error) {
      next(new CustomError('Failed to delete recipe', 400)); // Handle errors
    }
  },
};

// Export the controller methods
module.exports = recipeController;
