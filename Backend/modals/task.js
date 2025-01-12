const mongoose = require('mongoose');

//Creating Schema -->
const taskSchema = new mongoose.Schema({
    task:{ 
        type: String,
        required: true,
        unique: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TODOUsers'
    }

},{timestamps: true});

const Task = mongoose.model('task',taskSchema);

module.exports = Task;