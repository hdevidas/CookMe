const express = require('express');
const router = express.Router();

const userCtrl = require("../controllers/user.js");


// Create a new User
router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

// Retrieve all Users
router.get("/users", userCtrl.findAll);

// Retrieve a single User with id
router.get("/login/:id", userCtrl.findOne);

// Update an User with id
router.put("/login/:id", userCtrl.update);

// Delete an User with id
router.delete("/login/:id", userCtrl.delete);

// Create a new User
router.delete("/users", userCtrl.deleteAll);


module.exports = router;