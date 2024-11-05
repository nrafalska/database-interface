const { google } = require('googleapis');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const allData = {}; // Кэшируем данные

async function getAllSheetsData() {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'database-439720-c45de406784d.json'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    try {
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: 'v4', auth: client });
        const spreadsheetId = '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y';

        // Получаем информацию обо всех листах в таблице
        const sheetInfo = await googleSheets.spreadsheets.get({ spreadsheetId });
        const sheets = sheetInfo.data.sheets.map(sheet => sheet.properties.title);

        // Извлекаем данные из каждого листа
        for (const sheetName of sheets) {
            const response = await googleSheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${sheetName}!A1:AZ199`,
            });

            const rows = response.data.values;
            if (rows && rows.length > 1) {
                const headers = rows[0]; // Первая строка - заголовки
                const dataRows = rows.slice(1); // Остальные строки - данные

                allData[sheetName.toLowerCase().replace(/\s+/g, '-')] = dataRows.map((row, index) => {
                    const rowData = {};
                    headers.forEach((header, i) => {
                        rowData[header] = row[i] || ''; // Заполняем объект данными строки
                    });
                    rowData.id = index + 1; // Добавляем идентификатор
                    return rowData;
                });
            } else {
                allData[sheetName.toLowerCase().replace(/\s+/g, '-')] = [];
            }

            // Логируем создание маршрутов
            console.log(`Route created for /${sheetName.toLowerCase().replace(/\s+/g, '-')}`);
        }
    } catch (error) {
        console.error('Error accessing Google Sheets:', error);
        throw new Error('Failed to retrieve data from Google Sheets');
    }
}

// Создаем маршруты для каждого листа на основе кэшированных данных
app.get('/:sheetName', (req, res) => {
    const sheetName = req.params.sheetName.toLowerCase();
    if (allData[sheetName]) {
        res.json(allData[sheetName]);
    } else {
        res.status(404).send('Sheet not found');
    }
});

// Маршрут для извлечения всех листов сразу
app.get('/all-sheets', (req, res) => {
    res.json(allData);
});

// Инициализируем загрузку данных и запускаем сервер
getAllSheetsData().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to initialize data:', err);
});
