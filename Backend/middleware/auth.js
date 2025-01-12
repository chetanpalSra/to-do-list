const jwt = require('jsonwebtoken');

require('dotenv').config();

const Secret = process.env.JWT_SecretKey;

async function restrictToLoggedIn(req,res,next){
      const token = req.header('auth-token');
      
      if(!token){

      return res.status(401).send({Error:"Please authenticate using a valid token.",Token: `${token}`});

      }
      try{
        const data = jwt.verify(token,Secret);
        req.user = data.user;
        next();
      }
      catch(error){
            return res.status(401).send({Error:"Please authenticate using a valid token."});
      }
}

module.exports = {restrictToLoggedIn}