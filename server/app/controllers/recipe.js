const fetch = require('node-fetch');
const User = require('../models/User');

const USerTools = require('../tools/userTool.js');

NUMBER_RECIPE_MAX_TO_DISPLAY = 4;

let recipeListWithScore = []
let recipesToSend = []

// Give a random recipe from the external api
exports.getRandomRecipe = async (req, res) => {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  const response = await fetch(url);
  if (!response.ok) {
    res.status(response.status).send({message : `HTTP error on external api at ${newUrl}`});
    return;
  }
  const data = await response.json();
  //console.log(data); /* Affichage des données */
  res.send(data);
};

// Retrieve all ingredients with a term from the external api
exports.getIngredientList = async (req, res) => {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list?";
  const term = req.params.term;
  const response = await fetch(url);
  if (!response.ok) {
    res.status(response.status).send({message : `HTTP error on external api at ${newUrl}`});
    return;
  }
  const data = await response.json();
  const ingredient=new Array(); 

  for (let i = 0; i<574; i++){
    ingredient.push(data.meals[i].strIngredient.toLowerCase())
  }
  //ingredientSortedWithTerm(term,ingredient);
  res.send(ingredientSortedWithTerm(term,ingredient));
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

//Retrieve a specific number of recipes (constant number) and sort them by scoring them with pantry user
exports.getRecipeList = async (req, res) => {
  let recipeListWithScore = []
  let recipesToSend = []
  const ingr = req.params.ingredient;
  const id = req.params.id;
  let userDetails = await USerTools.findUser(id);
  if(userDetails.error){
    res.status(userDetails.getStatus()).send({message : userDetails.getMessage()});
    return;
  }
  let MyPantry = userDetails.getPantry();
  
  // recupères tous les menus avec l'ingrédient donné de l'api.
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
  let ingredient = req.params.ingredient;
  const newUrl = url.concat('', ingredient)
  const response = await fetch(newUrl);
  if (!response.ok) {
    res.status(response.status).send({message : `HTTP error on external api at ${newUrl}`});
    return;
  }
  const recipeList = await response.json()
 
  for (index in recipeList.meals){
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let name = recipeList.meals[index].strMeal;
    const newUrl = url.concat('', name)
    const response = await fetch(newUrl);
    if (!response.ok) {
      res.status(response.status).send({message : `HTTP error on external api at ${newUrl}`});
      return;
    }
    const recipe = await response.json();
    let recipeWithScore = [recipe,getScore(recipe,MyPantry)]
    //console.log(recipeWithScore);
    recipeListWithScore.push(recipeWithScore);
  }
  recipeListWithScore.sort(functionComp);
  recipesToSend = recipeListWithScore.slice(0, NUMBER_RECIPE_MAX_TO_DISPLAY);
  res.send(recipesToSend);
};

//Retrieve a recipe by his name from the external api
exports.getRecipe = async (req, res) => {
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  let name = req.params.name;
  const newUrl = url.concat('', name)
  const response = await fetch(newUrl);
  if (!response.ok) {
    res.status(response.status).send({message : `HTTP error on external api at ${newUrl}`});
    return
  }
  const data = await response.json();
  res.send(data);
};

exports.getRecipePersonaliedWithPantry = async (req, res) => {
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  let name = req.params.name;
  let id = req.params.id;
  const newUrl = url.concat('', name)
  const response = await fetch(newUrl);
  if (!response.ok) {
    res.status(response.status).send({message : `HTTP error on external api at ${newUrl}`});
    return;
  }
  const data = await response.json();
  let userDetails = await USerTools.findUser(id);
  if(userDetails.error){
    res.status(userDetails.getStatus()).send({message : userDetails.getMessage()});
    return;
  }
  let meal = await extractMealData(data,userDetails.getPantry());
  res.send(meal);
}

async function extractMealData(data, pantry) {
  let name = data.meals[0].strMeal;
  let instructions = data.meals[0].strInstructions;
  //TODO unutile d'utiliser le formatage puisqu'il est vraiment moche, cela n'apporte rien. 
  //let instructions = formatInstructions(data.meals[0].strInstructions);
  let img = data.meals[0].strMealThumb;

  let ingredients = [];
  let pantryIngredients = [];

  for (let i = 0; i<20;i++){
    let ingredient = data.meals[0]["strIngredient"+(i+1)];
    if (ingredient == null) ingredient = "";
    let measure = data.meals[0]["strMeasure"+(i+1)];
    if (measure == null) measure = "";
    let mesuredIngredient = measure.concat(' ',ingredient);
    //check if ingredient if already in the pantry
    if (isIn(pantry,ingredient) < 0){ 
      //ingredient is not in the pantry
      ingredients.push(mesuredIngredient);
    }
    else {
      //ingredient if in the user pantry
      pantryIngredients.push(mesuredIngredient);
    }
  }
  
  let meal = {"name" : name, "instructions" : instructions, "img" : img, "ingredients" : ingredients.toString(), "pantryIngredients" : pantryIngredients.toString()};

  return meal;
}

function formatInstructions(data){
  let instructions = [];
  if (data.startsWith('STEP')){
    let tmpInstructions = data.split('STEP ');
    for (let i = 0 ;  i < tmpInstructions.length ; ++i){
      let text = tmpInstructions.at(i).toString();
      // TODO enlever les lignes vides au debut. Ce qui est en dessus n'a aucun effet...
      //if (text != "")
      instructions.push(text.substring(2));
    }
  }
  else 
    instructions = data.split('.');

  return instructions;

  //TODO pour enlever les espaces au debut des lignes quand i y en a. Ce qui est en dessus n'a aucun effet..
  /*let finalInstructions = []
  for (let i = 0 ; i < instructions.length ; ++i){
    let tmp = instructions.at(i);
    while(tmp.startsWith(' ') || tmp.startsWith(" ") || tmp.startsWith("\n")){
      tmp = tmp.substring(1);
    }
    finalInstructions.push(tmp);
  }
  return finalInstructions;*/
}

function isIn(pantry, ingredient){
  for (let i = 0; i < pantry.length; ++i){
    if (pantry.at(i).localeCompare(ingredient, 'en', { sensitivity: 'base' }) == 0)
    return i;
    
  }
  return -1;
}

//Auxiliary function : give a score to a recipe with user pantry
function getScore(data,pantry){
  let numberIngredientsTotal=0
  let numberIngredientsFromUser =0

  for (let i=1;i<=20;i++){
    if (data.meals[0]["strIngredient"+i] != null && data.meals[0]["strIngredient"+i] != "" ){
      numberIngredientsTotal++;
      if (pantry.includes(data.meals[0]["strIngredient"+i].toLowerCase())){
        numberIngredientsFromUser ++;
      }
    }
  }
  let score;
  /*if (numberIngredientsFromUser==0){
    score = 0;
    numberIngredientsFromUser++;
  }*/
  score = Math.round(numberIngredientsFromUser/numberIngredientsTotal*100)
  return score;
};

//Comparaiso function to sort recipe array by score
function functionComp(a,b){
  let scoreA = a[1];
  let scoreB = b[1]; 
  return scoreB - scoreA;
};