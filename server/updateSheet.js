const { google } = require('googleapis');
const path = require('path');

<<<<<<< HEAD
async function updateSheet(sheetName, data) {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const res = await sheets.spreadsheets.values.update({
            spreadsheetId: '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y',
            range: `${sheetName}!A1:J1`, // Диапазон для обновления данных
            valueInputOption: 'RAW',
            resource: {
                values: [data],
            },
        });

        console.log(`Update to ${sheetName} successful:`, res.status);
    } catch (error) {
        console.error(`Error updating ${sheetName}:`, error);
    }
}

// Пример вызова
const sheetNames = [
    'Ruslan INACTIVE', 'Alex Megas Active!', 'Megas INACTIVE',
    'Vlad (new) ACTIVE', 'Vladytslav Shkliarov Active!', 'Vlad (new) INACTIVE',
    'Nebojsa ACTIVE', 'Nebojsa INACTIVE', 'Mark Tarytsanu Active!',
    'Mark ACTIVE', 'Anton Zhidkov ACTIVE', 'Anton INACTIVE',
    'Julia ACTIVE', 'Julia INACTIVE', 'Arkadiy ACTIVE',
    'Arkadiy Oskol Active!', 'Arkadiy INACTIVE', 'Olga ACTIVE',
    'Olga Meshcheryakova Active!', 'Kolya Solomennyi Active!', 'Kolya INACTIVE',
    'Nataliia Denisenko Active', 'Nataliia D INACTIVE', 'Natasha ACTIVE',
    'Natasha INACTIVE', 'N Kramar ACTIVE', 'Nazarii Kramar Active!',
    'N Kramar INACTIVE', 'Nikita Shakotko ACTIVE', 'Nikita INACTIVE',
    'Ruslan ACTIVE', 'Ruslan Davdyenko Active!', 'Alina Kolpakova Active!',
    'Alina Kolpakova InActive', 'Maryna Urvantseva ACTIVE', 'Maryna Urvantseva INACTIVE',
    'Dmytro Chernuha ACTIVE', 'Dmytro Chernuha INACTIVE', 'Nikita Yagunov ACTIVE',
    'Nikita Yagunov INACTIVE', 'Alexandra Belova ACTIVE', 'Alexandra Belova INACTIVE'
];

sheetNames.forEach(sheetName => updateSheet(sheetName, ['Updated data 1', 'Updated data 2', 'Updated data 3']));
=======
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
>>>>>>> b57adb31875f4c715c67caa2143f7aeee6ecb760
