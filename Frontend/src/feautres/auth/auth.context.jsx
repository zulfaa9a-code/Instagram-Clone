import {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {login , register , getMe} from "./services/auth.api"
export const AuthContext = createContext();
export function AuthProvider({children})
{
   const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleLogin = async (username, password) => {
         setLoading(true);
        try 
        {
            const response = await login (username,password) 
            console.log("logged in")
            setUser(response.user)
        }
        catch (err)
        {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    const handleRegister = async (username , email, password) => { 
        setLoading(true)
        try 
        {
            const response = await register (username, email , password )
            setUser(response.user)
            console.log("Regitered successfully ")

        }
        catch (err) 
        {
            console.log(err)
        }
        finally 
        {
            setLoading(false)
        }
    }
    return (
        <AuthContext.Provider value={{user, loading, handleLogin, handleRegister}}>
            {children}
        </AuthContext.Provider>
    )
}