import React from 'react'
import { useContext ,createContext,useState,useEffect } from 'react'
import {jwtDecode} from "jwt-decode";


const Authcontext = createContext(null)


export const AuthProvider=({children})=>{
    const[user,setUser]=useState(null);
    const[token,setToken]=useState(null);
    const[loading,setLoading]=useState(null);

    useEffect(()=>{
        const storetoken=localStorage.getItem("token")
        const storeuser=localStorage.getItem("user")
        if(storetoken){
            setToken(storetoken)
            setUser(JSON.parse(storeuser))
        }

        setLoading(false)
    },[])

    const registerToken=(jwtToken)=>{
        setToken(jwtToken)

        localStorage.setItem("token",jwtToken)

    }

    const login=(jwtToken)=>{
        // setUser(userdata)
        setToken(jwtToken)

        localStorage.setItem("token",jwtToken)
        setUser(jwtDecode(jwtToken));
    }
    // console.log(user);
    

    const logout=()=>{
        setToken(null)
        setUser(null)
        

        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    const value={
        user,
        token,
        login,
        logout,
        registerToken,
        isAuthenticate : !! token

    }

    if(loading) return null;

    return (
        <Authcontext.Provider value={value}>
            {children}
        </Authcontext.Provider>
    )
}


export const useAuth = ()=> useContext(Authcontext)
