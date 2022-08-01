import React from 'react'
import './Post.css'
import { useLocation } from 'react-router-dom';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import videoSrc from '../../mrrobot.mp4'
import {BsSuitHeartFill} from 'react-icons/bs'
import {FcNoVideo} from 'react-icons/fc'
import { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../../context/authContext/AuthContext';
import {axiosReq} from '../../utils/apiCalls'
import Comment from '../../components/Comment/Comment'

const Post = () => {
    const [comment, setComment] = useState('')
    const [postUser, setPostUser] = useState(null) 
    const [post, setPost] = useState(null)
    const [comments, setComments ]= useState(null)
    const {user} = useContext(AuthContext);
    const id = useLocation().pathname.split('/')[2]
    

    useEffect(() => {
        const getPosts = async () => {
          try {
              const postRes = await axiosReq.get(`posts/find/${id}`)
              const userRes = await axiosReq.get(`users/find/${postRes.data.userId}`)
              const commentsRes = await axiosReq.get(`comments/${postRes.data._id}`)
              setPost(postRes.data)
              setPostUser(userRes.data)
              setComments(commentsRes.data)
          } catch (error) {
            console.log(error);
          }
        }
        getPosts()
      }, [id])



    const handleLike = async () => {
        await axiosReq.put(`users/like/${post._id}?userId=${user._id}`)
        window.location.reload()
    }
    const handleDisike = async () => {
        await axiosReq.put(`users/dislike/${post._id}?userId=${user._id}`)
        window.location.reload()
    }

    const handleComment = async () => {
        try {
            await axiosReq.post(`comments/${post._id}?userId=${user._id}`, {
                desc: comment
            })
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


    

  return (
    <div className='post'>
        <a href="/" className="close"><AiOutlineCloseCircle /></a>
        <div className="post__video">
            <video src={videoSrc} controls loop autoPlay  />
        </div>
        <div className="post__main">
            <div className="post__main-up">
                <a href={`profile/${postUser?._id}`} className="post__info">
                    <img className="navbar__user-img" alt="user img" src={postUser?.img} />
                    <span className="card__info-user">{postUser?.username}</span>
                </a>
                <p className="post__desc">{post?.title}</p>
                <div className="post__likes">
                   <div className="post__likes-flex">
                        {post?.likes.includes(user._id) ? (
                            <div className="post__icon active" onClick={handleDisike}><BsSuitHeartFill /></div>
                        ) : (
                            <div className="post__icon" onClick={handleLike}><BsSuitHeartFill /></div>
                        )}
                        <span className="post__likes-counter">{post?.likes.length}</span>
                   </div>
                </div>
            </div>
            <div className="post__main-comments">
                {comments?.length < 1 ? (
                    <div className="noComments">
                        <FcNoVideo />
                        <h3>No comments yet! Be the first to add the comment</h3>
                    </div>
                ) : (
                    <div className="comments-container">
                        {comments?.map(comment => (
                            <Comment comment={comment} key={comment._id} />
                        ))}
                    </div>
                )}
                <div className="post__main-createComment">
                    <input type="text" placeholder='Great!' onChange={(e) => setComment(e.target.value)} />
                    <button onClick={handleComment}>Comment</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Post