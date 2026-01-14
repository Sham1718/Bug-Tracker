import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getProjectById,getMember} from '../api/project'


const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [issues, setIssues] = useState([]);
  const[member,setMember]=useState([]);

  useEffect(() => {
    getProjectById(projectId)
    .then((res)=>setProject(res.data))
    .catch((e)=>console.log(e)
    )
    getMember(projectId)
    .then((res)=>setMember(res.data))
    .catch((e)=>console.log(e)
    )
  }, [projectId]);

  // console.log(project);
  console.log(member);
  console.log(member[0]);
  
  
  

  if (!project) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-[80vh] bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Project Info */}
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
          <p className="text-sm text-gray-500 mb-2">
            Key: {project.projectKeys}
          </p>
          <p>createAT:{project.createdAt}</p>
          <p>updatedAt:{project.updatedAt
}</p>
          <p className="text-gray-700">description:{project.description}</p>
          {member.map((member)=>
          <div>id:

            {member.id}
            <p>projectId:{member.projectId}</p>
            <p> userId:{member.userId}</p>
            <p>role:{member.role}</p>
            <p>joinAt:{member.joinAt}</p>
          </div>)}
        </div>

        
      </div>
    </div>
  );
};

export default ProjectDetails;
