import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Модель данных пользователей для примера (без проверки пароля)
const users = {
    admin: { tabs: ['All'] },
    Natasha: { tabs: ['Natasha ACTIVE', 'Natasha INACTIVE'] },
    "Nazarii Kramar": { tabs: ['Nazarii Kramar Active!', 'N Kramar ACTIVE', 'N Kramar INACTIVE'] },
    "Nikita Shakotko": { tabs: ['Nikita ACTIVE', 'Nikita Shakotko Active!', 'Nikita INACTIVE'] },
    "Ruslan Dawydenko": { tabs: ['Ruslan ACTIVE', 'Ruslan Dawydenko Active!', 'Ruslan INACTIVE'] },
    "Alex Megas": { tabs: ['Alex Megas Active!', 'Megas INACTIVE'] },
    "Vlad (new)": { tabs: ['Vlad (new) ACTIVE', 'Vlad (new) INACTIVE'] },
    "Vladytslav Shkliarov": { tabs: ['Vladytslav Shkliarov Active!'] },
    Nebojsa: { tabs: ['Nebojsa ACTIVE', 'Nebojsa INACTIVE'] },
    "Mark Tarytsanu": { tabs: ['Mark Tarytsanu Active!', 'Mark ACTIVE'] },
    "Anton Zhidkov": { tabs: ['Anton Zhidkov ACTIVE', 'Anton INACTIVE'] },
    Julia: { tabs: ['Julia ACTIVE', 'Julia INACTIVE'] },
    Arkadiy: { tabs: ['Arkadiy ACTIVE', 'Arkadiy Oskol Active!', 'Arkadiy INACTIVE'] },
    Olga: { tabs: ['Olga ACTIVE', 'Olga Meshcheryakova Active!'] },
    "Kolya Solomennyi": { tabs: ['Kolya Solomennyi Active!', 'Kolya INACTIVE'] },
    "Nataliia Denisenko": { tabs: ['Nataliia Denisenko Active', 'Nataliia D INACTIVE'] },
    "Alina Kolpakova": { tabs: ['Alina Kolpakova Active!', 'Alina Kolpakova InActive'] },
    "Maryna Urvantseva": { tabs: ['Maryna Urvantseva ACTIVE', 'Maryna Urvantseva INACTIVE'] },
    "Dmytro Chernuha": { tabs: ['Dmytro Chernuha ACTIVE', 'Dmytro Chernuha INACTIVE'] },
    "Nikita Yagunov": { tabs: ['Nikita Yagunov ACTIVE', 'Nikita Yagunov INACTIVE'] },
    "Alexandra Belova": { tabs: ['Alexandra Belova ACTIVE', 'Alexandra Belova INACTIVE'] }
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allowedSheets, setAllowedSheets] = useState([]);

    const login = async ({ username }) => {
        // Проверка наличия пользователя и установка сессии
        if (users[username]) {
            setUser(username);
            setAllowedSheets(users[username].tabs);
            console.log('Вход выполнен успешно для:', username);
        } else {
            throw new Error('Пользователь не найден');
        }
    };

    const logout = () => {
        setUser(null);
        setAllowedSheets([]);
    };

    return (
        <AuthContext.Provider value={{ user, allowedSheets, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
