import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [showRegister, setShowRegister] = useState(true)
  return (
    <div className='auth'>
      {showRegister ? <Register setShowRegister={setShowRegister} /> : <Login setShowRegister={setShowRegister} />}
    </div>
  )
}

const Login = ({ setShowRegister }) => {
  const [formdata, setformdata] = useState({});
  const [cookie, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://recipeapp-backend.vercel.app/auth/login', { email: formdata.email, password: formdata.password });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate('/')
      // window.location.reload()
    }
    catch (err) {
      console.log(err.response.data.message);
    }
  }

  return <div className='auth-container'>
    <form>
      <h2>Login</h2>
      <input type="email" name="email" id="email" placeholder='Email' onChange={handleChange} />
      <input type="password" name="password" id="password" placeholder='Password' onChange={handleChange} />
      <button onClick={handleSubmit} style={{ background: '#7B675B', color: "white" }}>Submit</button>

      <p>Not Registered Yet ? <button style={{ border: 'none', color: "#7B675B" }} onClick={(e) => { e.preventDefault(); setShowRegister(true) }}>Register</button></p>
    </form>
  </div>
}

const Register = ({ setShowRegister }) => {

  const [formdata, setformdata] = useState({});
  const [cookie, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://recipeapp-backend.vercel.app/auth/register', { email: formdata.email, username: formdata.username, password: formdata.password });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate('/')
    }
    catch (err) {
      console.log(err.response.data.message);
    }
  }

  return <div className='auth-container'>
    <form>
      <h2>Register</h2>
      <input type="email" name="email" id="email" placeholder='Email' onChange={handleChange} />
      <input type="text" name="username" id="username" placeholder='Username' onChange={handleChange} />
      <input type="password" name="password" id="password" placeholder='Password' onChange={handleChange} />
      <button style={{ background: '#7B675B', color: "white" }} onClick={handleSubmit}>Submit</button>
      <p>Already Registered ? <button style={{ border: 'none', color: "#7B675B" }} onClick={(e) => { e.preventDefault(); setShowRegister(false) }}>Login</button></p>
    </form>
  </div>
}


export default Auth