const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator'); /* Package permettant de gerer l'unicité d'un champ donné(objet unique) */

/* Description des informations concernant un utilisateur(email, mdp...) */
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); /* Gestion de l'unicité du mail */

module.exports = mongoose.model('User', userSchema);