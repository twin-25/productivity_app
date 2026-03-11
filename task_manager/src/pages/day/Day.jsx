import React from 'react'
import Today from '../../components/today/Today'
import SideBar from '../../components/sidebar/SideBar'
import './day.scss';

const Day = () => {
  return (
    <div className='day'>
    <SideBar/>
    <div className="day-container">
      <div className="today-title">
        <p>Today</p>

        <span>4</span>
      </div>
      <Today/>
    </div>
    
    </div>
  )
}

export default Day