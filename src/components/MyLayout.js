import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout } from 'react-admin';
import { MenuItem } from '@mui/material';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';

// Кастомная кнопка выхода
const MyLogoutButton = forwardRef((props, ref) => {
    const logout = useLogout(); // Получаем функцию logout
    const handleClick = () => logout(); // Вызываем функцию logout при клике
    return (
        <MenuItem
            onClick={handleClick}
            ref={ref}
            {...props} // Передаем все props для управления клавишами
        >
            <ExitIcon /> Logout
        </MenuItem>
    );
});

// Кастомное меню пользователя с кнопкой выхода
const MyUserMenu = () => (
    <UserMenu>
        <MyLogoutButton />
    </UserMenu>
);

// Кастомная панель с меню пользователя
const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} />;

// Кастомный layout для приложения
const MyLayout = ({ children }) => (
    <Layout appBar={MyAppBar}>
        {children}
    </Layout>
);

export default MyLayout;
