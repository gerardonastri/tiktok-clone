import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Comment.css'
import {axiosReq} from '../../utils/apiCalls'

const Comment = ({comment}) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosReq.get(`users/find/${comment.userId}`)
        setUser(res.data)
      } catch (error) {
        console.log(user);
      } 
    }
    getUser()
  }, [comment.userId])

  return (
    <a href={`propfile/${user?._id}`} className="card__info">
      <img className="navbar__user-img" alt="user img" src={user?.img}/>
      <div className="card__info-flex">
        <span className="card__info-user">{user?.username}</span>
        <div className="card__info-desc">{comment.desc}</div>
      </div>
    </a>
  )
}

export default Comment