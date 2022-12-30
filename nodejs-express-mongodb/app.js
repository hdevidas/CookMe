const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 

const connectDb = require('./app/config/db.config'); 
const userRoutes = require('./app/routes/cookme.routes'); 


connectDb(); /* Connexion à la BD */

const app = express();

/* Ajout des middlewares(fonctions) */

// Permet d'autoriser l'accès aux ressources sinon on a la fammeuse ERRRUR DE CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());

app.use('/api/cookme', userRoutes); /* Utilisation des middlewares se trouvant dans le dossier routes */

module.exports = app;