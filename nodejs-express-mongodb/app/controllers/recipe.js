const fetch = require('node-fetch');

// Retrieve all Users frocdm the database.
exports.getRandomRecipe = async (req, res) => {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  
  try {
      const response = await fetch(
        url
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error : ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); /* Affichage des données */
      return data;
  } catch (error) {
      console.error(`Could not get data: ${error}`);
  }
};