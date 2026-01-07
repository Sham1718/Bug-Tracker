import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const navigate =useNavigate();
  

  return (
    <div>
      <button onClick={()=>navigate("/createProject")}>
        Create
      </button>
      <button onClick={()=>navigate("/projects")} >
        
        My Projects
      </button>

      <p>No projects here</p>
    </div>
  )
}

export default DashBoard
