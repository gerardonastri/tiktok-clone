import React from 'react'
import './Main.css'
import Card from '../Card/Card'
import { useState } from 'react'
import { useEffect } from 'react'
import {axiosReq} from '../../utils/apiCalls'

const Main = ({cat}) => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const getPosts = async () => {
      try {
        if(cat){
          const res = await axiosReq.get(`posts/category?cat=${cat}`)
          setPosts(res.data)
        } else {
          const res = await axiosReq.get(`posts`)
          setPosts(res.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPosts()
  }, [cat])

  return (
    <div className='main'>
      <div className="postsContainer">
        {posts?.length > 0 ? posts?.map(post => (
          <Card post={post} key={post._id} />
        )) : (
          <div className="noPosts">
            <h1>No posts yet!</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Main