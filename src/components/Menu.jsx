import React, { useEffect, useState } from 'react'
import '../style.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Menu = ({cat}) => {

  const [posts, setPosts] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await axios.get(`/contents/?category=${cat}`);
          setPosts(res.data);
      } catch (err) {
          console.log(err);
      }
    };
    fetchData();
  }, [cat]);  
  

  console.log(posts)
  return (
    <div className='menu'>
        <h1>Other Posts</h1>
        {posts.map(post=>(
            <div className="post" key={post.id}>
            <img src={`../upload/${post.img}`} alt="" />
            <h2>{post.title}</h2>
            <button ><a href={post.id} style={{ textDecoration: 'none' }}>Read More</a></button>
            </div>
        ))}
    </div>
  )
}


export default Menu