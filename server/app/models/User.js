const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); 

/* 
    User data schema:
    -> email: user's email address
    -> password : user's password
    -> pantry : the user's pantry (ingredients in his possession)
*/
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pantry : {type: [String], required : false}
});

userSchema.plugin(uniqueValidator); // Management of mail uniqueness

module.exports = mongoose.model('User', userSchema);