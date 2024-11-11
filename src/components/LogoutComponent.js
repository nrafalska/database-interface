import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import ExitIcon from '@mui/icons-material/PowerSettingsNew';
import { MenuItem } from '@mui/material';
import { useLogout } from 'react-admin'; // For logging out from react-admin

const LogoutComponent = (props) => {
    const logout = useLogout(); // Function for logging out
    const navigate = useNavigate(); // Navigation hook

    const handleLogout = () => {
        localStorage.removeItem('username'); // Clear stored user data
        logout(); // Perform the logout action
        navigate('/login'); // Redirect to login page
    };

    return (
        <MenuItem onClick={handleLogout} {...props}>
            <ExitIcon /> Logout
        </MenuItem>
    );
};

export default LogoutComponent;
