
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            alert('Logout failed: ' + error.message);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
