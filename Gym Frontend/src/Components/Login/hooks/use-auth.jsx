import { createContext, useState, useEffect, useContext, use } from "react";
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
            const response = await axios.post('http://localhost:3001/auth/me',{}, {
                withCredentials: true,
            });
            setUser(response.data.user);
        } catch (e) {
            console.log("Unable to check the auth status");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };
    const signIn = async (email, password) => {
        const response = await axios.post('http://localhost:3001/auth/login',
            {
                "email": email,
                "password": password
            },
            { withCredentials: true }
        );
        if (!response.data.success ) {
            const error = await response.data.message;
            throw new Error(error || 'Failed to sign in')
        }
        setUser(response.data.id);
    }

    const signUp = async (email, password, name) => {
        const response = await axios.post('http://localhost:3001/auth/register',
            {
                "name": name,
                "email": email,
                "password": password
            },
            { withCredentials: true }
        );
        if (!response.data.success ) {
            const error = await response.data.message;
            throw new Error(error || 'Failed to sign up')
        }

        setUser(response.data.id);

    }
    const signOut = async () => {
        const response = await axios.post('http://localhost:3001/auth/logout',
            { withCredentials: true }
        );
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, signUp, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('UseAuth must bw used within an authProvider');
    }
    return context;
}