import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const nvigate =useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem("token")
    nvigate('/');
    
  }
  return (
    <div>
      asdfghjkl


      <button onClick={handleLogout}>Logout</button>
      
    </div>
  )
}

export default Navbar
