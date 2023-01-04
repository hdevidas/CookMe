/* Configuration pour la connexion à la base de données */
const mongoose = require('mongoose'); 
require('dotenv').config(); /* Pour l'utilisation des variables d'environnement */

/* Fonction pour la connexion à la base de données */
async function connectDB() {
    try {
        console.log("Opening connection");
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL + '/' + process.env.DB_NAME, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(err) { 
        mongoose.disconnect();
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
