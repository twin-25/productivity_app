import React from 'react'
import './login.scss'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useLoginUserMutation} from '../../services/userApi'
import Loader from '../../components/Loader'

const Login = () => {
  const [formData, setFormData] = useState({
      username:"",
      email:"",
      password:"",
    })
    const [loginUser, {isLoading}] = useLoginUserMutation()
    const [error, setError] = useState("")
    const navigate = useNavigate();
  
    const handleChange = (e) =>{
      setFormData({
        ...formData, [e.target.name]:e.target.value,
      });
    }
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const {username, password, email} = formData;
      if ((username.trim() === "" &&email.trim() ==="") || password.trim()=== ""){
        setError("please Fill in username or email and password fields");
        return;
      }
      try{
        const res = await loginUser({
          username:formData.username,
          password:formData.password,
          email:formData.email,
        }).unwrap()
        localStorage.setItem('token', res.token)  // ✅ save token
        localStorage.setItem('userInfo', JSON.stringify(res))
        navigate('/home')
      }catch(err){
        setError(err.data?.detail || 'Login unsuccessful')
      }
    }
  return (
    <div className="login">
      {isLoading&&<Loader/>}
      <div className="right">
        <img src="public/images/logo.png" alt="Welcome to our App"/>
      </div>
      <div className="left">
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <h1>Log In</h1>
            <p className="body">
              Plan Your Time. Capture your ideas
            </p>
            <input type="text"
              name='username'
              placeholder='Username'
              autoComplete='username'
              required
              onChange={handleChange}
            />
            <input type="email"
              name='email'
              placeholder='Email'
              onChange={handleChange} />
            <input type="password"
              name="password"
              placeholder='Password'
              required
              autoComplete='current-password'
              onChange={handleChange} />
            <button type="submit" className='btn' onSubmit={handleSubmit}>Log In</button>
            {error &&
              (<div className='error-active'>{error}</div>)}
            <p style={{ textAlign: "center" }}>
               Not a user <span style={{ color: "#007bff", cursor: "pointer", textDecoration: "none" }} > <Link
               to='/register'>
               Sign Up</Link></span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}


export default Login