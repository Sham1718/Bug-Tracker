
import api from "./axiosInstance";

export const getissueByproject=(projectId)=>{
  return  api.get(`/issues/projects/${projectId}`);
}


export const createIssue=(projectId,data)=>{
    return api.post(`/issues/projects/${projectId}`,data)
}

export const updateStatus=(projectId,issueid,status)=>{
    api.patch(`/projects/${projectId}/issues/${issueid}/status`,{status})
}

export const updateAssigne=(projectId,issueid,assigneeId)=>{
    api.patch(`/projects/${projectId}/issues/${issueid}/assignee`,{assigneeId})


}