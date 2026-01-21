import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  getIssueById,
  updateIssueStatus,
  updateIssueAssignee,
  updateIssueDescription,
} from "../api/issue";
import { getRole } from "../api/project";
import { getCommentByIssue, addComment } from "../api/comment";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const [issue, setIssue] = useState(null);
  const [status, setStatus] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState(null);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadcomment, setLoadcomment] = useState(true);

  const canEditIssue = role === "OWNER" || role === "MANAGER";

  useEffect(() => {
    getIssueById(projectId, issueId)
      .then((res) => {
        setIssue(res.data);
        setStatus(res.data.status);
        setAssigneeId(
          res.data.assigneId !== null && res.data.assigneId !== undefined
            ? String(res.data.assigneId)
            : ""
        );
        setDescription(res.data.description ?? "");
      })
      .catch(() => alert("Failed to load issue"));

    getCommentByIssue(issueId)
      .then((res) => setComments(res.data))
      .catch(() => alert("Failed to load comments"))
      .finally(() => setLoadcomment(false));

    getRole(projectId)
      .then((res) => setRole(res.data))
      .catch((e) => console.log(e));
  }, [projectId, issueId]);

  const handleUpdate = async () => {
    try {
      const updates = [];

      if (description !== issue.description) {
        updates.push(updateIssueDescription(issueId, description));
      }

      if (
        assigneeId !== "" &&
        String(assigneeId) !== String(issue.assigneId ?? "")
      ) {
        updates.push(updateIssueAssignee(issueId, Number(assigneeId)));
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
        assigneId: assigneeId !== "" ? Number(assigneeId) : null,
      }));

      alert("Issue updated successfully");
    } catch {
      alert("Failed to update issue");
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      await addComment(issueId, { content: commentText });
      setCommentText("");
      const res = await getCommentByIssue(issueId);
      setComments(res.data);
    } catch {
      alert("Failed to add comment");
    }
  };

  if (!issue) return <p className="p-6">Loading issue...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 py-22">
        <div className="max-w-3xl mx-auto bg-white rounded-md shadow p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {issue.title}{" "}
              <span className="text-gray-400">#{issue.id}</span>
            </h2>

            <span
              className={`text-xs px-2 py-1 rounded font-medium ${
                status === "OPEN"
                  ? "bg-gray-200 text-gray-700"
                  : status === "IN_PROGRESS"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {status}
            </span>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={!canEditIssue}
              className={`w-full border rounded px-3 py-2 ${
                !canEditIssue ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Assignee ID
              </label>
              <input
                type="number"
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                disabled={!canEditIssue}
                className={`w-full border rounded px-3 py-2 ${
                  !canEditIssue ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={!canEditIssue}
                className={`w-full border rounded px-3 py-2 ${
                  !canEditIssue ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
          </div>

          {/* Meta */}
          <div className="text-sm text-gray-600 space-y-1">
            <p><b>Priority:</b> {issue.priority}</p>
            <p><b>Project ID:</b> {issue.projectId}</p>
            <p><b>Created:</b> {issue.createdAt}</p>
            <p><b>Updated:</b> {issue.updatedAt}</p>
            <p><b>Your Role:</b> {role}</p>
          </div>

          {canEditIssue && (
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Issue
            </button>
          )}

          {/* Comments */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>

            {loadcomment ? (
              <p className="text-gray-500">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-gray-500">No comments yet</p>
            ) : (
              <div className="space-y-3 mb-4">
                {comments.map((c) => (
                  <div key={c.id} className="bg-gray-50 border rounded p-3">
                    <p className="text-sm">{c.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      User {c.userId} ·{" "}
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment (allowed for all members) */}
            <div className="bg-gray-50 border rounded p-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                placeholder="Write a comment..."
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddComment}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
