import axios from 'axios';
import moment from 'moment';
import React , { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';

export const Write = () => {
  const state = useLocation().state
  const [value, setValue] = useState(state?.title || "");
  const [title,setTitle] = useState(state?.description || "");
  const [cat, setCat] = useState(state?.category || "");
  const [file,setFile] = useState(null);
  const nav = useNavigate();

  const upload = async () =>{
    try{
      const formData = new FormData();
      formData.append("file",file)
      const res = await axios.post("/upload",formData)
      return res.data
    }
    catch(err){
      console.log(err)
    }
  }
  const handlePublish = async e=>{
    e.preventDefault()
    const imgUrl = await upload();
    try{
      state ? await axios.put(`/contents/${state.id}`,{
        title,
        description:value,
        category: cat,
        img:file ? imgUrl : ""
      }) : axios.post(`/contents/`,{
        title,
        description:value,
        category: cat,
        img:file ? imgUrl : "",
        date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });
      nav("/")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='add'>
    <div className="content">
      <input type="title" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
      <div className="textEditor">
        <ReactQuill 
          className="editor" 
          theme="snow" 
          value={value} 
          onChange={setValue} 
        />
      </div> 
      
    </div>
    <div className="menu">
      <div className="item">
        <h1>Publish</h1>
        <span>
          <b>Status: </b> Draft
        </span>
        <span>
          <b>Visibility: </b> Public
        </span>
        <input style={{display:"none"}} type="file" name='' id='file' onChange={e=>setFile(e.target.files[0])}/>
        <label className="uploadLabel" htmlFor="file">Upload Image</label>
        <div className="buttons">
          <button>Save as a draft</button>
          <button onClick={handlePublish}>Publish</button>
        </div>
      </div>
      <div className="item">
        <h1>Category</h1>
        <div className="cat">
          <input 
          type="radio" 
          checked={cat === "museums"}
          value="museums" 
          name="category" 
          id="museums"  
          onChange={(e) => setCat(e.target.value)}/>
          <label htmlFor='museums'>Museums</label>
        </div>
        <div className="cat">
          <input 
          type="radio" 
          checked={cat === "shopping"}
          value = "shopping" 
          name="category" 
          id="shopping"  
          onChange={(e) => setCat(e.target.value)}/>
          <label htmlFor='shopping'> Shopping</label>
        </div>
        <div className="cat">
          <input 
          type="radio" 
          checked={cat === "attractions"} 
          value ="attractions"
          name="category" 
          id="attraction"  
          onChange={(e) => setCat(e.target.value)}/>
          <label htmlFor='attractions'> Attractions</label>
        </div>
      </div>
    </div>
    </div>
  )
}


export default Write