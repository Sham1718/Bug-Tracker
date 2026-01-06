import React, { useState } from 'react'
import api from '../utils/axiosInstance'
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail]=useState("");
  const[pass,setPass]=useState("");
  const {login}=useAuth();
  const navigate=useNavigate();

  const handleLogin=async(e)=>{
      e.preventDefault();
      try{
        const res =await api.post("/auth/login",{
          email :email,
          password :pass
        });
        console.log(res.data);
        
       login(res.data.token)
        navigate("/dashboard")
      }catch(err){
        alert("Invalid Credentials..!")
      }
  }
  return (
    <div>
     
     <form onSubmit={handleLogin}>
      email:
      <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}  className='border'/>
      password:
     <input type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}}  className=' border'/>
     <button type='submit'>Login</button>
     </form>
    </div>
  )
}

export default Login
