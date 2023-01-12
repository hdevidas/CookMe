const jwt = require('jsonwebtoken');

/* 
    Middleware for secure access to sensitive resources and returns:
    -> The user's ID if the token is valid
    -> otherwise handles the error case
*/
module.exports = async (req, res, next) => {
    let token = req.headers.authorization || req.headers.Authorization || req.headers['x-access-token']; 
    
    if (!token) {
        return res.status(401).json('token_required'); 
    } else {
        if(token.startsWith('Bearer '))
            token = token.split(' ')[1]; // Extract the token 
        else
            return res.status(401).json('token_not_valid');
        
        // Checking the validity of the token
        jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decodedToken) => {
            if (err) 
                return res.status(41).json('token_not_valid');
    
            req.decodedToken = decodedToken;
    
            const userId = decodedToken.userId;
            req.auth = {
                userId: userId
            };
    
            next(); /* Move to the next request */
        }); 
    }
}