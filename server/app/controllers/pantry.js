const User = require('../models/User');

  exports.addIngredient = (req,res) => {
    User.findOne({_id: req.body.id})
      .then(user => {
        if (user === null){
            res.status(401).json({ message: 'Incorrect information (email and password)' });
        } else {
          user.pantry.push(req.body.pantry);
          user.save()
              .then( () => res.status(201).json({ message: 'pantry updated successfuly'}) )
              .catch( error => res.status(400).json({ message: 'Already exists' }) );
        }
      })
      .catch(error => { res.status(500).json({ error })});
}

exports.removeIngredient = (req,res) => {
  User.findOne({_id: req.body.id})
    .then(user => {
      if (user === null){
          res.status(401).json({ message: 'Incorrect information (email and password)' });
      } else {
        let element = req.body.pantry.toString();
        let pantry = user.pantry;
        let ingredients = [];
        for(let i = 0; i < pantry.length; ++i){
          if (pantry.at(i) != element){
            ingredients.push(pantry.at(i));
          }
        }
        user.updateOne({ pantry: ingredients })
            .then( () => res.status(201).json({ message: 'remove successfuly'}) )
            .catch( error => res.status(400).json({ message: 'Already exists' }) );
      }
    })
    .catch(error => { res.status(500).json({ error })});
}

exports.removeAllIngredients = (req,res) => {
  User.findOne({_id: req.body.id})
    .then(user => {
      if (user === null){
          res.status(401).json({ message: 'Incorrect information (email and password)' });
      } else {
        user.updateOne({ pantry: [] })
          .then( () => res.status(201).json({ message: 'remove successfuly'}) )
          .catch( error => res.status(400).json({ message: 'Already exists' }) );
      }
    })
    .catch(error => { res.status(500).json({ error })});
}
