import React, { useEffect, useState } from 'react'
import api from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate=useNavigate();
  const[projects,setProjects]=useState([]);
  const fetchProjects=async(e)=>{
    const res =await api.get("/projects")
    setProjects(res.data)
    console.log(res.data)
  }
  useEffect(()=>{
    fetchProjects();
  },[])
  
  
  return (
    <div>
      {projects.length === 0 ? (
  <p>No projects found</p>
) : (
  projects.map((p) => (
    <div key={p.id}
    onClick={()=>navigate(`/projects/${p.id}`)}>
      {p.name} ({p.projectKeys})
    </div>
  ))
)}
 
    </div>
  )
}

export default Projects
