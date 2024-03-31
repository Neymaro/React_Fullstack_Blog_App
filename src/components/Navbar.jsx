import React, { useContext } from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export const Navbar = () => {
  const {currentUser,logout} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt='' />
          </Link>
        </div>
        <div className="links">
        <Link className='link' to="/?cat=museums">Museums</Link>
        <Link className='link' to="/?cat=shopping">Shopping</Link>
        <Link className='link' to="/?cat=attractions">Attractions</Link>
        <span>{currentUser?.username}</span>
        {currentUser ? (
        <span onClick={logout}>Logout</span>):(
        <Link className='link' 
        to="/login">
          Login
        </Link>)}
        <span className='write'>
          <Link to="/write" className='link'>Post</Link>
        </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar