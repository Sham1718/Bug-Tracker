import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  getProjectById,
  getMember,
  addMemberByEmail,
  deleteMember,
  getRole,
} from "../api/project";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [member, setMember] = useState([]);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState(null);

  const [newMember, setNewMember] = useState({
    email: "",
    role: "DEVELOPER",
  });

  useEffect(() => {
    getProjectById(projectId).then((res) => setProject(res.data));
    getMember(projectId).then((res) => setMember(res.data));
    getRole(projectId).then((res) => setRole(res.data));
  }, [projectId]);

  const canManageMembers = role === "OWNER" || role === "MANAGER";

  const addMemberByemail = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await addMemberByEmail(projectId, {
        email: newMember.email,
        role: newMember.role,
      });

      setModal(false);
      setNewMember({ email: "", role: "DEVELOPER" });

      const res = await getMember(projectId);
      setMember(res.data);
    } catch (err) {
      setError(err.response?.data || "Failed to add member");
    }
  };

  const handleDeleteMember = async (userId) => {
    const ok = window.confirm("Remove this member?");
    if (!ok) return;

    try {
      await deleteMember(projectId, userId);
      const res = await getMember(projectId);
      setMember(res.data);
    } catch {
      alert("Failed to remove member");
    }
  };

  if (!project) return <p className="text-zinc-400 p-6">Loading...</p>;

  return (
    <div className="flex bg-zinc-900 min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 pt-24 px-10">
        <div className="max-w-5xl space-y-8">

          {/* Project Header */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-semibold text-zinc-100 mb-1">
                  {project.name}
                </h1>
                <p className="text-sm text-zinc-400">
                  Key: {project.projectKeys}
                </p>
              </div>

              <span className="text-xs bg-zinc-700 text-zinc-200 px-3 py-1 rounded-full">
                Role: {role}
              </span>
            </div>

            <p className="text-zinc-300 mt-4">
              {project.description || "No description provided."}
            </p>

            <div className="flex gap-3 mt-6">
              {canManageMembers && (
                <button
                  onClick={() =>
                    navigate(`/projects/${projectId}/settings`)
                  }
                  className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded-md text-sm transition"
                >
                  Project Settings
                </button>
              )}

              <button
                onClick={() =>
                  navigate(`/projects/${projectId}/issues`)
                }
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition"
              >
                View Issues
              </button>
            </div>
          </div>

          {/* Members */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-zinc-100">
                Members
              </h2>

              {canManageMembers && (
                <button
                  onClick={() => setModal(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition"
                >
                  Add Member
                </button>
              )}
            </div>

            <div className="space-y-3">
              {member.map((m) => (
                <div
                  key={`${m.projectId}-${m.userId}`}
                  className="flex justify-between items-center bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3"
                >
                  <div>
                    <div className="text-zinc-100 text-sm font-medium">
                      User ID: {m.userId}
                    </div>
                    <span className="text-xs text-zinc-400">
                      {m.role}
                    </span>
                  </div>

                  {canManageMembers && m.role !== "OWNER" && (
                    <button
                      onClick={() => handleDeleteMember(m.userId)}
                      className="text-sm text-red-400 hover:text-red-300 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 w-96">
            <h3 className="text-lg font-semibold text-zinc-100 mb-4">
              Add Member
            </h3>

            <form onSubmit={addMemberByemail} className="space-y-4">
              <input
                type="email"
                placeholder="User email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100"
                required
              />

              <select
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({ ...newMember, role: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100"
              >
                <option value="MANAGER">MANAGER</option>
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="TESTER">TESTER</option>
              </select>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded-md text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
