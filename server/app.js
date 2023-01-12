const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 

const connectDb = require('./app/config/db'); 
const defaultRoute = require('./app/routes/index')
const adminRoutes = require('./app/routes/admin');
const userRoutes = require('./app/routes/user'); 
const recipeRoutes = require('./app/routes/recipe');


connectDb(); // Connect to the database 

const app = express();

// Allows external access to resources otherwise we have the famous CORS ERROR
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());


// Calling the different routes of the api
app.use('/api/cookme', defaultRoute);
app.use('/api/cookme', adminRoutes); 
app.use('/api/cookme', userRoutes); 
app.use('/api/cookme', recipeRoutes); 

module.exports = app;