import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

export const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/contents${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const textParser = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className='home'>
      <div className="posts">
      {posts.length === 0 ? (
          <div>
            <h3>There is no post under this category!</h3>
          </div>
        ) : 
        (
        posts.map(post => (
            <div className="post" key={post.id}>
              <div className='img'>
                <img src={`../upload/${post.img}`} alt='' />
              </div>
              <div className="content">
                <Link className="title-link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{textParser(post.description)}</p>
                <button>Read More</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


export default Home