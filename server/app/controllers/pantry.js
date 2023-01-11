const User = require('../models/User');

  exports.addIngredient = (req,res) => {
    User.findOne({_id: req.body.id})
      .then(user => {
        if (user === null){
            res.status(401).json({ message: 'Incorrect information (email and password)' });
        } else {
          console.log(req.body.pantry)
          user.pantry.push(req.body.pantry);
          user.save()
              .then( () => res.status(201).json({ message: 'pantry updated successfuly'}) )
              .catch( error => res.status(400).json({ message: 'Already exists' }) );
        }
      })
      .catch(error => { res.status(500).json({ error })});
}

exports.setRandomPantry = (req,res) => {
  User.findOne({_id: req.body.id})
    .then(user => {
      if (user === null){
          res.status(401).json({ message: 'Incorrect information (email and password)' });
      } else {
        user.updateOne({ pantry: [] })
          .then( async () => {
            const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list?";
            try {
                const response = await fetch(url);
            
                if (!response.ok) {
                  throw new Error(`HTTP error : ${response.status}`);
                }
                const data = await response.json();
                let ingredients = new Array(); 
                for (let i = 0; i<574; i++){
                  ingredients.push(data.meals[i].strIngredient.toLowerCase())
                }
                const nums = new Set();
                while(nums.size !== 150) {
                  nums.add(Math.floor(Math.random() * 450) + 1);
                }
                for (n of nums){
                  user.pantry.push(ingredients[n]);
                }
                
                user.save()
                .then( () => res.status(201).json({ message: 'pantry updated successfuly'}) )
                .catch( error => res.status(400).json({ message: 'Already exists' }) );

                
            } catch (error) {
                console.error(`Could not get data: ${error}`);
            }
          }).catch( error => res.status(400).json({ message: 'Already exists' }) );
      }
    }).catch(error => { res.status(500).json({ error })});
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
