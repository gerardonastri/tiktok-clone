import React, {useState, useContext} from 'react'
import './Profile.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProfileMain from '../../components/ProfileMain/ProfileMain'
import { useLocation } from 'react-router-dom';
import {AuthContext} from '../../context/authContext/AuthContext';
import { useEffect } from 'react'
import { axiosReq } from '../../utils/apiCalls'


const Profile = () => {
  const [showUpload, setShowUpload] = useState(false)
  const [profile, setProfile] = useState(null)

  const id = useLocation().pathname.split('/')[2]

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axiosReq.get(`users/find/${id}`)
                setProfile(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getProfile()
    }, [id])

    

  return (
    <div className='container'>
      <Navbar showUpload={showUpload} setShowUpload={setShowUpload} />
      <div className={showUpload ? 'wrapper blurred' : 'wrapper'}>
        <Sidebar />
        <ProfileMain profile={profile !== null && profile} />
      </div>
    </div>
  )
}

export default Profile