const express = require('express');
const router = express.Router();

const recipeCtrl = require("../controllers/recipe.js");

// Retrieve a sample recipe
router.get("/recipe", recipeCtrl.getRandomRecipe);


module.exports = router;