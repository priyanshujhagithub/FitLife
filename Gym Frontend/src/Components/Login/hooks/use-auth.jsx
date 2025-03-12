import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        checkAuth();
    }, []);
    const checkAuth = async () => {
        try {
            const response = await axios.post('/auth/me', {
                withCredential: true,
            });
            setUser(response.data);
        } catch (e) {
            console.log("Unable to check the auth status");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };
    const signIn = async (email, password) => {
        try {
            const response = await axios.post('/auth/login',
                {
                    "email": email,
                    "password": password
                },
                { withCredentials: true }
            );
            setUser(response.data);
        } catch (error){
            throw new Error(error||'Failed to sign in');
        }
    }

    const signUp = async (email, password,name) => {
        try {
            const response = await axios.post('/auth/register',
                {
                    "name": name,
                    "email": email,
                    "password": password
                },
                { withCredentials: true }
            );
            setUser(response.data);
        } catch (error){
            throw new Error(error||'Failed to sign up');
        }
    }
    const signOut = async () => {
        try {
            const response = await axios.post('/auth/logout',
                { withCredentials: true }
            );
            setUser(null);
        } catch (error){
            throw new Error(error||'Failed to sign out');
        }
    }

    return (
        <AuthContext.Provider value={{user,signIn,signOut,signUp,isLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context=useContext(AuthContext);
    if(!context){
        throw new Error('UseAuth must bw used within an authProvider');
    }
    return context;
}