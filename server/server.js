const { google } = require('googleapis');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Функция для получения данных из Google Sheets, принимает `range` как параметр
async function accessSpreadsheet(range) {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'credentials.json'), // Убедитесь, что путь к вашему JSON-файлу указан правильно
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    let client;
    try {
        client = await auth.getClient();
    } catch (authError) {
        console.error('Authentication error:', authError);
        throw new Error('Failed to authenticate with Google API');
    }

    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y'; // Ваш ID таблицы

    try {
        const response = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            throw new Error('No data found');
        }

        // Используем первую строку как заголовок для создания объектов
        const headers = rows[0];
        const data = rows.slice(1).map((row, index) => {
            const rowData = { id: index + 1 };
            headers.forEach((header, i) => {
                rowData[header] = row[i] || ''; // Присваиваем значение из строки или пустую строку
            });
            return rowData;
        });

        return data;
    } catch (error) {
        console.error('Error accessing Google Sheets:', error);
        throw new Error('Failed to retrieve data from Google Sheets');
    }
}

// Динамическое создание маршрутов для каждого пользователя и типа данных
const users = [
    { name: 'natasha', sheets: ['ACTIVE', 'INACTIVE'] },
    { name: 'nazarii_kramar', sheets: ['Active!', 'ACTIVE', 'INACTIVE'] },
    { name: 'nikita_shakotko', sheets: ['ACTIVE', 'Shakotko Active!', 'INACTIVE'] },
    { name: 'ruslan_dawydenko', sheets: ['ACTIVE', 'Dawydenko Active!', 'INACTIVE'] },
    { name: 'alex_megas', sheets: ['Active!', 'INACTIVE'] },
    { name: 'vlad_new', sheets: ['ACTIVE', 'INACTIVE'] },
    { name: 'vladytslav_shkliarov', sheets: ['Active!'] },
    { name: 'nebojsa', sheets: ['ACTIVE', 'INACTIVE', 'Active!'] },
    { name: 'mark_tarytsanu', sheets: ['Active!', 'ACTIVE'] },
    { name: 'anton_zhidkov', sheets: ['ACTIVE', 'INACTIVE'] },
    { name: 'julia', sheets: ['ACTIVE', 'INACTIVE', 'Krendeleva Active!'] },
    { name: 'arkadiy', sheets: ['ACTIVE', 'Oskol Active!', 'INACTIVE'] },
    { name: 'olga', sheets: ['ACTIVE', 'Meshcheryakova Active!', 'INACTIVE'] },
    { name: 'kolya_solomennyi', sheets: ['Active!', 'INACTIVE'] },
    { name: 'nataliia_denisenko', sheets: ['Active', 'D INACTIVE'] },
    { name: 'nataliia_grek', sheets: ['Active', 'G INACTIVE'] },
    { name: 'alina_kolpakova', sheets: ['Active!', 'InActive'] },
    { name: 'maryna_urvantseva', sheets: ['ACTIVE', 'INACTIVE'] },
    { name: 'dmytro_chernuha', sheets: ['ACTIVE', 'INACTIVE'] },
    { name: 'nikita_yagunov', sheets: ['ACTIVE', 'INACTIVE'] },
    { name: 'alexandra_belova', sheets: ['ACTIVE', 'INACTIVE'] },
    { name: 'diana_romaniuk', sheets: ['ACTIVE', 'INACTIVE'] }
];

// Пример создания маршрутов на основе списка users
users.forEach(user => {
    user.sheets.forEach(sheetType => {
        app.get(`/${user.name.toLowerCase()}-${sheetType.toLowerCase()}`, async (req, res) => {
            try {
                const data = await accessSpreadsheet(`${user.name} ${sheetType}!A1:AZ199`);
                res.setHeader('Content-Range', `${user.name.toLowerCase()}-${sheetType.toLowerCase()} 0-${data.length}/${data.length}`);
                res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
                res.json(data);
            } catch (error) {
                console.error(`Error retrieving data for ${user.name} ${sheetType}:`, error);
                res.status(500).send('Error retrieving data');
            }
        });
    });
});


// Запуск сервера
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
