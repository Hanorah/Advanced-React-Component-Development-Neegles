import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // make sure this is correctly configured

// Creative Preloader Component with Multi-colored Circles
const Preloader = () => (
    <div className="flex justify-center items-center min-h-screen">
        <div className="flex space-x-2">
            <div className="w-10 h-10 bg-red-500 rounded-full animate-ping"></div>
            <div className="w-10 h-10 bg-yellow-500 rounded-full animate-ping animation-delay-200"></div>
            <div className="w-10 h-10 bg-green-500 rounded-full animate-ping animation-delay-400"></div>
            <div className="w-10 h-10 bg-blue-500 rounded-full animate-ping animation-delay-600"></div>
            <div className="w-10 h-10 bg-purple-500 rounded-full animate-ping animation-delay-800"></div>
        </div>
    </div>
);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("🔥 Firebase User:", currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    if (loading) {
        return <Preloader />;

    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
