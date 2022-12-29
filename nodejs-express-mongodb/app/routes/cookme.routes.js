module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const recipe = require("../controllers/recipe.controller.js");

  var router = require("express").Router();

  // ------ Users ---------
  // Create a new User
  router.post("/user", users.create);

  // Retrieve all Users
  router.get("/users", users.findAll);

  // Retrieve a single User with id
  router.get("/user/:id", users.findOne);

  // Update an User with id
  router.put("/user/:id", users.update);

  // Delete an User with id
  router.delete("/user/:id", users.delete);

  // Create a new User
  router.delete("/users", users.deleteAll);
  
  // ------ Users ---------
  // Retrieve a sample recipe
  router.get("/recipe", recipe.getRandomRecipe);

  app.use("/api/cookme", router);
};
