const fetch = require('node-fetch');
const USerTools = require('../tools/userTool.js');

exports.addIngredient = async (req,res) => {
  let user = await USerTools.findUser(req.body.id);
  if(user.error){
    res.status(user.getStatus()).send({message : user.getMessage()});
    return;
  }   
  user.addToPantry(req.body.pantry);
  let update = await USerTools.updateUser(req.body.id, { pantry: user.getPantry() })
  res.status(update.status).send({message : update.message});

}

exports.setRandomPantry = async (req,res) => {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list?";
  const response = await fetch(url);
      
  if (!response.ok) {
    res.status(response.status).send({message : `HTTP error on external api at ${newUrl}`});
    return;
  }
  const apiIngredients = await response.json();
  let ingredients = new Array(); 
  for (let i = 0; i<574; i++){
    ingredients.push(apiIngredients.meals[i].strIngredient.toLowerCase())
  }
  let pantry = [];
  for(let i = 0; i < 150; ++i) {
    let randomNumber = Math.floor(Math.random() * 450) + 1;
    pantry.push(ingredients[randomNumber]);
  }
  let update = await USerTools.updateUser(req.body.id, { "pantry": pantry })
  res.status(update.status).send({message : update.message});
  
}

exports.removeIngredient = async (req,res) => {
  let user = await USerTools.findUser(req.body.id);
  if(user.error){
    res.status(user.getStatus()).send({message : user.getMessage()});
    return;
  }
  let element = req.body.pantry.toString();
  let pantry = user.getPantry();
  let ingredients = [];
  for(let i = 0; i < pantry.length; ++i){
    if (pantry.at(i) != element){
      ingredients.push(pantry.at(i));
    }
  }
  let update = await USerTools.updateUser(req.body.id, { "pantry": ingredients })
  res.status(update.status).send({message : update.message});
}

exports.removeAllIngredients = async (req,res) => {
  let update = await USerTools.updateUser(req.body.id, { pantry: [] })
  res.status(update.status).send({message : update.message});
}
