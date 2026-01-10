import api from "../utils/axiosInstance";

export const getissueByproject=(projectId)=>{
  return  api.get(`/issues/projects/${projectId}`);
}


export const createIssue=(projectId,data)=>{
    return api.post(`/issues/projects/${projectId}`,data)
}

export const updateIssueStatus=(issueid,status)=>{
   return api.patch(`/issues/${issueid}/status`,{status})
}

export const updateIssueAssignee=(issueid,assigneeId)=>{
    return api.patch(`/issues/${issueid}/assignee`,{assigneeId})
}

export const getIssueById=(projectId,issueid)=>{
    return api.get(`issues/projects/${projectId}/${issueid}`)
}

export const updateIssueDescription =()=>{
 return null;
}