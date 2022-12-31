/* Gestion de la logique metier concernant l'inscription et la connexion de l'utilisateur */
const bcrypt = require('bcrypt'); /* Importation du package pour le hashage du mot de passe */
const jwt = require('jsonwebtoken'); /* Importation du package pour la gestion des tokens */

const User = require('../models/User');


// Create and Save a new User
exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then( () => res.status(201).json({ message: 'Your account has been successfully created, you can now login using your email and password!'}) )
              .catch( error => res.status(400).json({ message: 'Already exists' }) );
        })
    .catch(error => res.status(500).json({ message: error.message || "Some error occurred while creating the User."  }));
  };

/* Pour la connexion d'un utilisateur
    -> Vérification de l'existance de l'utilisateur 
    -> Vérification de la validité des informations renseingées
    -> Utilisation d'un token pour l'utilisateur
 */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null)
                res.status(401).json({ message: 'Incorrect information (email and password)' });
            else
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid)
                            res.status(401).json({ message: 'Your password/email is incorrect ' });
                        else
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            })
                    })
                    .catch(error => {res.status(500).json({ message: error.message || 'Incorrect password' })});
        })
        .catch(error => {res.status(500).json({ error })});
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  console.log(req.params.id);

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update an User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete an User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
