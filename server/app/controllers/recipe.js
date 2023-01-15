const fetch = require('node-fetch');

const USerTools = require('../tools/userTool.js');
const TheMealDbTool = require('../tools/TheMealDbTool');

const NUMBER_RECIPE_MAX_TO_DISPLAY = 4;


// Give a random recipe from the external api
exports.getRandomRecipe = async (req, res) => {
  let apiResponce = await TheMealDbTool.getdataFromApi('random.php');
  if (apiResponce.error) {
    res.status(apiResponce.getStatus()).send({message : apiResponce.getMessage()});
    return;
  }
  res.send(apiResponce.getData());
  
  
};

// Retrieve all ingredients with a term from the external api
exports.getIngredientList = async (req, res) => {
  let apiResponce = await TheMealDbTool.getdataFromApi('list.php?i=list?');
  if (apiResponce.error) {
    res.status(apiResponce.getStatus()).send({message : apiResponce.getMessage()});
    return;
  }
  let dbIngredients = apiResponce.getData().meals;
  let ingredients = [];
  for (let i = 0; i < dbIngredients.length; ++i){
      ingredients.push(dbIngredients[i].strIngredient.toLowerCase());
  }
  const term = req.params.term;
  res.send(ingredientSortedWithTerm(term,ingredients));
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
  let recipeListWithScore = [];
  let recipesToSend = [];
  const id = req.params.id;
  let userDetails = await USerTools.findUser(id);
  if(userDetails.error){
    res.status(userDetails.getStatus()).send({message : userDetails.getMessage()});
    return;
  }
  let MyPantry = userDetails.getPantry();
  
  // recupères tous les menus avec l'ingrédient donné de l'api.
  let ingredient = req.params.ingredient;
  let apiResponce = await TheMealDbTool.getdataFromApi('filter.php?i='.concat('', ingredient));
  if (apiResponce.error) {
    res.status(apiResponce.getStatus()).send({message : apiResponce.getMessage()});
    return;
  }
  const recipeList = apiResponce.getData();

  for (index in recipeList.meals){
    let name = recipeList.meals[index].strMeal;
    let apiResponce = await TheMealDbTool.getdataFromApi('search.php?s='.concat('', name));
    if (apiResponce.error) {
      res.status(apiResponce.getStatus()).send({message : apiResponce.getMessage()});
      return;
    }
    const recipe = apiResponce.getData();
    let recipeWithScore = [recipe,getScore(recipe,MyPantry)]
    recipeListWithScore.push(recipeWithScore);
  }
  recipeListWithScore.sort(functionComp);
  recipesToSend = recipeListWithScore.slice(0, NUMBER_RECIPE_MAX_TO_DISPLAY);
  res.send(recipesToSend);
};

//Retrieve a recipe by his name from the external api
exports.getRecipe = async (req, res) => {
  let name = req.params.name;
  let apiResponce = await TheMealDbTool.getdataFromApi('search.php?s='.concat('', name));
  if (apiResponce.error) {
    res.status(apiResponce.getStatus()).send({message : apiResponce.getMessage()});
    return;
  }
  const data = apiResponce.getData();
  res.send(data);
};

exports.getRecipePersonaliedWithPantry = async (req, res) => {
  let name = req.params.name;
  let apiResponce = await TheMealDbTool.getdataFromApi('search.php?s='.concat('', name));
  if (apiResponce.error) {
    res.status(apiResponce.getStatus()).send({message : apiResponce.getMessage()});
    return;
  }
  const data = apiResponce.getData();

  let id = req.params.id;
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