import React, { useState } from 'react';
import { useAuth } from '../authProvider'; // Убедитесь, что путь корректен

const AuthComponent = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await login({ username });
            onLogin(username);
        } catch (e) {
            setError('Ошибка входа: проверьте введенные данные');
        }
    };

    return (
        <div>
            <h2>Вход в систему</h2>
            <input
                type="text"
                placeholder="Введите имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Войти</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AuthComponent;
