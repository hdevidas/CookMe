

const User = require('../models/User');


class UserData {
    #status;
    #message;
    error;

    //#id;
    #mail;
    #pantry;
    
    constructor(status, message, pantry, mail){
        this.#status = status;
        this.#message = message;
        this.error = this.#status != 201;
        
        this.#pantry = pantry;
        this.#mail = mail;
    }

    toJson = () => {
        return { 'mail' : this.#mail, 'pantry': this.#pantry};
    }

    getStatus = () => {
        return this.#status;
    }

    getMessage = () => {
        return this.#message;
    }

    getPantry = () => {
        return this.#pantry;
    }

    addToPantry = (ingredient) => {
        this.#pantry.push(ingredient);
    }
    
}

module.exports = UserData;