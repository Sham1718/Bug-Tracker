import React, { useState } from 'react'
import api from '../utils/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getissueByproject } from '../utils/issueapi'

const ProjectDetails = () => {
  const {projectId}=useParams();
  const navigate=useNavigate();

  const[project,setProject]=useState(null);
  const[issues,setIssues]=useState([])

  useEffect(() => {
  api.get(`/projects/${projectId}`)
    .then(res => setProject(res.data))
    .catch(err => console.log(err));

  getissueByproject(projectId)
  .then(res=>setIssues(res.data))
  .catch(err=>console.log(err)
  );

 

}, [projectId]);

  // console.log(project);
  console.log(issues);
  

  
  

  if(!project) return<p>Loading...........</p>

  return (
    <div>
      project Details
      <h2>{project.name}</h2>
      <h2>{project.id}</h2>
      <h2>{project.projectKeys}</h2>
      <p>{project.description}</p>

      {
        issues.length===0 ? (
          <p>no issue found</p>
        ):(
          issues.map(issue=>(
            <div key={issue.id}>
              {issue.title}
            </div>
          ))
        )
      }

      <button onClick={()=>navigate(`/projects/${projectId}/createIssue`)} className=' border'>create Issue </button>
    </div>
  )
}

export default ProjectDetails
