import React from 'react'
import './home.scss'
import SideBar from '../../components/sidebar/SideBar'

const Home = () => {
  return (
    <div className="home">
      <SideBar/>
      <div className="home-container">
        Home
      </div>
    </div>
  )
}

export default Home