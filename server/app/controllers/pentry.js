const User = require('../models/User');

exports.removeIngredients = (req,res) => {
    const id = req.body.id;
    console.log(id);
    User.findOne({id: req.body._id})
      .then(user => {
        console.log("user finded");
        if (user === null){
          res.status(401).json({ message: 'Incorrect information (email and password)' });
         }else {
          console.log(req.body.pentry);
          let element = req.body.pentry.toString();
          let pentry = user.pentry;
          let ingredients = [];
          for(let i = 0; i < pentry.length; ++i){
            if (pentry.at(i) != element){
              ingredients.push(pentry.at(i));
            }
          }
          console.log(ingredients);
          user.updateOne({_id : id}, {$pull: {pentry : element}})
          .then((data) => {
            console.log("update worked : " + data);
            user.save()
            .then( () => res.status(201).json({ message: 'pentry updated successfuly'}) )
            .catch( error => res.status(400).json({ message: 'Already exists' }) );
          })
          .catch(err => {
            console.log("update impossible");
            res.status(500).send({
              message: "Error updating User with id=" + id
            });
          });
        }
        
      }).catch(error => {
        console.log ("user not found");
        res.status(500).json({ error })});
  }
  
  exports.changePentry = (req,res) => {
    const id = req.body.id;
    console.log(id);
    User.findOne({id: req.body._id})
      .then(user => {
        console.log('ah?');
        if (user === null){
            console.error('user null');
          res.status(401).json({ message: 'Incorrect information (email and password)' });
         }else {
          console.log('ok...');
          let pentry = user.pentry;

          if (req.body.pentry.length == 0){
            pentry = [];
            console.log("empty");
          }
          else {
            console.log(req.body.pentry);
            pentry.push(req.body.pentry);
          }
        
          console.log("before update");
          user.updateOne({_id : id}, {$push: {pentry : req.body.pentry}})
          .then(() => {
            console.log('before saving : ' + user.pentry);
            user.save()
            .then( () => res.status(201).json({ message: 'pentry updated successfuly'}) )
            .catch( error => res.status(400).json({ message: 'Already exists' }) );
          })
          .catch(err => {
            console.log("update impossible");
            res.status(500).send({
              message: "Error updating User with id=" + id
            });
          });
        }
        
      }).catch(error => {
        console.log ("user not found T.T");
        res.status(500).json({ error })});
  }