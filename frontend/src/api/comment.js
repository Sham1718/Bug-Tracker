import api from "../utils/axiosInstance";

export const getCommentByIssue=(issueId)=>{
    return api.get(`/issues/${issueId}/comments`);
}

export const addComment=(issueId,data)=>{
    return api.post(`/issues/${issueId}/comments`,data);
}