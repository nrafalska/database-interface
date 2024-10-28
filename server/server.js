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
        keyFile: path.join(__dirname, 'database-439720-c45de406784d.json'),
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
    const spreadsheetId = '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y';

    try {
        const response = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;
        if (!rows || rows.length < 2) {
            throw new Error('No data found');
        }

        // Обработка данных
        const data = rows.slice(1).map((row, index) => ({
            id: index + 1,
            salesManager: row[1] || '',
            name: row[2] || '',
            collectionStatus: row[4] || '',
            dateTillDNC: row[5] || '',
            reasonDNC: row[6] || '',
            companyName: row[7] || '',
            shortUsefulInfo: row[8] || '',
            totalContractAmount: parseFloat(row[9]) || 0,
            currentBalance: parseFloat(row[10]) || 0,
        }));

        return data;
    } catch (error) {
        console.error('Error accessing Google Sheets:', error);
        throw new Error('Failed to retrieve data from Google Sheets');
    }
}

// Маршрут для получения данных "Active"
app.get('/active', async (req, res) => {
    try {
        const data = await accessSpreadsheet('Natasha ACTIVE!A1:AZ200');
        res.setHeader('Content-Range', `active 0-${data.length}/${data.length}`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Error retrieving data');
    }
});

// Маршрут для получения данных "Inactive"
app.get('/inactive', async (req, res) => {
    try {
        const data = await accessSpreadsheet('Natasha INACTIVE!A1:AZ200');
        res.setHeader('Content-Range', `inactive 0-${data.length}/${data.length}`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Error retrieving data');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
