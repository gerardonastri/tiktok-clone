import React, { useState } from 'react'
import './Upload.css'
import storage from '../../utils/firebase';
import {axiosReq} from '../../utils/apiCalls'

const Upload = ({setShowUpload, user}) => {

  const [video, setVideo] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')

  const handleUpload = async () => {
    try {
      const fileData = await storage.ref(`post/${video.name}`).put(video)
      const videoSrc = await fileData.ref.getDownloadURL()
      const res = await axiosReq.post('posts', {
        userId: user._id,
        title,
        videoUrl: videoSrc,
        category
      })
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='upload'>
      <h2>Upload Video</h2>
      <span>Post a video to your account</span>
      <div className="upload__form">
        <div className="inputGroup">
          <label htmlFor="video">Video</label>
          <input type="file" name="video" id="video" onChange={(e) => setVideo(e.target.files[0])} />
        </div>
        <div className="inputGroup">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="category">Category</label>
          <select  name="category" id="category"  onChange={(e) => setCategory(e.target.value)}>
            <option value="development">Development</option>
            <option value="comedy">Comedy</option>
            <option value="gaming">Gaming</option>
            <option value="food">Food</option>
            <option value="dance">Dance</option>
            <option value="beauty">Beauty</option>
            <option value="animals">Animals</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div className="form__actions">
          <button className='form__actions-discard' onClick={() => setShowUpload(false)}>Discard</button>
          <button className='form__actions-post' onClick={handleUpload}>Post</button>
        </div>
      </div>
    </div>
  )
}

export default Upload