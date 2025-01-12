import taskContext from "./taskContext";
import React,{useState} from "react";

const TaskState = (props)=>{
     const tasksInitial = [];
     const [tasks,setTasks] = useState(tasksInitial);

     //Get Task -->
     
     const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:8005/tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
    
            // Check if the response is ok (status code 200-299),else throw this below written error on screen.
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const json = await response.json();
    
            // Handle API-specific success status
            if (!json.success) {
                props.showAlert('danger', json.msg);
                return;
            }
    
            setTasks(json.Tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error.message);
            props.showAlert('danger','Failed to fetch tasks. Please try again later or Refresh the page.');
        }
    };
    
     //Add Task -->
     
     const add_Task = async(task)=>{
        const addTask = await fetch('http://localhost:8005/tasks',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({task})
        }
        );
        const json = await addTask.json();

        if(!json.success){
           props.showAlert('danger',json.msg);
        };

        setTasks(tasks.concat(json.newTask));
     };

     //Delete Task-->

     const delete_Task = async(id)=>{
         const delete_Task = await fetch(`http://localhost:8005/tasks/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('token')
            }
         }) ;

         const json = await delete_Task.json();
         
         if(!json.success){
           props.showAlert('danger',json.msg);
        };

         const newTasks = tasks.filter((task)=>{return task._id !== id});

         setTasks(newTasks);
    };

     //Edit Task-->

     const editTask= async(id,task)=>{
        const updateTask = await fetch(`http://localhost:8005/tasks/${id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({task}),
         }) ;
         
         const json = await updateTask.json();

         if(!json.success){
            props.showAlert('danger',json.msg);
        };

         let newTasks = JSON.parse(JSON.stringify(tasks)); // creating deep copy as we cannot directly manipulate a state ion react.
        
         for(let i = 0; i < newTasks.length; i++){
             const element = newTasks[i];
             if(element._id === id){
                element.task = task ;
                break;
             }
         };
         setTasks(newTasks);
     }
     
    return (
        <div>
            <taskContext.Provider value={{tasks,setTasks,getTasks,add_Task,delete_Task,editTask}}>
                {props.children}
            </taskContext.Provider>
        </div>
    )
}

export default TaskState;