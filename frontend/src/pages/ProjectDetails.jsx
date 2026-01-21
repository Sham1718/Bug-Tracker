import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProjectById,
  getMember,
  addMemberByEmail,
  deleteMember,
  getRole
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
    getProjectById(projectId).then(res => setProject(res.data));
    getMember(projectId).then(res => setMember(res.data));
    getRole(projectId).then(res => setRole(res.data));
  }, [projectId]);

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
    const ok = window.confirm("remove this member ?");
    if (!ok) return;

    try {
      await deleteMember(projectId, userId);
      const res = await getMember(projectId);
      setMember(res.data);
    } catch {
      alert("failed to delete member..!");
    }
  };

  if (!project) return <p className="p-6">Loading...</p>;

  const canManageMembers = role === "OWNER" || role === "MANAGER";

  return (
    <div className="min-h-[80vh] bg-gray-100 p-6 py-24">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Project Info */}
        <div className="bg-white p-6 rounded-md shadow space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{project.name}</h2>

            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Your role: {role}
            </span>
          </div>

          <p className="text-sm text-gray-500">Key: {project.projectKeys}</p>
          <p className="text-sm">Created: {project.createdAt}</p>
          <p className="text-sm">Updated: {project.updatedAt}</p>
          <p className="text-gray-700">{project.description}</p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate(`/projects/${projectId}/settings`)}
              className="text-sm border px-4 py-2 rounded hover:bg-gray-100"
            >
              Project Settings
            </button>

            <button
              onClick={() => navigate(`/projects/${projectId}/issues`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Issues
            </button>
          </div>
        </div>

        {/* Members */}
        <div className="bg-white p-6 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Members</h3>

            {canManageMembers && (
              <button
                onClick={() => setModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Member
              </button>
            )}
          </div>

          <div className="space-y-3">
            {member.map((m) => (
              <div
                key={`${m.projectId}-${m.userId}`}
                className="border rounded p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium">User ID: {m.userId}</p>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {m.role}
                  </span>
                </div>

                {canManageMembers && m.role !== "OWNER" && (
                  <button
                    onClick={() => handleDeleteMember(m.userId)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96 space-y-4">
            <h3 className="text-lg font-semibold">Add Member</h3>

            <form onSubmit={addMemberByemail} className="space-y-3">
              <input
                type="email"
                placeholder="Enter user email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <select
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({ ...newMember, role: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option value="MANAGER">MANAGER</option>
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="TESTER">TESTER</option>
              </select>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
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
  );
};

export default ProjectDetails;
