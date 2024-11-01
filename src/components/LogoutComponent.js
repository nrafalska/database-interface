import React from 'react';

const LogoutComponent = ({ onLogout }) => {
    const handleLogout = () => {
        localStorage.removeItem('username');
        onLogout();
    };

    return (
        <div>
            <h2>Welcome, {localStorage.getItem('username')}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogoutComponent;
