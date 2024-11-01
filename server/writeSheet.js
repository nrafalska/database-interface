const { google } = require('googleapis');
const path = require('path');

async function writeSheet(sheetName, data) {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const res = await sheets.spreadsheets.values.update({
            spreadsheetId: '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y',
            range: `${sheetName}!A249:J250`, // Диапазон данных для записи
            valueInputOption: 'RAW',
            resource: {
                values: [data],
            },
        });

        console.log(`Write to ${sheetName} successful:`, res.status);
    } catch (error) {
        console.error(`Error writing to ${sheetName}:`, error);
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

sheetNames.forEach(sheetName => writeSheet(sheetName, ['Test data 1', 'Test data 2', 'Test data 3']));
