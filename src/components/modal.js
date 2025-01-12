import React from 'react'

function Modal(props) {
  return (
    <>
     <form onSubmit={props.addTask}>
    <div className="mb-3">
      <label style={{ fontWeight: 600 }} htmlFor="exampleInputText" className="form-label">Add-Item</label>
      <input ref={props.inputRef} type="text" className="form-control" placeholder='add task...' id="exampleInputText" aria-describedby="emailHelp" />
    </div>
    <button type="submit" className="btn btn-outline-dark mb-2">ADD</button>
  </form> 

  <div>

    <button ref={props.Ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label style={{ fontWeight: 600 }} htmlFor="eInputText" className="form-label">Edit-Item</label>
                <input  type="text" className="form-control" placeholder='edit task...' id="eInputText" name="etask" value={props.eTask.etask} onChange={props.onChange} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref={props.refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={props.handleClick}>Update Task</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
   
  )
}

export default Modal

