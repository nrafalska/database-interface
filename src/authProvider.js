const authProvider = {
    login: ({ username }) => {
        // Определяем разрешённые вкладки для каждого пользователя
        const users = {
            "admin": ["All"],  // admin получает доступ ко всем вкладкам
            "Natasha": ["Natasha ACTIVE", "Natasha INACTIVE"],
            "Nazarii Kramar": ["Nazarii Kramar Active!", "N Kramar ACTIVE", "N Kramar INACTIVE"],
            "Nikita Shakotko": ["Nikita ACTIVE", "Nikita Shakotko Active!", "Nikita INACTIVE"],
            "Ruslan Dawydenko": ["Ruslan ACTIVE", "Ruslan Dawydenko Active!", "Ruslan INACTIVE"]
        };

        // Проверяем, существует ли пользователь в списке
        if (users[username]) {
            localStorage.setItem('username', username);
            localStorage.setItem('allowedSheets', JSON.stringify(users[username]));  // Сохраняем разрешённые вкладки
            console.info(`Пользователь "${username}" успешно вошёл. Доступные вкладки: ${users[username].join(', ')}`);
            return Promise.resolve();
        }
        console.warn(`Попытка входа с неизвестным пользователем: "${username}"`);
        return Promise.reject("Unknown user. Please check your username and try again.");
    },
    logout: () => {
        const username = localStorage.getItem('username');
        if (username) {
            console.info(`Пользователь "${username}" вышел из системы.`);
        }
        localStorage.removeItem('username');
        localStorage.removeItem('allowedSheets');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject('Пользователь не авторизован. Пожалуйста, войдите.');
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            localStorage.removeItem('allowedSheets');
            return Promise.reject('Ошибка авторизации. Пожалуйста, войдите снова.');
        }
        return Promise.resolve();
    },
    getPermissions: () => {
        // Получаем список разрешённых вкладок из localStorage
        const sheets = JSON.parse(localStorage.getItem('allowedSheets'));
        return sheets
            ? Promise.resolve(sheets)
            : Promise.reject('Нет разрешений. Пожалуйста, войдите для доступа.');
    }
};

export default authProvider;
