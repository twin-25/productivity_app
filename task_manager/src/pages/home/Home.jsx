import React from 'react'
import './home.scss'
import SideBar from '../../components/sidebar/SideBar'
import Today from '../../components/today/Today'
import Tomorrow from '../../components/tomorrow/Tomorrow'
import Week from '../../components/week/Week'

const Home = () => {
  return (
    <div className="home">
      <SideBar/>
      <div className="home-container">
        <div className="upcoming-title">
          <p>Upcoming</p>
          <span>5</span>
        </div>


          <div className="home-top">
            <Today/>
          </div>
          <div className="home-bottom">
            <div className="home-left"><Tomorrow/></div>
            <div className="home-right"><Week/></div>
          </div>
        
      </div>
    </div>
  )
}

export default Home