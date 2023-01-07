const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator'); /* Pour la validation du mail avant de lancer la requête dans la bd */

const userCtrl = require("../controllers/user.js");
const pentryCtrl = require("../controllers/pentry.js")
const security = require('../middleware/security'); /* Pour l'application du middleware de Vérification de l'auth du user */

// Create a new User
router.post(
    '/signup',

    body('email', 'It must be an email address, please use a correct email address!').isEmail(), /* Pour la validation du mail */

    check('password', 'The password must be 9+ chars long and contain a number') /* Pour la validation du mot de passe */
        .not()
        .isIn(['12345678', 'password'])
        .withMessage('Do not use a common word as the password')
        .isLength({ min: 8 })
        .matches(/\d/),
    
    userCtrl.signup
);

router.post('/login', body('email').isEmail(), userCtrl.login);

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