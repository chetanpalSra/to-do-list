const Task = require('../modals/task');

const { validationResult } = require('express-validator');

async function handleGetAllTasks(req,res){

    const createdBy = req.user.id;
    
    const getTasks = await Task.find({createdBy});
    
    let success = false;
    
    if(!getTasks){
        return res.status(404).json({msg: 'No tasks exist!',success});
    }
    return res.status(200).json({Tasks: getTasks,success: true});
}

async function handleCreateTasks(req,res){
 
    const errors = validationResult(req);
    let success = false;

    if (!errors.isEmpty()) {
        return res.status(400).json({success,Error: errors.array() });
   }
 
   try{
    const body = req.body;
    if(!body || !body.task){
        return res.status(400).json({msg: 'Please enter the Task!',success});
    }

   const newTask = await Task.create({
        task: body.task,
        createdBy: req.user.id,
    });

    return res.status(201).json({msg: 'Task Successfully Created',newTask,success: true});

   }catch(error){
    console.error(error.message);
    return res.status(500).json({msg: `Internal server error.`,success});
   }
    
}

async function handleUpdateTaskByID(req,res){
    const id = req.params.id;
    const body = req.body;
    let success = false;
    try{
    
   const task = await Task.findById(id);

     if(!task){
    return res.status(404).json({msg: "Task Not found!!"});
   }
 // Checking authorization that a user can update item.
  
   if(task.createdBy.toString()!= req.user.id){
    return res.status(401).json({msg:"Not allowed"});
   }

    const updateTask = await Task.findByIdAndUpdate(id,{task: body.task},{new: true}); // new:true returns the updated document.s

    if(!updateTask){
        return res.status(404).json({msg:'The Task is not found to be updated!',success});
      }

    return res.status(200).json({msg:"The task has been updated successfully",updateTask,success: true})

    }catch(error){
    console.error(error.message);
    return res.status(500).json({msg: `Internal server error.`,success});
    }

}

async function handleDeleteTaskByID(req,res){
    const id = req.params.id;
    let success = false;

    try{

        const task = await Task.findById(id);
        if(!task){
            return res.status(404).json({msg:"Task Not found!"})
        }

        // Checking authorization that a user can delete item.
        if(task.createdBy.toString()!= req.user.id){
            return res.status(401).json({msg:"Not allowed"});
           }

        const deleteTask = await Task.findByIdAndDelete(id);

        if(!deleteTask){
          return res.status(404).json({msg:'The Task is not found to be deleted!',success});
        }
     
         return res.status(200).json({msg:"The Task has been deleted successfully",deleteTask,success: true});
     }
    catch(error){
        console.error(error.message);
        return res.status(500).json({msg: `Internal server error.`,success});
 
    }

}
module.exports = {handleGetAllTasks,handleCreateTasks,handleUpdateTaskByID,handleDeleteTaskByID};
