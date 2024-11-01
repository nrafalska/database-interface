const { google } = require('googleapis');
const path = require('path');

async function updateSheet() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'), // Путь к файлу с учетными данными
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        
        const res = await sheets.spreadsheets.values.update({
            spreadsheetId: '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y', // Замените на ваш реальный ID таблицы
            range: 'Natasha ACTIVE!A2:AZ199', // Укажите необходимый диапазон
            valueInputOption: 'RAW',
            resource: {
                values: [['Updated Value 1', 'Updated Value 2', 'Updated Value 3', 'Updated Value 4', 'Updated Value 5']], // Новые данные для записи
            },
        });

        console.log('Update successful:', res.status);
    } catch (error) {
        console.error('Error updating Google Sheets:', error);
    }
}

updateSheet().catch(console.error);
