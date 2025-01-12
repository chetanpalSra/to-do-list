const jwt = require('jsonwebtoken');

require('dotenv').config();

const Secret = process.env.JWT_SecretKey;

function setUser(user){
    const payload = user;
    return jwt.sign(payload,Secret);
}

module.exports = {setUser};