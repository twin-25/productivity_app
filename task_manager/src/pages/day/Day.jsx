import React from 'react'
import Today from '../../components/today/Today'
import SideBar from '../../components/sidebar/SideBar'
import './day.scss';
import { useGetTodaysTasksQuery } from '../../services/TaskApi';

const Day = () => {
  const {data:todaysTasks} = useGetTodaysTasksQuery()
  return (
    <div className='day'>
    <SideBar/>
    <div className="day-container">
      <div className="today-title">
        <p>Today</p>

        <span>4</span>
      </div>
      <Today tasks={todaysTasks || []}/>
    </div>
    
    </div>
  )
}

export default Day