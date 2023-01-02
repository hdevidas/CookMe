const fetch = require('node-fetch');

// Give a random recipe from the external api
exports.getRandomRecipe = async (req, res) => {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  
  try {
      const response = await fetch(
        url
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error : ${response.status}`);
      }
      const data = await response.json();
      //console.log(data); /* Affichage des données */
      res.send(data);
  } catch (error) {
      console.error(`Could not get data: ${error}`);
  }
};

// Retrieve all ingredients with a term from the external api
exports.getIngredientList = async (req, res) => {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list?";
  const term = req.params.term;
  try {
      const response = await fetch(
        url
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error : ${response.status}`);
      }
      const data = await response.json();
      const ingredient=new Array(); 

      for (let i = 0; i<574; i++){
        ingredient.push(data.meals[i].strIngredient.toLowerCase())
      }
      //console.log(ingredient);
      ingredientSortedWithTerm(term,ingredient);
      res.send(ingredientSortedWithTerm(term,ingredient));
  } catch (error) {
      console.error(`Could not get data: ${error}`);
  }
};

//Auxiliary function for "getIngredientList"
function ingredientSortedWithTerm(term,ingredient) {
  const ingredientSorted = new Array();
  ingredient.forEach(element => {
    if (element.includes(term)){
      ingredientSorted.push(element)
    }
  })
  return ingredientSorted;
};

//Retrieve all recipes with a specific ingredient from the external api
exports.getRecipeList = async (req, res) => {
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
  let ingredient = req.params.ingredient;
  const newUrl = url.concat('', ingredient)
  try {
      const response = await fetch(newUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error : ${response.status}`);
      }
      const data = await response.json();
      //console.log(data);
      res.send(data);
  } catch (error) {
      console.error(`Could not get data: ${error}`);
  }
};
