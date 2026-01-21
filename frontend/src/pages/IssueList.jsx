import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getissueByproject } from "../api/issue";
import { getRole } from "../api/project";

const IssueList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const canCreateIssue =
    role === "OWNER" || role === "MANAGER" || role === "TESTER";

  useEffect(() => {
    getissueByproject(projectId)
      .then((res) => setIssues(res.data))
      .finally(() => setLoading(false));

    getRole(projectId).then((res) => setRole(res.data));
  }, [projectId]);

  return (
    <div className="flex bg-zinc-900 min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 pt-24 px-10">
        <div className="max-w-6xl">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-zinc-100">
                Issues
              </h1>
              <p className="text-sm text-zinc-400">
                Your role: {role}
              </p>
            </div>

            {canCreateIssue && (
              <button
                onClick={() =>
                  navigate(`/projects/${projectId}/createIssue`)
                }
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-md text-sm font-medium transition"
              >
                Create Issue
              </button>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-zinc-400">Loading issues...</p>
          ) : issues.length === 0 ? (
            <p className="text-zinc-500">No issues found.</p>
          ) : (
            <div className="space-y-2">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() =>
                    navigate(`/projects/${projectId}/${issue.id}`)
                  }
                  className="cursor-pointer bg-zinc-800 border border-zinc-700 rounded-lg px-5 py-4 hover:bg-zinc-700 transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-zinc-100 font-medium">
                      {issue.title}
                    </h3>

                    <span
                      className={`text-xs px-2 py-1 rounded font-medium
                        ${
                          issue.status === "OPEN"
                            ? "bg-zinc-700 text-zinc-200"
                            : issue.status === "IN_PROGRESS"
                            ? "bg-yellow-600/20 text-yellow-400"
                            : "bg-green-600/20 text-green-400"
                        }
                      `}
                    >
                      {issue.status}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 mt-1">
                    Assignee:{" "}
                    {issue.assigneId ?? "Unassigned"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default IssueList;
