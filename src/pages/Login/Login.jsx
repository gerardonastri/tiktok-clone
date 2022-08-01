import React, { useState, useContext } from 'react'
import './Login.css'
import storage from '../../utils/firebase';
import {AuthContext} from '../../context/authContext/AuthContext';
import {login, register} from '../../context/authContext/apiCalls'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [img, setImg] = useState('')

  const {dispatch} = useContext(AuthContext)

  const handleLogin = async () => {
    login({username, password}, dispatch)
    await new Promise(done => setTimeout(() => done(), 3000)); 
    window.location.replace('/')
  }

  const handleRegister = async () => {
    const fileData = await storage.ref(`user/${img.name}`).put(img)
    const imageSrc = await fileData.ref.getDownloadURL()
    register({username, email, password,profilePicture: imageSrc }, dispatch)
    await new Promise(done => setTimeout(() => done(), 3000)); 
    window.location.replace('/')
  }

  return (
    <div className='login'>
      <div className="login__wrapper">
        <div href="/" className="navbar__logo">
          <img src="https://github.com/adrianhajdin/project_tiktik/blob/main/utils/tiktik-logo.png?raw=true" alt="tiktik logo" />
        </div>
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <button className="login__button" onClick={handleLogin}>Login</button>
        <span className="or">or</span>
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder='Email address' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <input type="file" placeholder='Profile Picture' onChange={(e) => setImg(e.target.files[0])} />
        <button className="register__button" onClick={handleRegister}>Register</button>
      </div>
    </div>
  )
}

export default Login