import React from 'react'
import './home.scss'
import SideBar from '../../components/sidebar/SideBar'
import Today from '../../components/today/Today'
import Tomorrow from '../../components/tomorrow/Tomorrow'
import Week from '../../components/week/Week'
import { useGetTodaysTasksQuery, useGetTomorrowsTasksQuery, useGetUpcommingTasksQuery } from '../../services/TaskApi'
import Loader from '../../components/Loader'

const Home = () => {
  const {isLoading:todayLoading, error:TodayError, data:todaysTasks} = useGetTodaysTasksQuery()
  const {isLoading:tomorrowLoading, error:tomorrowError, data:tomorrowsTasks} = useGetTomorrowsTasksQuery()
  const {isLoading:thisWeekLoading, error:thisWeekError, data:thisWeekTasks} = useGetUpcommingTasksQuery()

  return (
    <div className="home">
      <SideBar todaysTasks={todaysTasks} tomorrowsTasks={tomorrowsTasks} thisWeektasks={thisWeekTasks} />
      <div className="home-container">
        <div className="upcoming-title">
          <p>Upcoming</p>
          <span>{todaysTasks?.length || 0}</span>
        </div>


          <div className="home-top">
            {todayLoading && <Loader/>}
            <Today tasks={todaysTasks || []}/>
          </div>
          <div className="home-bottom">
            <div className="home-left">
            {tomorrowLoading && <Loader/>}
            <Tomorrow tasks={tomorrowsTasks || []}/>
            </div>
            <div className="home-right">{thisWeekLoading && <Loader/>}
            <Week tasks={thisWeekTasks || []}/>
            
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home