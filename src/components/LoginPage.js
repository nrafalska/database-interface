import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useLogin();
    const notify = useNotify();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login({ username });
            notify('Login successful', { type: 'success' });
        } catch (error) {
            console.error('Login failed:', error);
            notify('Invalid username. Please try again.', { type: 'warning' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: 'auto', padding: '20px' }}>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    disabled={loading}
                />
            </div>
            <button
                type="submit"
                style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginPage;
