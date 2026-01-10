import api from "../utils/axiosInstance";

export const register = (data)=>{
    return api.post(`/auth/register`,data);
}