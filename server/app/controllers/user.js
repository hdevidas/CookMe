const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); // To manage tokens
const { validationResult } = require('express-validator'); // For the validation of the user's data schema

const User = require('../models/User');

// Create and Save a new User
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
      
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
          email: req.body.email,
          password: hash,
          pantry: req.body.pantry
      });
      user.save()
        .then(() => res.status(201).json({
          message: 'Your account has been successfully created, you can now login using your email and password!'
        }))
        .catch(error => res.status(400).json({
          message: 'E-mail already in use'
        }));
    })
    .catch(error => res.status(500).json({
      message: "Some error occurred. Please try again!"
    }));
  
};

/* 
  For the user's connection
  -> Verification of the existence of the user 
  -> Verification of the validity of the information provided
  -> Use of a token for the user
*/
exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'It must be an email address, please use a correct email address!'});
  }

  const errorMessage = 'Your email or password is Incorrect. Please try again !';

  User.findOne({ email: req.body.email })
      .then(user => {
          if ( !user )
              res.status(401).json({ message: errorMessage });
          else
              bcrypt.compare(req.body.password, user.password)
                  .then(valid => {
                      if (!valid)
                          res.status(401).json({ message: errorMessage });
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
                  .catch(error => {res.status(500).json({ message: errorMessage })});
      })
      .catch(error => {res.status(500).json({ message: errorMessage })});
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
