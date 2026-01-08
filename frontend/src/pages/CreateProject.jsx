import React, { useState } from 'react'
import api from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const CreateProject = () => {
  const[name,setName]=useState("")
  const[projectKeys,setProjectKeys]=useState("")
  const[description,setDescription]=useState("")
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await api.post(`/projects`,{
      name,
      projectKeys,
      description
    });
    navigate('/projects')
    }catch(err){
      console.log(err);
      
    }
    

  }

  
  return (
    <div>
     <form onSubmit={handleSubmit}>
      title:
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      projectKeys:
      <input type="text" value={projectKeys} onChange={(e=>setProjectKeys(e.target.value))} />
      Description:
      <input type="text" value={description} onChange={(e=>setDescription(e.target.value))}/>
      <button type='submit'>sumbit</button>
     </form>
    </div>
  )
}

export default CreateProject
