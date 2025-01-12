const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
// Get the all the tasks-->

const {handleGetAllTasks,handleCreateTasks,handleUpdateTaskByID,handleDeleteTaskByID} = require('../controllers/task');

router.route('/').get(handleGetAllTasks).post([body('task','Enter a valid task').isLength({min: 5})],handleCreateTasks);

router.route('/:id').delete(handleDeleteTaskByID).patch(handleUpdateTaskByID);


module.exports = router;

