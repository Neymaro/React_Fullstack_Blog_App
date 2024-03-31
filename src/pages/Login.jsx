import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const Login = () => {
  const [user,setUser] = useState({
    username:"",
    password:""
  })

  const [err,setError] = useState(null);

  const nav = useNavigate();

  const { login } = useContext(AuthContext);

  const handleUser = e => {
    setUser(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      await login(user)
      nav("/")
    }catch(err){
      setError(err.response.data);
    }
  };

  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
         <input type="text" placeholder="Username" name="username" onChange={handleUser}/>
         <input type="password" placeholder="Password" name="password" onChange={handleUser}/>   
        <button onClick={handleSubmit}>Login</button>
        { err && <p>{err}</p>}
        <span>You did not register yet? Than <Link to="/register">Sign up!</Link></span>
        </form>
    </div>
  )
}


export default Login