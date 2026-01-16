import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getProjectById,getMember,addMember} from '../api/project'


const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  // const [issues, setIssues] = useState([]);
  const[member,setMember]=useState([]);
  const[newMember,setNewMember]=useState({
      userId:"",
      role:"DEVELOPER"
  })
  const[modal,setModal]=useState(false);

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

  const addMembertoproject=(e)=>{
    e.preventDefault();
    addMember(projectId,{
      role:newMember.role,
      userId:Number(newMember.userId)
    })
    .then(()=>{setModal(false);
    setNewMember({role:"DEVELOPER",userId:""});
  return getMember(projectId);}).then((res)=>setMember(res.data))
  .catch((e)=>console.log(e)
  )
  }
  // console.log(project);
  // console.log(member);
  // console.log(member[0]);
  
  
  

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
          {/* Members Section */}
<div className="bg-white p-6 rounded-md shadow">
  <h3 className="text-xl font-semibold mb-4">Members</h3>

  {member.length === 0 ? (
    <p className="text-gray-500">No members found</p>
  ) : (
    member.map((m) => (
      <div
        key={m.id}
        className="border p-3 rounded mb-2 flex justify-between items-center"
      >
        <div className="text-sm text-gray-700">
          User ID: {m.userId}
        </div>

        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
          {m.role}
        </span>
      </div>
    ))
  )}
</div>


<button
  onClick={() => setModal(true)}
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  Add Member
</button>

{modal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-md w-96">
      <h3 className="text-lg font-semibold mb-4">Add Member</h3>

      <form onSubmit={addMembertoproject}>
        <input
          type="number"
          placeholder="User ID"
          value={newMember.userId}
          onChange={(e) =>
            setNewMember({ ...newMember, userId: e.target.value })
          }
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <select
          value={newMember.role}
          onChange={(e) =>
            setNewMember({ ...newMember, role: e.target.value })
          }
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="OWNER">OWNER</option>
          <option value="MANAGER">MANAGER</option>
          <option value="DEVELOPER">DEVELOPER</option>
          <option value="TESTER">TESTER</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setModal(false)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
)}


        </div>

        <button
  onClick={() => navigate(`/projects/${projectId}/issues`)}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  View Issues
</button>


        
      </div>
    </div>
  );
};

export default ProjectDetails;
