
class Request {

    #status;
    #message;
    error;
    
    constructor(status, message, pantry, mail){
        this.#status = status;
        this.#message = message;
        this.error = this.#status != 201;
        
    }

    getStatus = () => {
        return this.#status;
    }

    getMessage = () => {
        return this.#message;
    }
}

module.exports = Request