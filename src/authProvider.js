import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const users = {
    admin: { password: '1234', tabs: ['All'] },
    Natasha: { password: '1234', tabs: ['Natasha ACTIVE', 'Natasha INACTIVE'] },
    "Nazarii Kramar": { password: '1234', tabs: ['Nazarii Kramar Active!', 'N Kramar ACTIVE', 'N Kramar INACTIVE'] },
    "Nikita Shakotko": { password: '1234', tabs: ['Nikita ACTIVE', 'Nikita Shakotko Active!', 'Nikita INACTIVE'] },
    "Ruslan Dawydenko": { password: '1234', tabs: ['Ruslan ACTIVE', 'Ruslan Dawydenko Active!', 'Ruslan INACTIVE'] },
    "Alex Megas": { password: '1234', tabs: ['Alex Megas Active!', 'Megas INACTIVE'] },
    "Vlad (new)": { password: '1234', tabs: ['Vlad (new) ACTIVE', 'Vlad (new) INACTIVE'] },
    "Vladytslav Shkliarov": { password: '1234', tabs: ['Vladytslav Shkliarov Active!'] },
    Nebojsa: { password: '1234', tabs: ['Nebojsa ACTIVE', 'Nebojsa INACTIVE'] },
    "Mark Tarytsanu": { password: '1234', tabs: ['Mark Tarytsanu Active!', 'Mark ACTIVE'] },
    "Anton Zhidkov": { password: '1234', tabs: ['Anton Zhidkov ACTIVE', 'Anton INACTIVE'] },
    Julia: { password: '1234', tabs: ['Julia ACTIVE', 'Julia INACTIVE'] },
    Arkadiy: { password: '1234', tabs: ['Arkadiy ACTIVE', 'Arkadiy Oskol Active!', 'Arkadiy INACTIVE'] },
    Olga: { password: '1234', tabs: ['Olga ACTIVE', 'Olga Meshcheryakova Active!'] },
    "Kolya Solomennyi": { password: '1234', tabs: ['Kolya Solomennyi Active!', 'Kolya INACTIVE'] },
    "Nataliia Denisenko": { password: '1234', tabs: ['Nataliia Denisenko Active', 'Nataliia D INACTIVE'] },
    "Alina Kolpakova": { password: '1234', tabs: ['Alina Kolpakova Active!', 'Alina Kolpakova InActive'] },
    "Maryna Urvantseva": { password: '1234', tabs: ['Maryna Urvantseva ACTIVE', 'Maryna Urvantseva INACTIVE'] },
    "Dmytro Chernuha": { password: '1234', tabs: ['Dmytro Chernuha ACTIVE', 'Dmytro Chernuha INACTIVE'] },
    "Nikita Yagunov": { password: '1234', tabs: ['Nikita Yagunov ACTIVE', 'Nikita Yagunov INACTIVE'] },
    "Alexandra Belova": { password: '1234', tabs: ['Alexandra Belova ACTIVE', 'Alexandra Belova INACTIVE'] }
  };

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allowedSheets, setAllowedSheets] = useState([]);

    const login = ({ username }) => {
        console.log('Введенное имя пользователя:', username);
        if (users[username]) {
            setUser(username);
            setAllowedSheets(users[username].tabs);
            console.log('Вход выполнен успешно для:', username);
        } else {
            console.error('Пользователь не найден:', username);
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
