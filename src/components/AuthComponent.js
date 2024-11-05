import React, { useState } from 'react';
import { useAuth } from '../authProvider'; // Импортируем хук, если он необходим

const AuthComponent = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const { login } = useAuth(); // Используем метод login из контекста

    const handleLogin = () => {
        if (username.trim()) {
            console.log('Попытка входа с именем пользователя:', username);
            login({ username }) // используем метод login из контекста
                .then(() => {
                    onLogin(username);
                    console.log('Вход выполнен успешно для:', username);
                })
                .catch((err) => {
                    console.error('Ошибка входа:', err);
                    alert(err);
                });
        } else {
            alert('Пожалуйста, введите допустимое имя пользователя.');
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <input
                type="text"
                placeholder="Введите ваше имя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default AuthComponent;
