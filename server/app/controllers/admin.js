/* Gestion de la logique metier concernant l'inscription et la connexion de l'utilisateur */
const bcrypt = require('bcrypt'); /* Importation du package pour le hashage du mot de passe */
const jwt = require('jsonwebtoken'); /* Importation du package pour la gestion des tokens */

const Admin = require('../models/Admin');


// Create and save a new admin
exports.signup = (req, res) => {
    if (Admin.count() === 0) {
        bcrypt.hash(req.body.password, 15)
            .then(hash => {
                const admin = new Admin({
                    email: req.body.email,
                    password: hash
                });
                admin.save()
                    .then( () => res.status(201).json({ message: 'The administrator account has been successfully created.'}) )
                    .catch( error => res.status(400).json({ message: 'Some error occurred.' }) );     
            })
            .catch(error => res.status(500).json({ message: "Some error occurred." }));
    } else {
        res.status(500).json({ message: 'Some error occurred.'})
    }
};

/* Pour la connexion d'un admin
    -> Vérification de l'existance de l'admin
    -> Vérification de la validité des informations renseingées
    -> Utilisation d'un token pour l'admin
 */
exports.login = (req, res, next) => {
    Admin.findOne({ email: req.body.email })
        .then(admin => {
            if (admin === null)
                res.status(401).json({ message: 'Incorrect email/password' });
            else
                bcrypt.compare(req.body.password, admin.password)
                    .then(valid => {
                        if (!valid)
                            res.status(401).json({ message: 'Incorrect email/password' });
                        else
                            res.status(200).json({
                                adminId: admin._id,
                                token: jwt.sign(
                                    { adminId: admin._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            })
                    })
                    .catch(error => {res.status(500).json({ message: 'Incorrect email/password' })});
        })
        .catch(error => {res.status(500).json({ message: 'Some error occurred.' })});
};
