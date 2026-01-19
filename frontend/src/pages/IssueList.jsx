import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getissueByproject } from "../api/issue";

const IssueList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssue = async () => {
    try {
      const res = await getissueByproject(projectId);
      setIssues(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [projectId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 py-22">
        <div className="max-w-5xl mx-auto bg-white rounded-md shadow p-6">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Issues</h2>

            <button
              onClick={() => navigate(`/projects/${projectId}/createIssue`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Issue
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-gray-500">Loading issues...</p>
          ) : issues.length === 0 ? (
            <p className="text-gray-500">No issues found</p>
          ) : (
            <div className="space-y-3">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() =>
                    navigate(`/projects/${projectId}/${issue.id}`)
                  }
                  className="border rounded p-4 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{issue.title}</h3>

                    {/* Status Chip */}
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium
                        ${
                          issue.status === "OPEN"
                            ? "bg-gray-200 text-gray-700"
                            : issue.status === "IN_PROGRESS"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }
                      `}
                    >
                      {issue.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Assignee: {issue.assigneId ?? "Unassigned"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueList;
