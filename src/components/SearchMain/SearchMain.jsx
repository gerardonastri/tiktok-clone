import React from 'react'
import './SearchMain.css'
import Card from '../Card/Card'
import { useState } from 'react'
import { useEffect } from 'react'
import {axiosReq} from '../../utils/apiCalls'

const SearchMain = ({posts}) => {
  

  return (
    <div className='main'>
      <div className="postsContainer">
        {posts?.length > 0 ? posts?.map(post => (
          <Card post={post} key={post._id} />
        )) : (
          <div className="noPosts">
            <h1>No post found!</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchMain