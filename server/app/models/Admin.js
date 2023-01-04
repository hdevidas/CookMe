const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator'); /* Package permettant de gerer l'unicité d'un champ donné(objet unique) */

/* Description des informations concernant un utilisateur(email, mdp...) */
const adminSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

adminSchema.plugin(uniqueValidator); /* Gestion de l'unicité du mail */

module.exports = mongoose.model('Admin', adminSchema);