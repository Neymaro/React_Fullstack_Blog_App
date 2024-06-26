import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/del.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from'moment'
import { AuthContext } from '../context/authContext'

export const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation()

  const nav = useNavigate();
  const {currentUser} = useContext(AuthContext)

  const handleDelete = async() =>{
    try {
      
      await axios.delete(`/contents/${postId}`);
      nav("/")
    } catch (err) {
      console.log(err);
    }
  }

  const postId = location.pathname.split("/")[2]
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/contents/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const textParser = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className='single'>
      <div className="content">
        <img src={`../upload/${post?.img}`} alt=''/>
        <div className="user">
         {post.userImg && <img 
         src={post.userImg} 
         alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>          
          </div>
          {currentUser?.username === post.username && ( 
          <div className="edit">
            <Link to={`/write?edit=${postId}`} state={post} ><img src={Edit} alt="" /></Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
          )}
        </div>
        
        <h1>{post.title}</h1>
        {textParser(post.description)}
        </div>
      <div className="menu"><Menu /></div>
    </div>
  )
}


export default Single