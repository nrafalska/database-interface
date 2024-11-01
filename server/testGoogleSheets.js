const { google } = require('googleapis');
const path = require('path');

async function accessSheet() {
    try {
        // Настройка аутентификации с использованием файла сервисного аккаунта
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'), // Путь к вашему JSON-файлу сервисного аккаунта
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        // Получение данных из Google Sheets
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y', // Замените на ваш реальный ID таблицы
            range: 'Natasha ACTIVE!A2:AZ199', // Укажите необходимый диапазон
        });

        console.log('Data from Google Sheets:', res.data.values);
    } catch (error) {
        console.error('Error accessing Google Sheets:', error);
    }
}

// Запуск функции для получения данных
accessSheet().catch(console.error);
