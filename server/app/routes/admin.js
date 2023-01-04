const express = require('express');
const router = express.Router();

const adminCtrl = require("../controllers/admin");
const userCtrl = require("../controllers/user");
const security = require('../middleware/security'); /* Pour l'application du middleware de Vérification de l'auth du user */

// Create a new admin
router.post('/admin/signup', adminCtrl.signup);

router.post('/admin/login', adminCtrl.login);

// Retrieve all Users
router.get("/users", security, userCtrl.findAll);

module.exports = router;