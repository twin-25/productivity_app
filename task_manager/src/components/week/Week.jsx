import React from 'react'
import './week.scss'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useState } from 'react';
import NewModal from '../newModal/NewModal';


const tasks = [
  {
    id: "task1",
    title: "Research Content Ideas",
    date: '12-07-2025',
    category: 'Personal'
  },
  {
    id: "task2",
    title: "learn to connect it to data base",
    date: '12-07-2025',
    category: 'Work'
  }, 
]

const Week = () => {
  const [openTask, setOpenTask] = useState(null);
  const[addTask, setAddTask] = useState(false);
    
    const handleEditor =()=>{
      setAddTask(addTask?false:true);
    };
  
    const toggeleDetails = (id) => {
      setOpenTask(openTask === id ? null : id);
    };
  return (
    <div className="week">
      <p className="title">This Week</p>
      <ul>
        <li style={{ border: "1px solid #e6e6e6" }} onClick={handleEditor}>
          <AddCircleOutlineOutlinedIcon />
          <span style={{ marginLeft: "10px" }}>Add New Task</span>
        </li>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type='checkbox' id={task.id} />
            <label htmlFor="">
              {task.title}
              {openTask === task.id && (
                <div className="details">
                  <div className="left">
                    <ChecklistIcon className='icon' />
                    <p>{task.date}</p>
                  </div>
                  <div className="center">
                    <span>2</span>
                    <p>Subtasks</p>
                  </div>
                  <div className="right">
                    <span className='color' style={{
                      backgroundColor:
                        task.category === "Personal" ?
                          "#e74c3c" :
                          task.category === "Work" ? "#3498db" :
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
          </li>
        ))}

      </ul>
      {addTask && (
        <NewModal onClose ={handleEditor}/>
      )}
    </div>
  )
}

export default Week