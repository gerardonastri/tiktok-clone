import React, {useContext, useState} from 'react'
import './ProfileMain.css'
import {AuthContext} from '../../context/authContext/AuthContext';
import { useEffect } from 'react'
import { axiosReq } from '../../utils/apiCalls'
import Card from '../Card/Card'

const ProfileMain = ({profile}) => {
  const {user} = useContext(AuthContext)
  const [userVideos, setUserVideos] = useState(null)
  const [likedVideos, setLikedVideos] = useState(null)
  const [category, setCategory] = useState('videos')

  useEffect(() => {
    const getPosts = async () => {
      try {
        const videosRes = await axiosReq.get(`posts/user?userId=${profile._id}`)
        const likedRes = await axiosReq.get(`posts/like?userId=${profile._id}`)
        setUserVideos(videosRes.data)
        setLikedVideos(likedRes.data)
      } catch (error) {
        console.log(error);
      }
    }
    getPosts()
  }, [profile._id])

  
  return (
    <div className='main'>
      <div className="profile__info">
        <img src={profile?.img} alt="profile img" />
        <span>{profile?.username}</span>
      </div>
      <div className="profile__categories">
        <span className={category === 'videos' && 'active'} onClick={() => setCategory('videos')}>Videos</span>
        <span className={category === 'liked' && 'active'} onClick={() => setCategory('liked')}>Liked</span>
      </div>
      <div className="profile__postsContainer">
        {category === 'videos' ? (
          <>
            {userVideos?.map(video => (
              <Card post={video} />
            ))}
          </>
        ) : (
          <>
            {likedVideos?.map(video => (
              <Card post={video} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default ProfileMain