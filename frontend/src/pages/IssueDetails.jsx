import { useEffect, useState } from "react";
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
  const [loadingComments, setLoadingComments] = useState(true);

  const canEditIssue = role === "OWNER" || role === "MANAGER";

  useEffect(() => {
    getIssueById(projectId, issueId).then((res) => {
      setIssue(res.data);
      setStatus(res.data.status);
      setAssigneeId(
        res.data.assigneId !== null ? String(res.data.assigneId) : ""
      );
      setDescription(res.data.description ?? "");
    });

    getCommentByIssue(issueId)
      .then((res) => setComments(res.data))
      .finally(() => setLoadingComments(false));

    getRole(projectId).then((res) => setRole(res.data));
  }, [projectId, issueId]);

  const handleUpdate = async () => {
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

    if (updates.length === 0) return;

    await Promise.all(updates);

    setIssue((prev) => ({
      ...prev,
      description,
      status,
      assigneId: assigneeId !== "" ? Number(assigneeId) : null,
    }));
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    await addComment(issueId, { content: commentText });
    setCommentText("");
    const res = await getCommentByIssue(issueId);
    setComments(res.data);
  };

  if (!issue) {
    return <p className="text-zinc-400 p-6">Loading issue...</p>;
  }

  return (
    <div className="flex bg-zinc-950 min-h-screen text-zinc-100">
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 pt-24 px-10">
        <div className="w-full">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">
              {issue.title}
              <span className="text-zinc-400 ml-2">#{issue.id}</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Your role: {role}
            </p>
          </div>

         
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

           
            <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">

           
              <span
                className={`inline-block text-xs px-3 py-1 rounded-full font-medium
                  ${
                    status === "OPEN"
                      ? "bg-zinc-800 text-zinc-300"
                      : status === "IN_PROGRESS"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }
                `}
              >
                {status}
              </span>

              {/* Description */}
              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  disabled={!canEditIssue}
                  className={`w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-sm ${
                    !canEditIssue ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                />
              </div>

           
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">
                    Assignee ID
                  </label>
                  <input
                    type="number"
                    value={assigneeId}
                    onChange={(e) => setAssigneeId(e.target.value)}
                    disabled={!canEditIssue}
                    className={`w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-sm ${
                      !canEditIssue ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={!canEditIssue}
                    className={`w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-sm ${
                      !canEditIssue ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
              </div>

              {canEditIssue && (
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-md text-sm font-medium transition"
                >
                  Update Issue
                </button>
              )}
            </div>

            {/* RIGHT — COMMENTS (40%) */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col">

              <h2 className="text-lg font-semibold mb-4">Comments</h2>

              {/* Comments list */}
              <div className="flex-1 space-y-3 overflow-y-auto mb-4">
                {loadingComments ? (
                  <p className="text-zinc-400">Loading comments...</p>
                ) : comments.length === 0 ? (
                  <p className="text-zinc-500">No comments yet.</p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="bg-zinc-950 border border-zinc-800 rounded-md p-3"
                    >
                      <p className="text-sm">{c.content}</p>
                      <p className="text-xs text-zinc-500 mt-1">
                        User {c.userId} ·{" "}
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                placeholder="Write a comment..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2.5 text-sm mb-3"
              />

              <button
                onClick={handleAddComment}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm self-end transition"
              >
                Add Comment
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default IssueDetails;
