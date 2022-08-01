import './Search.css'
import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SearchMain from '../../components/SearchMain/SearchMain'
import Sidebar from '../../components/Sidebar/Sidebar'
import Main from '../../components/Main/Main'
import { axiosReq } from '../../utils/apiCalls'
import { useLocation } from 'react-router-dom'

const Search = () => {
  const [showUpload, setShowUpload] = useState(false)
  const [posts, setPosts] = useState(null)
  const query = useLocation().search

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axiosReq.get(`posts/search${query}`)
        setPosts(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getPosts()
  }, [query])


  return (
    <div className='container'>
      <Navbar showUpload={showUpload} setShowUpload={setShowUpload} />
      <div className={showUpload ? 'wrapper blurred' : 'wrapper'}>
        <Sidebar />
        <SearchMain posts={posts && posts} />
      </div>
    </div>
  )
}

export default Search