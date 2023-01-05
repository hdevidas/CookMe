const express = require('express');
const router = express.Router();

const userCtrl = require("../controllers/user.js");
const pentryCtrl = require("../controllers/pentry.js")
const security = require('../middleware/security'); /* Pour l'application du middleware de Vérification de l'auth du user */

// Create a new User
router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

// Retrieve all Users
router.get("/users", security, userCtrl.findAll);

// Retrieve a single User with id
router.get("/login/:id", security, userCtrl.findOne);

// Update an User with id
router.put("/login/:id", security, userCtrl.update);

// Delete an User with id
router.delete("/login/:id", security, userCtrl.delete);

// Create a new User
router.delete("/users", security, userCtrl.deleteAll);

//change pentry's ingredients
router.post('/ingredients/change', pentryCtrl.changePentry);

//remove a ingredient if present
router.post('/ingredients/remove', pentryCtrl.removeIngredients);



module.exports = router;