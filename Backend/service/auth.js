const jwt = require('jsonwebtoken');

const Secret = "Chetan123!@";

function setUser(user){
    const payload = user;
    return jwt.sign(payload,Secret);
}

module.exports = {setUser};