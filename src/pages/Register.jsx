import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Register = () => {
  const [user,setUser] = useState({
    username:"",
    email:"",
    password:""
  })

  const [err,setError] = useState(null);

  const nav = useNavigate()

  const handleUser = e => {
    setUser(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  
  const handleSubmit= async e =>{
    e.preventDefault()
    try{
      await axios.post("auth/register",user)
      nav("/login")
    }catch(err){
      setError(err.response.data);
    }
  }

  console.log(user)

  return (
    <div className='auth'>
        <h1>Register</h1>
        <form>
         <input type="text" name="username" placeholder="Username" onChange={handleUser}/>
         <input type="email" name="email" placeholder="Email" onChange={handleUser}/>   
         <input type="password" name="password" placeholder="Password" onChange={handleUser}/>   
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Do you already have an account? <Link to="/login">Login!</Link></span>
        </form>
    </div>
  )
}


export default Register