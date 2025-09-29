import React, { useState } from 'react'
import './register.scss'
import { Password } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:'',
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
    if(formData.password !== formData.confirmPassword){
      setError("Password do not match");
      return;
    }
    setError("")
    alert("registration successful");
    navigate('/login')
  }
  return (
    <div className="register">
      <div className="right">
        <img src="public/images/logo.png" alt="Welcome to our App"  />
      </div>
      <div className="left">
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <h1>Sign Up</h1>
            <p className="body">
              Plan Your Time. Capture your ideas
            </p>
            <input type="text"
              name='username'
              placeholder='Username'
              required
            />
            <input type="email" 
            name='email'
            placeholder='Email'
            required onChange={handleChange}/>
            <input type="password" 
            name="password" 
            placeholder='Password'
            required 
            onChange={handleChange}/>
            <input type="password" name="confirmPassword" placeholder='Confirm Password' required onChange={handleChange}/>
            <button type="submit" className='btn' onSubmit={handleSubmit}>Sign Up</button>
            {error && 
            (<div className='error-active'>{error}</div>)}
            <p style={{textAlign:"center"}}>
              Already have an account <span style={{ color: "#007bff", cursor: "pointer", textDecoration: "none" }} >
                <Link to='/login' style={{ color: "#007bff", textDecoration: "none" } }>Login</Link></span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register