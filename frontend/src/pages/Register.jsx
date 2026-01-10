import React, { useState } from 'react'
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const Register = () => {
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
  const{registerToken}=useAuth();

  const handleRegister=async(e)=>{
    e.preventDefault();
  try{
      const res = await register({username,email,password})
      registerToken(res.data.token)
      console.log(res.data);
      navigate("/dashboard")
      
      
  }catch(err){
    alert("Username Already exists")
  }
    


    

  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        UserName:
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
        Email:
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        Password :
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>

    </div>
  )
}

export default Register