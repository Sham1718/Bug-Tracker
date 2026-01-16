import React, { useEffect, useState } from 'react'
import { getissueByproject } from '../api/issue'
import { useNavigate, useParams } from 'react-router-dom'

const IssueList = () => {
    const {projectId} =useParams();
    const[issues,setIssues]=useState([]);
    const[loading,setLoading]=useState(true);
    const navigate=useNavigate();
    const fetchIssue=async()=>{
     await getissueByproject(projectId)
     .then((res)=>setIssues(res.data))
     .then(()=>setLoading(false))
     .catch((e)=>console.log(e)
     );
    }
    

    useEffect(()=>{
        fetchIssue();
    },[projectId])
    // console.log(issues);

    // if(loading)return <p>loading</p>
    
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Issues</h2>

        <button
          onClick={() => navigate(`/projects/${projectId}/createIssue`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Issue
        </button>
      </div>

      {issues.length === 0 ? (
        <p className="text-gray-500">No issues found</p>
      ) : (
        <div className="space-y-3">
          {issues.map((issue) => (
            <div
              key={issue.id}
              onClick={() =>
                navigate(`/projects/${projectId}/${issue.id}`)
              }
              className="p-4 border rounded cursor-pointer hover:bg-gray-50"
            >
              <div className="font-medium">{issue.title}</div>
              <div className="text-sm text-gray-500">
                Status: {issue.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default IssueList
