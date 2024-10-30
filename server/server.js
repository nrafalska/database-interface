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
            number: row[0] || '',
            salesManager: row[1] || '',
            nameOfClient: row[2] || '',
            managerName: row[3] || '',
            collectionStatus: row[4] || '',
            dateTillDNC: row[5] || '',
            reasonDNC: row[6] || '',
            companyName: row[7] || '',
            shortUsefulInfo: row[8] || '',
            totalContractAmount: parseFloat(row[9]) || 0,
            currentBalance: parseFloat(row[10]) || 0,
            paymentScheduleChanged: row[11] || '',
        
            // Плановые и фактические даты и суммы для 10 платежей
            planDate1: row[12] || '',
            planAmount1: parseFloat(row[13]) || 0,
            factAmount1: parseFloat(row[14]) || 0,
            factDate1: row[15] || '',
            
            planDate2: row[16] || '',
            planAmount2: parseFloat(row[17]) || 0,
            factAmount2: parseFloat(row[18]) || 0,
            factDate2: row[19] || '',
        
            planDate3: row[20] || '',
            planAmount3: parseFloat(row[21]) || 0,
            factAmount3: parseFloat(row[22]) || 0,
            factDate3: row[23] || '',
        
            planDate4: row[24] || '',
            planAmount4: parseFloat(row[25]) || 0,
            factAmount4: parseFloat(row[26]) || 0,
            factDate4: row[27] || '',
        
            planDate5: row[28] || '',
            planAmount5: parseFloat(row[29]) || 0,
            factAmount5: parseFloat(row[30]) || 0,
            factDate5: row[31] || '',
        
            planDate6: row[32] || '',
            planAmount6: parseFloat(row[33]) || 0,
            factAmount6: parseFloat(row[34]) || 0,
            factDate6: row[35] || '',
        
            planDate7: row[36] || '',
            planAmount7: parseFloat(row[37]) || 0,
            factAmount7: parseFloat(row[38]) || 0,
            factDate7: row[39] || '',
        
            planDate8: row[40] || '',
            planAmount8: parseFloat(row[41]) || 0,
            factAmount8: parseFloat(row[42]) || 0,
            factDate8: row[43] || '',
        
            planDate9: row[44] || '',
            planAmount9: parseFloat(row[45]) || 0,
            factAmount9: parseFloat(row[46]) || 0,
            factDate9: row[47] || '',
        
            planDate10: row[48] || '',
            planAmount10: parseFloat(row[49]) || 0,
            factAmount10: parseFloat(row[50]) || 0,
            factDate10: row[51] || ''
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
        const data = await accessSpreadsheet('Natasha ACTIVE!A2:AZ199');
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
        const data = await accessSpreadsheet('Natasha ACTIVE!A2:AZ199');
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
