/* Configuration pour la connexion à la base de données */
const mongoose = require('mongoose'); 

/* Variables pour la connexion à la BD */
const DB_NAME = 'cookme_db'
const MONGO_URL = 'mongodb://localhost:27017';


async function connectDB() {
    try {
        console.log("Opening connection");
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(MONGO_URL + '/' + DB_NAME, {
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
