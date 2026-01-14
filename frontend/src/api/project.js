
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

/* =======================
   FUTURE APIs (EMPTY)
   DO NOT IMPLEMENT YET
   ======================= */

// Project deletion (OWNER only)
export const deleteProject = (projectId) => {
  // backend pending
  return api.delete(`/projects/${projectId}`);
};

// Project settings fetch (optional)
export const getProjectSettings = (projectId) => {
  // backend pending
  return Promise.resolve();
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
