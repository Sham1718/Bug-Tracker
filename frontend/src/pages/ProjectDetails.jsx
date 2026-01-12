import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { getissueByproject } from "../api/issue";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api
      .get(`/projects/${projectId}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.log(err));

    getissueByproject(projectId)
      .then((res) => setIssues(res.data))
      .catch((err) => console.log(err));
  }, [projectId]);

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
          <p className="text-gray-700">{project.description}</p>
        </div>

        {/* Issues Section */}
        <div className="bg-white p-6 rounded-md shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Issues</h3>
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
      </div>
    </div>
  );
};

export default ProjectDetails;
