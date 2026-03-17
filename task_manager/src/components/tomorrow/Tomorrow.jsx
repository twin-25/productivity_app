import React from 'react'
import './tomorrow.scss'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useState } from 'react';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import NewModal from '../newModal/NewModal';


// const tasks = [
//   {
//     id: "task1",
//     title: "Research Content Ideas",
//     date: '12-07-2025',
//     category: 'Personal'
//   },
//   {
//     id: "task2",
//     title: "learn to connect it to data base",
//     date: '12-07-2025',
//     category: 'Work'
//   }, {
//     id: "task3",
//     title: "Apply to full time jobs",
//     date: '12-09-2025',
//     category: 'Other'
//   }, {
//     id: "task4",
//     title: "finish backend",
//     date: '30-10-2025',
//     category: 'Personal'
//   },

// ]
const Tomorrow = ({tasks}) => {
  const [openTask, setOpenTask] = useState(null);
  const[addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(null)

  const handleEditor =()=>{
    setAddTask(addTask?false:true);
  };

  const toggeleDetails = (id) => {
    setOpenTask(openTask === id ? null : id);
  };

  return (
    <div className='tomorrow'>
      <p className="title">Tomorrow</p>
      <ul>
        <li style={{ border: "1px solid #e6e6e6" }} onClick={handleEditor}>
          <AddCircleOutlineOutlinedIcon />
          <span style={{ marginLeft: "10px" }}>Add New Task</span>
        </li>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type='checkbox' id={task.id} />
            <label htmlFor={task.id}>
              {task.name}
              {openTask === task.id && (
                <div className="details">
                  <div className="left">
                    <ChecklistIcon className='icon' />
                    <p>{task.due_date}</p>
                  </div>
                  <div className="right">
                    <span className='color' style={{
                      backgroundColor:
                        task.category === "personal" ?
                          "#e74c3c" :
                          task.category === "work" ? "#3498db" :
                            "#f1c40f"
                    }}></span>
                    <p>{task.category}</p>
                  </div>
                </div>
              )}

            </label>
            <NavigateNextIcon className={`icon ${openTask === task.id ? 'rotate' : ""}`} onClick={(e) => {
              toggeleDetails(task.id)
            }} />
            <EditDocumentIcon onClick = {()=>setEditTask(task)}/>
          </li>
        ))}

      </ul>
      {addTask && (
        <NewModal onClose ={handleEditor}/>
      )}
      {editTask && (
        <NewModal onClose ={() =>setEditTask(null)} task={editTask}/>
      )}
      </div>
  )
}

export default Tomorrow