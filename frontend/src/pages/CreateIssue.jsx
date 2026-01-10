import React, { useState } from 'react'
import { createIssue } from '../api/issue';
import { useNavigate, useParams } from 'react-router-dom';

const CreateIssue = () => {
  const{projectId}=useParams();


  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [priority,setPriority]=useState("");
  const [assigneId,setAssigneId]=useState(null);
  const navigate=useNavigate();
  // console.log(projectId);
  

  const handleCreate=(e)=>{
    e.preventDefault();

    createIssue(projectId,{
      title,description,priority,assigneId
    }).then(()=>navigate(`/projects/${projectId}`))
    .catch(err=>console.log(err))
    
  }
  

  return (
    <div>

      <form onSubmit={handleCreate}>
        title:
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
        Description:
        <input type="text"  value={description} onChange={(e)=>setDescription(e.target.value)}/>
        Priority:
        <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  required
>
  <option value="" disabled>
    Select priority
  </option>
  <option value="LOW">LOW</option>
  <option value="MEDIUM">MEDIUM</option>
  <option value="HIGH">HIGH</option>
</select>

        Assignee Id:
        <input type="number" value={assigneId} onChange={(e)=>setAssigneId(Number(e.target.value))}/>

        <button type='submit'>create</button>

      </form>



      
    </div>
  )
}

export default CreateIssue
