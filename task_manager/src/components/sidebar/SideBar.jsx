import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import './sidebar.scss'

const SideBar = () => {
  return (
    <div className='sidebar'>
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
          <li>
            <NavigateNextIcon className='icon'/>
            <span>Upcomming</span>
            <div className="counter">5</div>
          </li>
          <li>
            <ChecklistIcon className='icon' />
            <span>Today</span>
            <div className="counter">4</div>
          </li>
          <li>
            <CalendarMonthOutlinedIcon className='icon'/>
            <span>calender</span>
          </li>
          <li>
            <StickyNote2Icon className='icon' />
            <span>StickyNotes</span>
          </li>
        
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
          <div className="tag" style={{backgroundColor: "blue"}}><span style={{color:'white'}}>
            Tag 1</span></div>
          <div className="tag" style={{backgroundColor: "green"}}>< span style={{color:'white'}}>Tag2</span></div>
          <div className="tag add-tag">
            <input type="text" placeholder='New tag Name' 
            style={{
              border:'none',
              background: 'transparent',
              outline: 'none',
              width: '80%',
              color: '#5D5A58 '

            }}/>
            <AddCircleOutlineOutlinedIcon
            style={{
              fontSize: '18px'
            }}
            />
          </div>
        </div>
      </div>
      <br/>
      <div className='bottom'>
        <ul>
          <li>
            <LogoutIcon className='icon'/>
            <span>Signout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar