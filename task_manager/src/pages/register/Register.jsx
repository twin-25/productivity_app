import React, { useState } from 'react'
import './register.scss'
import { Password } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import {useCreateUserMutation} from '../../services/userApi'
import Loader from '../../components/Loader'
const Register = () => {
  const [error, setError] = useState('')
  const [createUser, {isLoading:registerLoading}] = useCreateUserMutation()
  // const [loginUser, {data:loginData, error:loginError, isLoading:loginLoading}] = useCreateUserMutation()


  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:'',
  })
  // const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({
      ...formData, [e.target.name]:e.target.value,
    });
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      setError('Password do not match');
      return;
    }
    try{
      await createUser({
        username: formData.username,
        email: formData.email,
        password:formData.password,

      }).unwrap()
      navigate('/login')
    }catch(err){
      setError(err.data?.detail || 'Registration falied')
    }
  }

  return (
    <div className="register">
      {registerLoading && <Loader/>}
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
              onChange={handleChange}
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