import React, {useState, useEffect} from 'react'
import './Card.css'
import videoSrc from '../../mrrobot.mp4'
import { useRef } from 'react';
import {axiosReq} from '../../utils/apiCalls'

const Card = ({post}) => {
  const [isHover, setIsOver] = useState(false)
  const [user, setUser] = useState(null)
  const videoRef = useRef()
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const handlePlay = async () => {
    if(!isHover){
      await videoRef.current.play()
      setIsVideoMuted(false)
    } else {
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosReq.get(`users/find/${post.userId}`)
        setUser(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [post]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className='card'>
      <a href={`/post/${post?._id}`} className="card__info">
        <a href={`profile/${user?._id}`}>
          <img className="navbar__user-img" alt="user img" src={user?.img}/>
        </a>
        <div className="card__info-flex">
          <span className="card__info-user">{user?.username}</span>
          <div className="card__info-desc">{post.title}</div>
        </div>
      </a>
      <div className="card__video">
        <video ref={videoRef} src={post.videoUrl} muted={true}   onMouseEnter={() => {setIsOver(true); handlePlay();}}  onMouseLeave={() => {setIsOver(false); handlePlay();}}></video>
       
      </div>
    </div>
  )
}

export default Card