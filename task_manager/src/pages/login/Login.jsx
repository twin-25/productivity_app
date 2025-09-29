import React from 'react'
import './login.scss'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
      username:"",
      email:"",
      password:"",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate();
  
    const handleChange = (e) =>{
      setFormData({
        ...formData, [e.target.name]:e.target.value,
      });
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      const {username, password} = formData;
      if (username.trim() === "" || password.trim()=== ""){
        setError("please Fill in both fields");
        return;
      }
      setError("");
      alert("Login Successful");
      navigate('/home')
    }
  return (
    <div className="login">
      <div className="right">
        <img src="public/images/logo.png" alt="Welcome to our App" srcset="" />
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
              required onChange={handleChange} />
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