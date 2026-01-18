import { data } from "react-router-dom";
import api from "../utils/axiosInstance";

export const register = (data)=>{
    return api.post(`/auth/register`,data);
}

export const loginUser=(data)=>{
    return api.post(`/auth/login`,data);
}