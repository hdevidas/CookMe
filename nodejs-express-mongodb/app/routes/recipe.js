const express = require('express');
const router = express.Router();

const recipeCtrl = require("../controllers/recipe.js");

// Retrieve a sample recipe
router.get("/recipe", recipeCtrl.getRandomRecipe);

// Retrieve list of ingredients with a specific term
router.get("/ingredients/:term", recipeCtrl.getIngredientList);





module.exports = router;