import React, {useState} from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Main from '../../components/Main/Main'
import { useLocation } from 'react-router-dom';


const Home = () => {
  const [showUpload, setShowUpload] = useState(false)

  const cat = useLocation().pathname.split('/')[2]

  return (
    <div className='container'>
      <Navbar showUpload={showUpload} setShowUpload={setShowUpload} />
      <div className={showUpload ? 'wrapper blurred' : 'wrapper'}>
        <Sidebar />
        <Main cat={cat && cat} />
      </div>
    </div>
  )
}

export default Home