const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        username:{
            type: String,
            required: true,
        }, 
        email:{
            type: String,
            unique: true,
            required: true
        },
        password:{
            type: String,
            required: true,
        },
        secKey:{
            type: String,
            required: true,
        }

},{timestamps: true});

const User = mongoose.model('TODOUser',userSchema);

module.exports = User;