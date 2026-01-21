
import api from "../utils/axiosInstance";

export const getAllProject=()=>{
    return api.get(`/projects`);
}

export const createProject=(data)=>{
    return api.post(`/projects`,data);
}

export const getProjectById=(projectId)=>{
    return api.get(`/projects/${projectId}`);
}

export const updateProject=(projectId,data)=>{
    return api.put(`/projects/${projectId}`,data);
}

export const addMember=(projectId,data)=>{
    return api.post(`/projects/${projectId}/members`,data);
}

export const getMember=(projectId)=>{
    return api.get(`/projects/${projectId}/getMembers`);
}

export const updateMemberRole=(projectId,data)=>{
    return api.put(`/projects/${projectId}/member/role`,data);
}

export const addMemberByEmail=(projectId,data)=>{
  return api.put(`/projects/${projectId}/members/email`,data);
}

export const deleteMember=(projectId,userID)=>{
  return api.delete(`/projects/${projectId}/member/delete/${userID}`)

}

export const getRole=(projectId)=>{
    return api.get(`projects/${projectId}/getRole`)
}
/* =======================
   FUTURE APIs (EMPTY)
   DO NOT IMPLEMENT YET
   ======================= */

// Project deletion (OWNER only)
export const deleteProject = (projectId) => {
  return api.delete(`/projects/${projectId}/delete`);
};


// Project activity log (later)
export const getProjectActivity = (projectId) => {
  // backend pending
  return Promise.resolve();
};

// Project board / kanban (LAST PHASE)
export const getProjectBoard = (projectId) => {
  // backend pending
  return Promise.resolve();
};

// Project columns (kanban)
export const createProjectColumn = (projectId, data) => {
  // backend pending
  return Promise.resolve();
};

export const updateProjectColumn = (columnId, data) => {
  // backend pending
  return Promise.resolve();
};

export const deleteProjectColumn = (columnId) => {
  // backend pending
  return Promise.resolve();
};



