import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  getProjectById,
  deleteProject,
  updateProject,
  getRole,
} from "../api/project";

const ProjectSetting = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const canEdit = role === "OWNER" || role === "MANAGER";
  const canDelete = role === "OWNER";

  useEffect(() => {
    getProjectById(projectId)
      .then((res) => {
        setProject(res.data);
        setDescription(res.data.description ?? "");
      })
      .catch(() => alert("Failed to load project"))
      .finally(() => setLoading(false));

    getRole(projectId)
      .then((res) => setRole(res.data))
      .catch(() => {});
  }, [projectId]);

  const handleUpdate = async () => {
    try {
      await updateProject(projectId, {
        name: project.name || " ",
        desc: description || " ",
      });
      alert("Project updated");
    } catch {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const ok = window.confirm(
      "This will permanently delete the project and all issues. Continue?"
    );
    if (!ok) return;

    try {
      await deleteProject(projectId);
      alert("Project deleted");
      navigate("/projects");
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) {
    return <p className="text-zinc-400 p-6">Loading...</p>;
  }

  if (!project) return null;

  return (
    <div className="flex bg-zinc-950 min-h-screen text-zinc-100">
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 ml-64 pt-24 px-10">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Project Settings</h1>
            <span className="text-sm text-zinc-400">
              Your role: {role}
            </span>
          </div>

          {/* Project Info */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-2 text-sm">
            <p><span className="text-zinc-400">Name:</span> {project.name}</p>
            <p><span className="text-zinc-400">Key:</span> {project.projectKeys}</p>
            <p><span className="text-zinc-400">Created:</span> {project.createdAt}</p>
            <p><span className="text-zinc-400">Updated:</span> {project.updatedAt}</p>
          </div>

          {/* Description */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
            <label className="block text-sm text-zinc-400">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={!canEdit}
              className={`w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-sm ${
                !canEdit ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />

            {canEdit && (
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md text-sm transition"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* Danger Zone */}
          {canDelete && (
            <div className="bg-zinc-900 border border-red-900/40 rounded-xl p-6">
              <h3 className="text-red-500 font-semibold mb-3">
                Danger Zone
              </h3>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-md text-sm"
              >
                Delete Project
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default ProjectSetting;
