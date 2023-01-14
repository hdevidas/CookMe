const Request = require("./request");


class ApiData extends Request {
    #data;

    constructor(stauts, message, data){
        super(stauts,message);
        
        this.#data = data;
    }

    getData = () => {
        return this.#data;
    }
}

module.exports = ApiData;