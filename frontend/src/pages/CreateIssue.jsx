import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { createIssue } from "../api/issue";
import { getRole } from "../api/project";

const CreateIssue = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assigneId, setAssigneId] = useState(null);

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const canCreateIssue =
    role === "OWNER" || role === "MANAGER" || role === "TESTER";

  useEffect(() => {
    getRole(projectId)
      .then((res) => setRole(res.data))
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleCreate = (e) => {
    e.preventDefault();

    createIssue(projectId, {
      title,
      description,
      priority,
      assigneId,
    }).then(() =>
      navigate(`/projects/${projectId}/issues`)
    );
  };

  if (loading) {
    return <p className="text-zinc-400 p-6">Loading...</p>;
  }

  if (!canCreateIssue) {
    return (
      <div className="flex bg-zinc-900 min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64 pt-24 px-10">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 max-w-md">
            <h2 className="text-xl font-semibold text-red-400 mb-2">
              Access Denied
            </h2>
            <p className="text-zinc-400">
              You are not allowed to create issues in this project.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-zinc-900 min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 pt-20 px-12">
        <div className="max-w-3xl">
          {/* Header */}
          <h1 className="text-3xl font-semibold text-zinc-100 mb-1">
            Create Issue
          </h1>
          <p className="text-zinc-400 mb-6">
            Add a new issue to this project.
          </p>

          {/* Form */}
          <form
            onSubmit={handleCreate}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-8 space-y-6"
          >
            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100"
                required
              >
                <option value="" disabled>
                  Select priority
                </option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">
                Assignee ID
              </label>
              <input
                type="number"
                value={assigneId ?? ""}
                onChange={(e) =>
                  setAssigneId(Number(e.target.value))
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-4 py-2.5 text-zinc-100"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-md text-sm font-medium transition"
              >
                Create Issue
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(`/projects/${projectId}/issues`)
                }
                className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-6 py-2.5 rounded-md text-sm transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateIssue;
