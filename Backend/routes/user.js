const express = require('express');

const {body} = require('express-validator');

const router = express.Router();

const {handleUserLogin,handleUserSignUp} = require('../controllers/user');

router.post('/signup',[
    body('username','Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be at least 6 characters long').isLength({min: 6})

],handleUserSignUp);

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').isLength({min: 6})
],handleUserLogin);

module.exports = router;