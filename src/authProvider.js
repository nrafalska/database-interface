import React, { createContext, useState, useContext } from 'react';

// Создаем контекст для авторизации
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allowedSheets, setAllowedSheets] = useState([]);

    const login = async ({ username, password }) => {
        try {
            // Отправка POST-запроса на сервер для аутентификации
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();

            // Сохранение данных пользователя в состоянии
            setUser(username);
            setAllowedSheets(data.tabs);
            console.log(`Login successful for "${username}". Allowed sheets:`, data.tabs);

            return Promise.resolve();
        } catch (error) {
            console.error('Login error:', error.message || error);
            return Promise.reject('Login failed. Please try again.');
        }
    };

    const logout = () => {
        if (user) {
            console.log(`User "${user}" logged out.`);
        }
        setUser(null);
        setAllowedSheets([]);
        return Promise.resolve();
    };

    const checkAuth = () => {
        return user ? Promise.resolve() : Promise.reject('User not authenticated. Please log in.');
    };

    const checkError = ({ status }) => {
        if (status === 401 || status === 403) {
            setUser(null);
            setAllowedSheets([]);
            return Promise.reject('Authorization error. Please log in again.');
        }
        return Promise.resolve();
    };

    const getPermissions = () => {
        console.log('Checking permissions from state:', allowedSheets);
        return allowedSheets.length > 0
            ? Promise.resolve(allowedSheets)
            : Promise.reject('No permissions found. Please log in.');
    };

    return (
        <AuthContext.Provider value={{ user, allowedSheets, login, logout, checkAuth, checkError, getPermissions }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста авторизации
const useAuth = () => {
    return useContext(AuthContext);
};

// Экспортируем только то, что используется
export { AuthProvider, useAuth };
