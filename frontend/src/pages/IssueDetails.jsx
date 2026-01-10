import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getIssueById,
  updateIssueStatus,
  updateIssueAssignee
} from "../api/issue";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const [issue, setIssue] = useState(null);
  const [status, setStatus] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  useEffect(() => {
    getIssueById(projectId, issueId)
      .then((res) => {
        setIssue(res.data);
        setStatus(res.data.status);
        setAssigneeId(res.data.assigneId ?? "");
      })
      .catch((e) => console.log(e));
  }, [projectId, issueId]);

  const handleUpdate = async () => {
    try {
      const updates = [];

      // assignee update only if changed
      if (String(assigneeId || "") !== String(issue.assigneId || "")) {
        updates.push(updateIssueAssignee(issueId, assigneeId || null));
      }

      // status update only if changed
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
        status,
        assigneId: assigneeId || null,
      }));

      alert("Issue updated successfully");
    } catch (e) {
      console.error(e);
      alert("Failed to update issue");
    }
  };

  if (!issue) return <p>Loading issue...</p>;

  return (
    <div>
      <h2>{issue.title}</h2>

      <p><b>Description:</b></p>
      <p>{issue.description}</p>

      <label>Assignee ID</label>
      <input
        type="number"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
      />

      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="OPEN">OPEN</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <p><b>Priority:</b> {issue.priority}</p>
      <p><b>Project ID:</b> {issue.projectId}</p>
      <p><b>Created:</b> {issue.createdAt}</p>
      <p><b>Updated:</b> {issue.updatedAt}</p>

      <br />
      <button onClick={handleUpdate}>Update Issue</button>
    </div>
  );
};

export default IssueDetails;
