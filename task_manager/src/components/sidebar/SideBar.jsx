import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BackspaceIcon from '@mui/icons-material/Backspace';
import './sidebar.scss'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userApi } from '../../services/userApi';
import { useGetTodaysTasksQuery, useGetTomorrowsTasksQuery, useGetUpcommingTasksQuery } from '../../services/TaskApi'
import { useCreateTagMutation, useDeleteTagMutation, useGetTagsQuery } from '../../services/TagApi';

const SideBar = () => {
  const {data:todaysTasks} = useGetTodaysTasksQuery()
  const {data:thisWeekTasks} = useGetUpcommingTasksQuery()
  const {data:tagData = []} = useGetTagsQuery() 
  const [createTag] = useCreateTagMutation()
  const [deleteTag] = useDeleteTagMutation()
  const [newTag, setNewTag] = useState('')
  const [tagColor, setTagColor] = useState('#000000')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    dispatch(userApi.util.resetApiState())
    navigate('/')
  }

  const handleAddTag = async() =>{
    if(!newTag.trim()) return
    try{
      await createTag({name:newTag, color:tagColor}).unwrap()
      setNewTag('')
    }catch (err){
      console.log(err)
    }
  }

  const handleDeleteTag = async(pk) =>{
    await deleteTag(pk).unwrap()
  }
  return (
    <div className='sidebar active'>
      <div className='top'>
        <div className="menu">
          <span className="menu-title">
            Menu 
          </span>
          <MenuIcon/>
        </div>
        <div className="search">
          <input type="text" placeholder='Search' />
          <SearchOutlinedIcon />
        </div>
      </div>
      <div className='center'>
        <ul>
          <p className="title">Tasks</p>
          <Link to='/home'
          style={{textDecoration:"none"}}>
          <li>
            <NavigateNextIcon className='icon'/>
            <span>Upcomming</span>
            <div className="counter">{thisWeekTasks?.length || 0}</div>
            </li>
          </Link>
          <Link to='/day'
          style={{textDecoration:"none"}}
          
          >
          <li>
            <ChecklistIcon className='icon' />
            <span>Today</span>
            <div className="counter">{todaysTasks?.length|| 0}</div>
          </li>
          </Link>
          <Link to='/calendar'
          style={{textDecoration:"none"}}>
          <li>
            <CalendarMonthOutlinedIcon className='icon'/>
            <span>calendar</span>
          </li>
          </Link>
          <Link to='/sticky'
          style={{textDecoration:"none"}}>
          <li>
            <StickyNote2Icon className='icon' />
            <span>StickyNotes</span>
          </li>
          </Link>
        
        <p className='title'>Category</p>
        
          <li>
            <div className="color" style={{backgroundColor: "#3498db"}}></div>
            <span>Work</span>
            <div className="counter">10</div>
          </li>
          <li>
            <div className="color" style= {{backgroundColor: "#e74c3c"}}></div>
            <span>Personal</span>
            <div className="counter">12</div>
          </li>
          <li>
            <div className="color" style={{backgroundColor: "#f1c40f"}}></div>
            <span>other</span>
            <div className="counter">3</div>
          </li>
        </ul>
        <p className="title">Tags</p>
        <div className="tags">
          {tagData?.map((tag) =>(
            <div className="tag" key = {tag.id} style={{backgroundColor: tag.color}}><span style={{color:'white'}}>
            {tag.name}</span> <BackspaceIcon onClick={()=>handleDeleteTag(tag.id)}/></div>
          ))
          }
          {/* <div className="tag" style={{backgroundColor: "blue"}}><span style={{color:'white'}}>
            Tag 1</span></div>
          <div className="tag" style={{backgroundColor: "green"}}>< span style={{color:'white'}}>Tag2</span></div> */}
          <div className="tag add-tag">
            <input type="text" placeholder='New tag Name' 
            style={{
              border:'none',
              background: 'transparent',
              outline: 'none',
              width: '80%',
              color: '#5D5A58 '

            }}
            onChange={(e)=>setNewTag(e.target.value)}
            />
            <AddCircleOutlineOutlinedIcon
            style={{
              fontSize: '18px'
            }}
            onClick={handleAddTag}
            />
            <div><label htmlFor="color">Tag Color:</label>
            <input type="color"  id="tagColor" value={tagColor} 
            onChange={(e) =>setTagColor(e.target.value)}
            /></div>
          </div>
        </div>
      </div>
      <br/>
      <div className='bottom'>
        <ul>
          <li onClick={handleLogOut}>
            <LogoutIcon className='icon'/>
            <span>Signout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar