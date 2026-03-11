import React from 'react'
import './welcome.scss'
import { useEffect, useRef} from "react";
import { Link, useNavigate } from 'react-router-dom';


const Welcome = () => {
  const vantaRef = useRef(null);
  const vantaInstance = useRef(null);

  useEffect(() => {
    // guard: scripts not loaded yet
    if (!window.VANTA || !window.THREE || !vantaRef.current) return;

    vantaInstance.current = window.VANTA.BIRDS({
      el: vantaRef.current,
      THREE: window.THREE,     // pass the global THREE
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      quantity: 4.00,
      wingSpan: 40.00
    });

    return () => {
      vantaInstance.current?.destroy();
      vantaInstance.current = null;
    };
  }, []);
  const navigate = useNavigate();
  const handleSignUp = () =>{
    navigate('/register')
  }
  const handleLogin = ()=>{
    navigate('/login')
  }

  return (
    <div className="welcome ">
      <div className='vanta-bg' aria-hidden ref={vantaRef}></div>
      <div className="left">
        <div className="wrapper">
          <h1>Ascend</h1>
          <p className="body">
            Plan your time. Capture your ideas. Boost your productivity
          </p>
          <button className='btn' style={{ color: "white" }} onClick={handleSignUp} >
            Get Started
          </button>
          <p>
            Already have an account?
            <span
              style={{ color: "#007bff", cursor: "pointer", textDecoration: "none" }}
              onClick={handleLogin}
              >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>

  )
}

export default Welcome