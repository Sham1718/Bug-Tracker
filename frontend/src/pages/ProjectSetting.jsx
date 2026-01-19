import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams,useNavigate } from 'react-router-dom'
import { getProjectById,deleteProject,updateProject } from '../api/project'

const ProjectSetting = () => {
  const {projectId}=useParams();
  const navigate=useNavigate();
  const [project,setProject]=useState(null);
  const[description,setDescription]=useState("");
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    getProjectById(projectId)
    .then((res)=>{setProject(res.data); setDescription(res.data.description ?? "");})
    .catch(()=>alert("failed to load project!"))
    .finally(()=>setLoading(false))
  },[projectId])



  const handleupdate=async()=>{
    try {
      await updateProject(projectId,{
      name:project.name || " ",
      desc:description || " "
    });
    alert("project updated")
    } catch (error) {
      alert("update failed!")
    }
  }

  const handleDelete=async()=>{
    const confirmdelete=window.confirm("This will permanently delete the project and all issues. Continue?");
    if(!confirmdelete) return;
    try {
      await deleteProject(projectId);
      alert("project Deleted!");
      navigate("/projects");
    } catch (error) {
      alert("failed to delete project")
    }
  }

  if(loading) return<p>loading...!</p>
  if (!project) {
    return null;
  }




  return (
    <div className='flex items-center '>
    <div className="w-64 shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-md shadow p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Project Settings</h2>

          {/* Project Info */}
          <div className="space-y-2 text-sm text-gray-700">
            <p><b>Name:</b> {project.name}</p>
            <p><b>Key:</b> {project.projectKeys}</p>
            <p><b>Created:</b> {project.createdAt}</p>
            <p><b>Updated:</b> {project.updatedAt}</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
            <button
              onClick={handleupdate}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>

          {/* Danger Zone */}
          <div className="border-t pt-6">
            <h3 className="text-red-600 font-semibold mb-2">Danger Zone</h3>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Project
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProjectSetting
