import React from 'react'
import './newmodal.scss'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const NewModal = ({onClose}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className='close-button' onClick={onClose}>
          &times;
        </button>
        <h2>Add new Task</h2>
        <div className="new">
          <div className="top">
            <p className="title">Task:</p>
            <input type="text" placeholder='Enter a task' value=''/><br/><br/>
            <textarea placeholder='description' value=''></textarea>
          </div>
        <div className="center">
          <ul>
            <li>
              <p>Category</p>
              <select name='list' id = 'list' value =''>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="others">Others</option>
              </select>
            </li>
            <li>
              <p>Due date</p>
              <input type="date" name="due_date" id="due_date" value='' />
            </li>
            <li>
              <p>Tags</p>
              <div className='tags'>
                <select multiple value='' className='native-multi-select' 
                style={{width:"100%",
                  height:"100px",
                  padding:"8px",
                  
                  fontSize:"14px",
                }}>
                  <option value="1">Urgent</option>
                  <option value="2">Important</option>
                  <option value="3">Optional</option>
                </select>
                <div style={{
                  marginTop:"8px",
                  fontSize:"14px",
                  color:"#352525ff"
                }}>
                  <strong>Selected: </strong>
                   Urgent, Important
                </div>
              </div>
              <p className='note'>
                <strong>Note: </strong> You can select multiple tags by holding Ctrl.want to add a new tag? Go to The sidebar.

              </p>
            </li>
          </ul>
          <div className="subtasks">
            <p className="sub">Subtasks</p>
            <ul>
              <li>
                <input type="text" name="" id="" placeholder='Subtask1' />
              </li>
              <li>
                <input type="text" name="" id="" placeholder='Subtask1' />
              </li>
              <li className='add-subtask'>
                <AddCircleOutlineOutlinedIcon className='icon'/> <span>Add New Subtask</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          
            <button className="cancel" onClick={onClose}>Cancel</button>
            <button className="delete">Delete</button>
            <button className="save">Save</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NewModal