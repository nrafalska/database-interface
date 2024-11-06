import React, { useState } from 'react';
import { useAuth } from '../authProvider'; // Убедитесь, что путь корректен
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

const AuthComponent = ({ onLogin }) => {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [password, setPassword] = useState(localStorage.getItem('password') || '');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        if (password !== '1234') {
            setError('Неверный пароль');
            return;
        }

        try {
            await login({ username });
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            setError('');
            onLogin(username);

            // Переход на нужный маршрут после успешного входа
            const routeName = username.toLowerCase().replace(/\s+/g, '-');
            window.location.href = `/${routeName}-active`;
        } catch (e) {
            setError('Ошибка входа: проверьте введенные данные');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} style={{ padding: '30px', marginTop: '100px' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography component="h1" variant="h5" gutterBottom>
                        Вход в систему
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        style={{ marginTop: '20px' }}
                    >
                        Войти
                    </Button>
                    {error && (
                        <Typography color="error" style={{ marginTop: '15px' }}>
                            {error}
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default AuthComponent;
