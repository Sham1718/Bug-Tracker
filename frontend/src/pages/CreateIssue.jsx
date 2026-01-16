import React, { useState } from "react";
import { createIssue } from "../api/issue";
import { useNavigate, useParams } from "react-router-dom";

const CreateIssue = () => {
  const { projectId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assigneId, setAssigneId] = useState(null);

  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    createIssue(projectId, {
      title,
      description,
      priority,
      assigneId,
    })
      .then(() => navigate(`/projects/${projectId}/issues`))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-md shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create Issue
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded px-3 py-2"
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
            <label className="block text-sm font-medium mb-1">
              Assignee ID
            </label>
            <input
              type="number"
              value={assigneId ?? ""}
              onChange={(e) => setAssigneId(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
