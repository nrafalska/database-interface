import React from 'react';
import { AppBar, UserMenu } from 'react-admin';
import { Button } from '@mui/material';

const CustomUserMenu = ({ onLogout }) => (
    <UserMenu>
        <Button color="inherit" onClick={onLogout}>
            Logout
        </Button>
    </UserMenu>
);

const CustomAppBar = (props) => {
    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.reload(); // Перезагрузка страницы для сброса состояния
    };

    return (
        <AppBar {...props} userMenu={<CustomUserMenu onLogout={handleLogout} />} />
    );
};

export default CustomAppBar;
