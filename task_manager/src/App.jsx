import './App.css'
import NewModal from './components/newModal/NewModal'
import Mycalendar from './pages/calendar/Mycalendar'
import Day from './pages/day/Day'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Sticky from './pages/sticky/Sticky'
import Welcome from './pages/welcome/Welcome'
import Login from './pages/login/Login'
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from "react-router-dom";
import ChatBot from './components/chatBot/ChatBot'

const PrivateRoutes = () =>{
  const token = localStorage.getItem('token')
  return token? <Outlet/>:<Navigate to='/welcome' replace/>
}

function App() {
  return (
    
    <Router style={{backgroundColor:"#f8f9fa"}}>
      <ChatBot/>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element = {<PrivateRoutes/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path='/day' element={<Day/>}/>
          <Route path='/calendar' element={<Mycalendar/>}/>
          <Route path='/sticky' element={<Sticky/>}/>
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App
