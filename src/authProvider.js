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
            return Promise.resolve();
        }
        return Promise.reject("Unknown user");
    },
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('allowedSheets');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    },
    checkError: () => Promise.resolve(),
    getPermissions: () => {
        // Получаем список разрешённых вкладок из localStorage
        const sheets = JSON.parse(localStorage.getItem('allowedSheets'));
        return sheets ? Promise.resolve(sheets) : Promise.reject();
    }
};

export default authProvider;
