import React from 'react'
import { useState, useContext } from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import Upload from '../Upload/Upload'
import {AuthContext} from '../../context/authContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({showUpload, setShowUpload}) => {

  const {user} = useContext(AuthContext)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()


  

  return (
    <>
    <div className='navbar'>
      <a href="/" className="navbar__logo">
        <img src="https://github.com/adrianhajdin/project_tiktik/blob/main/utils/tiktik-logo.png?raw=true" alt="tiktik logo" />
      </a>
      <div className="navbar__search">
        <input type="text" placeholder='Search accounts and videos' onChange={(e) => setSearch(e.target.value)} />
        <SearchIcon onClick={() => navigate(`/search?q=${search}`) } />
      </div>
      {user ? (
        <div className="navbar__user">
          <div className="navbar__upload" onClick={() => setShowUpload(true)}>
            <AddIcon /> 
            <span>Upload</span>
          </div>
          <a href={`/profile/${user?._id}`}>
            <img className="navbar__user-img" alt="user img" src={user?.img} />
          </a>
          <div className="navbar__logout">
            <LogoutIcon />
          </div>
        </div>
      )  : (
        <a href="/login" className="navbar__login">
          <button>Login or Sign up</button>
        </a>
      )}
    </div>
    {showUpload && <Upload setShowUpload={setShowUpload} user={user && user} />}
    </>
  )
}

export default Navbar