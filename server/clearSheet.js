const { google } = require('googleapis');
const path = require('path');

async function clearSheet() {
    try {
        // Настройка аутентификации с использованием GoogleAuth
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'), // путь к вашему credentials.json
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Инициализация клиента
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        // Очистка данных
        const res = await sheets.spreadsheets.values.clear({
            spreadsheetId: '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y', // Замените на ваш реальный ID таблицы
            range: 'Natasha ACTIVE!A40:F40', // Укажите диапазон для очистки
        });

        console.log('Clear successful:', res.status);
    } catch (error) {
        console.error('Error clearing data from Google Sheets:', error);
    }
}

clearSheet().catch(console.error);
