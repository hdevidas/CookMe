
const Request = require('./request');
const User = require('../models/User');


class UserData extends Request{

    //#id;
    #mail;
    #pantry;
    
    constructor(status, message, pantry, mail){
        super(status,message);
        
        this.#pantry = pantry;
        this.#mail = mail;
    }

    toJson = () => {
        return { 'mail' : this.#mail, 'pantry': this.#pantry};
    }

    getPantry = () => {
        return this.#pantry;
    }

    addToPantry = (ingredient) => {
        this.#pantry.push(ingredient);
    }

    getMail = () => {
        return this.#mail;
    }
    
}

module.exports = UserData;