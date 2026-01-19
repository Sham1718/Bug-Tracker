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

export const updateIssueAssignee=(issueid,assigneId)=>{
    return api.patch(`/issues/${issueid}/assignee`,{assigneId})
}

export const getIssueById=(projectId,issueid)=>{
    return api.get(`/issues/projects/${projectId}/${issueid}`)
}

export const updateIssueDescription =(issueid,description)=>{
    return api.post(`/issues/${issueid}/description`,{description});
}