const fetch = require('node-fetch');
const ApiData = require('./ApiData');
const Request = require('./request');

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SUCCESS_STATUS = 201;
const SUCCESS_MESSAGE = 'Data Succesfully collected from api'

        
exports.getdataFromApi = async (endRoute) => {
    let url = BASE_URL.concat('',endRoute);
    const response = await fetch(url);
    if (!response.ok) {
      return new Request(response.status,`HTTP error on external api at ${newUrl}`);
    }
    let data = await response.json();
    return new ApiData(SUCCESS_STATUS,SUCCESS_MESSAGE,data);
}