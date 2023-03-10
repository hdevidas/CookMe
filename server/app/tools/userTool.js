const UserData = require('./UserData');
const DataBase = require('../models/User');


exports.findUser = async (id) => {
    return await DataBase.findOne({_id: id})
    .then(user => {
      if (user === null){
        return new UserData(401,'Incorrect id, can not find user');
      } else {
        return new UserData(201, 'User successfuly find', user.pantry, user.email);
      }
    })
    .catch(error => {return new UserData(500, "error")} );
}

exports.updateUser =async (id, update) => {
  return DataBase.findByIdAndUpdate(id,update, { useFindAndModify: false })
    .then(() => { return{ status : 200, message: 'Success'}})
    .catch( error => {return {status : 400, message: 'Error' }} );
}
