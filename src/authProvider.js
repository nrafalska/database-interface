const authProvider = {
    login: ({ username }) => {
        if (username === 'admin') {
            localStorage.setItem('username', username);
            return Promise.resolve();
        }
        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    },
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
