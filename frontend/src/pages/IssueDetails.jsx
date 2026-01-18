import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  getIssueById,
  updateIssueStatus,
  updateIssueAssignee,
  updateIssueDescription,
} from "../api/issue";
import { getCommentByIssue, addComment } from "../api/comment";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const [issue, setIssue] = useState(null);
  const [status, setStatus] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [description, setDescription] = useState("");

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadcomment, setLoadcomment] = useState(true);

  useEffect(() => {
    getIssueById(projectId, issueId)
      .then((res) => {
        setIssue(res.data);
        setStatus(res.data.status);
        setAssigneeId(res.data.assigneId ?? "");
        setDescription(res.data.description ?? "");
      })
      .catch(() => alert("Failed to load issue"));

    getCommentByIssue(issueId)
      .then((res) => setComments(res.data))
      .catch(() => alert("Failed to load comments"))
      .finally(() => setLoadcomment(false));
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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-md shadow p-6 space-y-5">
          <h2 className="text-2xl font-semibold">{issue.title}</h2>

          {/* Description */}
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

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Assignee ID
            </label>
            <input
              type="number"
              value={assigneeId}
              onChange={(e) =>
                setAssigneeId(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Status */}
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

          {/* Meta */}
          <div className="text-sm text-gray-600 space-y-1">
            <p><b>Priority:</b> {issue.priority}</p>
            <p><b>Project ID:</b> {issue.projectId}</p>
            <p><b>Created:</b> {issue.createdAt}</p>
            <p><b>Updated:</b> {issue.updatedAt}</p>
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Issue
          </button>

          {/* Comments */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>

            {loadcomment ? (
              <p className="text-gray-500">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-gray-500">No comments yet</p>
            ) : (
              <div className="space-y-3 mb-6">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-gray-50 border rounded p-3"
                  >
                    <p className="text-sm text-gray-800">{c.content}</p>
                    <div className="text-xs text-gray-400 mt-1">
                      User {c.userId} ·{" "}
                      {new Date(c.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div className="bg-gray-50 border rounded p-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                placeholder="Write a comment..."
                className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
