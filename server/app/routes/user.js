const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator'); // For the validation of the mail before launching the query in the database.

const userCtrl = require("../controllers/user.js");
const pantryCtrl = require("../controllers/pantry.js")
const security = require('../middleware/security'); // For the application of the user authentication verification middleware


// Route for user registration
router.post(
    '/signup',

    body('email', 'It must be an email address, please use a correct email address!').isEmail(), 

    check('password', 'The password must be 8+ chars long and contain a number')
        .not()
        .isIn(['12345678', 'password'])
        .withMessage('Do not use a common word as the password')
        .isLength({ min: 8 })
        .matches(/\d/),
    
    userCtrl.signup
);

// Route for the user login
router.post(
    '/login',
    body('email', 'It must be an email address, please use a correct email address!').isEmail(),
    userCtrl.login
);

// Retrieve all Users
router.get("/users", security, userCtrl.findAll);

// Retrieve a single User with id
router.get("/login/:id", security, userCtrl.findOne);

// Update an User with id
router.put("/login/:id",
    security,
    body('data', 'It must be an email address, please use a correct email address!').isEmail(),
    userCtrl.update
);

// Delete an User with id
router.delete("/login/:id", security, userCtrl.delete);

// Remove all users
router.delete("/users", security, userCtrl.deleteAll);

// Add an ingredient to the User logged
router.put('/pantry/add', pantryCtrl.addIngredient);

// Add random ingredients to the User logged
router.put('/pantry/random', pantryCtrl.setRandomPantry);

// Remove an ingredient to the User logged
router.put('/pantry/remove', pantryCtrl.removeIngredient);

// Remove all ingredients to the User logged
router.put('/pantry/removeall', pantryCtrl.removeAllIngredients);

module.exports = router;