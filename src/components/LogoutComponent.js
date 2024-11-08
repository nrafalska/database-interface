import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LogoutComponent = ({ onLogout }) => {
    const handleLogout = () => {
        localStorage.removeItem('username');
        onLogout();
    };

    return (
        <div onClick={handleLogout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', zIndex: 10 }}>
            <AccountCircleIcon style={{ color: '#fff' }} />
            <span style={{ marginLeft: 4, color: '#fff' }}>Logout</span>
        </div>
    );
};

export default LogoutComponent;
