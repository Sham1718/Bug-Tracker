import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getIssueById,
  updateIssueStatus,
  updateIssueAssignee,
  updateIssueDescription,
} from "../api/issue";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const [issue, setIssue] = useState(null);
  const [status, setStatus] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getIssueById(projectId, issueId)
      .then((res) => {
        // console.log(res.data);
        
        setIssue(res.data);
        setStatus(res.data.status);
        setAssigneeId(res.data.assigneId ?? "");
        setDescription(res.data.description ?? "");
      })
      .catch((e) => console.log(e));
  }, [projectId, issueId]);

  const handleUpdate = async () => {
    try {
      const updates = [];

      if (description !== issue.description) {
        updates.push(updateIssueDescription(issueId, description));
      }

      if (String(assigneeId || "") !== String(issue.assigneId || "")) {
        updates.push(updateIssueAssignee(issueId, assigneeId || null));
      }

      if (status !== issue.status) {
        updates.push(updateIssueStatus(issueId, status));
      }

      if (updates.length === 0) {
        alert("No changes to update");
        return;
      }

      await Promise.all(updates);

      setIssue((prev) => ({
        ...prev,
        description,
        status,
        assigneId: assigneeId || null,
      }));

      alert("Issue updated successfully");
    } catch (e) {
      console.error(e);
      alert("Failed to update issue");
    }
  };

  if (!issue) return <p className="p-6">Loading issue...</p>;

  return (
    <div className="min-h-[80vh] bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-md shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold">{issue.title}</h2>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Assignee ID
          </label>
          <input
            type="number"
            value={assigneeId}
            onChange={(e) => setAssigneeId(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p><b>Priority:</b> {issue.priority}</p>
          <p><b>Project ID:</b> {issue.projectId}</p>
          <p><b>Created:</b> {issue.createdAt}</p>
          <p><b>Updated:</b> {issue.updatedAt}</p>
        </div>

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Issue
        </button>
      </div>
    </div>
  );
};

export default IssueDetails;
