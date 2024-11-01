const { google } = require('googleapis');
const path = require('path');

async function writeSheet() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'), // Путь к файлу с учетными данными
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const res = await sheets.spreadsheets.values.update({
            spreadsheetId: '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y', // Замените на ваш реальный ID таблицы
            range: 'Natasha ACTIVE!A2:AZ199', // Укажите необходимый диапазон
            valueInputOption: 'RAW',
            resource: {
                values: [['Hello', 'World', 'Test', '123', 'Updated']], // Данные для записи
            },
        });

        console.log('Update successful:', res.status);
    } catch (error) {
        console.error('Error writing to Google Sheets:', error);
    }
}

writeSheet();
