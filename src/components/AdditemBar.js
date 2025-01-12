import React, { useState, useRef, useContext, useEffect } from 'react'
import TaskItem from './TaskItem'
import Modal from './modal';
import taskContext from '../Context/tasks/taskContext';
import { useNavigate } from 'react-router-dom';

const AdditemBar = (props) => {
  const context = useContext(taskContext);
  const {tasks,getTasks,add_Task,editTask} = context;
  const navigate = useNavigate();
  
  const inputRef = useRef(null);
  const Ref = useRef(null);
  const refClose = useRef(null);
  const [eTask,e_setTask] = useState({etask: "",_id: ""});

  useEffect(()=>{
    if(localStorage.getItem('token')){
    getTasks();
    }
    else{
       navigate('/login');
    }
       // eslint-disable-next-line  
  },[]); // empty array means run one time only when component render. 

  const addTask = (e) => {
    if (!inputRef.current.value) {
      e.preventDefault();
      inputRef.current.focus();
      return; 
    }
    else {
      e.preventDefault();
      const task = inputRef.current.value; 
      add_Task(task);
      props.showAlert('success','To-Do Task Added Successfully.');
      inputRef.current.value="";
    }
  };

  const edit_task = (currentTask) => {
    Ref.current.click();
    e_setTask({etask : currentTask.task, _id:currentTask._id});
    console.log(currentTask);
  };

  const onChange = (e)=>{
      e_setTask({...eTask,[e.target.name]: e.target.value});
  };

  const handleClick = ()=>{
    refClose.current.click();
    editTask(eTask._id,eTask.etask);  
    props.showAlert('success','To-Do task Edited Successfully!');
  };

  return (
    <>

    <Modal addTask={addTask} inputRef={inputRef} Ref={Ref} eTask={eTask} onChange={onChange} handleClick={handleClick} refClose={refClose}/>

    <div className="container">
      <h2>Your Tasks</h2>
    </div>

    {tasks.length === 0 ? <p>No Tasks to be Displayed!</p> : (
        tasks.map((task, index) => (
            <TaskItem key={task._id} text={task} taskID={task._id} edit_task={edit_task} showAlert={props.showAlert}/>
        ))
    )}
    </>

  )
}

export default AdditemBar

// Yes, the components defined in App.js are typically parent components or top-level components in your React application, as App.js serves as the root component in a standard React setup,they can directly take prop from other parent components.

//here we have to do prop drilling(pass prop(showAlert) acquired by AddItemBar component from another component(Alert) to TaskItem component) as TaskItem component is its child,it is not parent component that can directly take prop from another component. so we have to do it to make showAlert work properly in TaskItem.

// This issue happens because props are not automatically forwarded in React. Fixing it involves ensuring the showAlert prop is passed explicitly and consistently through the entire component hierarchy. Using tools like React Context or ...props can simplify this process when dealing with deeply nested components.

