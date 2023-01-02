const express = require('express');
const router = express.Router();

const recipeCtrl = require("../controllers/recipe.js");

// Retrieve a sample recipe
router.get("/recipe", recipeCtrl.getRandomRecipe);

// Retrieve list of ingredients with a specific term
router.get("/ingredients/:term", recipeCtrl.getIngredientList);

// Retrieve list of recipes with a specific ingredient
router.get("/recipes/:ingredient", recipeCtrl.getRecipeList);

// Retrieve a recipe by his name
router.get("/recipe/:name", recipeCtrl.getRecipe);


module.exports = router;