import React, { useContext } from 'react'

import taskContext from '../Context/tasks/taskContext'

const TaskItem = (props) => {
    const context = useContext(taskContext);
    const {delete_Task} = context;

    return (
        <div className= 'my-1' style={{backgroundColor: 'rgba(0,0,0,0.1)'}}>
            <div style={{border: '1px solid black'}} className="d-flex">
                <div className="p-2 flex-grow-1">{props.text.task}</div>
                <div className="p-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=>{
                        delete_Task(props.taskID);
                        props.showAlert('success','To-Do Task deleted Successfully.');
                    }}>Delete</button>
                    </div>
                <div className="p-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=>{props.edit_task(props.text)}} >Edit</button>
                    </div>
            </div>
        </div>
    )
}

export default TaskItem
