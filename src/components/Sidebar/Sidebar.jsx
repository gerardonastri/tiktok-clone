import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import {axiosReq} from '../../utils/apiCalls'


const footerList1 = ['About', 'Newsroom', 'Store', 'Contact', 'Carrers', 'ByteDance', 'Creator Directory']
const footerList2 = [ 'TikTik for Good','Advertise','Developers','Transparency','TikTik Rewards' ]
const footerList3 = [ 'Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines' ]

const Sidebar = () => {

  const cat = useLocation().pathname.split('/')[2]
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosReq.get('users/rand')
        setUsers(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUsers()
  }, [])

  return (
    <div className='sidebar'>
      <a href='/' className="sidebar__home">
        <HomeIcon/>
        <span>For You</span>
      </a>
      <div className="sidebar__discover">
        <h4>Popular Topics</h4>
        <div className="sidebar_discover-icons">
          <a href="/cat/development" className={cat === 'development' ? 'icon active' : 'icon'}>
            <BsCode />
            <span>Development</span>
          </a>
          <a href="/cat/comedy" className={cat === 'comedy' ? 'icon active' : 'icon'}>
            <BsEmojiSunglasses />
            <span>Comedy</span>
          </a>
          <a href="/cat/gaming" className={cat === 'gaming' ? 'icon active' : 'icon'}>
            <FaGamepad />
            <span>Gaming</span>
          </a>
          <a href="/cat/food" className={cat === 'food' ? 'icon active' : 'icon'}>
            <GiCakeSlice />
            <span>Food</span>
          </a>
          <a href="/cat/dance" className={cat === 'dance' ? 'icon active' : 'icon'}>
            <GiGalaxy />
            <span>Dance</span>
          </a>
          <a href="/cat/beauty" className={cat === 'beauty' ? 'icon active' : 'icon'}>
            <GiLipstick />
            <span>Beauty</span>
          </a>
          <a href="/cat/animals" className={cat === 'animals' ? 'icon active' : 'icon'}>
            <FaPaw />
            <span>Animals</span>
          </a>
          <a href="/cat/sports" className={cat === 'sports' ? 'icon active' : 'icon'}>
            <FaMedal />
            <span>Sports</span>
          </a>
        </div>
      </div>
      <div className="sidebar__suggest">
        <h4>Suggested account</h4>
        <div className="sidebar__suggest-accounts">
          {users?.map(user => (
            <a href={`profile/${user?._id}`} className="sidebar__account" key={user._id}>
              <img className="navbar__user-img" alt="user img" src={user.img} />
              <span>{user.username}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="sidebar__footer">
        <div className="footer__list">
          {footerList1.map(item => (
            <span className="footer__list-item">{item}</span>
          ))}
        </div>
        <div className="footer__list">
          {footerList2.map(item => (
            <span className="footer__list-item">{item}</span>
          ))}
        </div>
        <div className="footer__list">
          {footerList2.map(item => (
            <span className="footer__list-item">{item}</span>
          ))}
        </div>
        <p className=''>© 2022 TikTik</p>
      </div>
    </div>
  )
}

export default Sidebar