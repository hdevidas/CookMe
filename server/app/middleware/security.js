const jwt = require('jsonwebtoken');

/* 
    Middleware pour la sécurité lié à l'accès aux ressources sensibles
*/
module.exports = async (req, res, next) => {
    let token = req.headers.authorization || req.headers['x-access-token']; /* On recupère l'ens du token depuis l'entête de la requête */

    console.log('---------------> ' + token);
    if(token && token.startsWith('Bearer '))
        token = token.split(' ')[1]; /* On extrait le token */
    
    if (!token) 
        return res.status(401).json('token_required'); 
    
    /* On vérifie sa validité */
    jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decodedToken) => {
        if (err) 
            return res.status(41).json('token_not_valid');

        req.decodedToken = decodedToken;

        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next(); /* On passe à la requête suivante */
    }); 
}