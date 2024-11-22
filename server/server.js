const { google } = require('googleapis');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const spreadsheetId = '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y'; // ID таблицы

async function getGoogleClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'credentials.json'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return auth.getClient();
}
// Функция для получения данных из Google Sheets
async function accessSpreadsheet(range) {
    const client = await getGoogleClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    try {
        const response = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            throw new Error('No data found');
        }

        const headers = rows[0];
        const data = rows.slice(1).map((row, index) => {
            const rowData = { id: index + 1 };
            headers.forEach((header, i) => {
                rowData[header] = row[i] || '';
            });
            return rowData;
        });

        return data;
    } catch (error) {
        console.error('Error accessing Google Sheets:', error.message);
        throw error;
    }
}

async function addDataToGoogleSheet(data, sheetName) {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'credentials.json'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y';

    try {
        console.log('--- Starting Add Data Process ---');

        // Получение заголовков
        const headerRange = `${sheetName}!A1:BH1`; // Корректный диапазон заголовков
        console.log(`Fetching headers from range: ${headerRange}`);
        const headerResponse = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range: headerRange,
        });

        const rawHeaders = headerResponse.data.values ? headerResponse.data.values[0] : [];
        console.log('Raw Headers from Google Sheets:', rawHeaders);

        // Фильтрация пустых заголовков
        const headers = rawHeaders.filter((header) => header && header.trim());
        console.log('Filtered Headers:', headers);

        if (headers.length === 0) {
            console.error('No valid headers found in the sheet');
            throw new Error('Headers are missing or invalid');
        }

        console.log('Data passed to function:', data);
        console.log('Keys from Data:', Object.keys(data));

        // Сопоставление данных с заголовками
        const row = headers.map((header) => {
            const value = data[header] !== undefined ? data[header] : '';
            console.log(`Header: "${header}" -> Value: "${value}"`);
            return value;
        });

        console.log('Generated Row:', row);

        // Проверка длины строки
        if (row.length !== headers.length) {
            console.warn(
                `Row length (${row.length}) does not match headers length (${headers.length})`
            );
        }

        // Определение первой пустой строки
        const dataRange = `${sheetName}!A1:A`; // Проверка диапазона первой колонки
        console.log(`Checking for the next available row using range: ${dataRange}`);
        const dataResponse = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range: dataRange,
        });

        const numberOfRows = dataResponse.data.values ? dataResponse.data.values.length : 0;
        const nextRowIndex = numberOfRows + 1;

        // Указание диапазона для записи, начиная с первого столбца новой строки
        const writeRange = `${sheetName}!A${nextRowIndex}`;
        console.log(`Next available row: ${nextRowIndex}, writing to range: ${writeRange}`);

        // Запись строки
        await googleSheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A${nextRowIndex}:BH${nextRowIndex}`, // Указываем диапазон всей строки
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [row],
            },
        });

        console.log('Data successfully written to Google Sheets:', row);
    } catch (error) {
        console.error('Error adding data to Google Sheets:', error.message);
        console.error('Error details:', error);
        throw error;
    }
}





// Функция для редактирования данных в Google Sheets
async function updateDataInGoogleSheet(id, data, sheetName) {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'credentials.json'),
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
        const range = `${sheetName}!A1:ZZ1000`;

        // Получаем существующие данные
        const response = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            throw new Error('No data found');
        }

        const headers = rows[0];
        const rowIndex = rows.findIndex(row => row[0] == id);

        if (rowIndex === -1) {
            throw new Error(`Record with ID ${id} not found`);
        }

        // Обновляем строку
        const updatedRow = headers.map(header => data[header] || '');
        await googleSheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A${rowIndex + 1}`,
            valueInputOption: 'RAW',
            resource: {
                values: [updatedRow],
            },
        });

        console.log(`Record with ID ${id} updated successfully`);
    } catch (error) {
        console.error('Error updating data in Google Sheets:', error);
        throw new Error('Failed to update data in Google Sheets');
    }
}


// Динамическое создание маршрутов для каждого пользователя и типа данных
const users = [
    { name: 'natasha', sheets: [{ type: 'ACTIVE', gid: '1240916250' }, { type: 'INACTIVE', gid: '1540701091' }] },
    { name: 'nazariik', sheets: [{ type: 'Active!', gid: '90018042' }, { type: 'INACTIVE', gid: '2012750231' }] },
    { name: 'nikitash', sheets: [{ type: 'Active!', gid: '2113883320' }, { type: 'INACTIVE', gid: '503637199' }] },
    { name: 'rusland', sheets: [{ type: 'Active!', gid: '668133830' }, { type: 'INACTIVE', gid: '416038541' }] },
    { name: 'alexm', sheets: [{ type: 'Active!', gid: '310291825' }, { type: 'INACTIVE', gid: '430621295' }] },
    { name: 'nebojsa', sheets: [{ type: 'ACTIVE', gid: '1695684781' }, { type: 'INACTIVE', gid: '1392500008' }, { type: 'Active!', gid: '299232860' }] },
    { name: 'markt', sheets: [{ type: 'Active!', gid: '1327900089' }, { type: 'INACTIVE', gid: '1972066586' }] },
    { name: 'antonzh', sheets: [{ type: 'Active!', gid: '1334264924' }, { type: 'INACTIVE', gid: '1822325838' }] },
    { name: 'julia', sheets: [{ type: 'ACTIVE', gid: '1910261012' }, { type: 'Active!', gid: '828755112' }, { type: 'INACTIVE', gid: '352885166' }] },
    { name: 'arkadiy', sheets: [{ type: 'Active!', gid: '1436572648' }, { type: 'INACTIVE', gid: '520725355' }] },
    { name: 'olga', sheets: [{ type: 'ACTIVE', gid: '1884425070' }, { type: 'Active!', gid: '449469755' }, { type: 'INACTIVE', gid: '285512120' }] },
    { name: 'kolyas', sheets: [{ type: 'Active', gid: '11031933' }, { type: 'INACTIVE', gid: '1623940457' }] },
    { name: 'nataliiad', sheets: [{ type: 'Active', gid: '774640725' }, { type: 'INACTIVE', gid: '1563493966' }] },
    { name: 'nataliiag', sheets: [{ type: 'Active', gid: '1800218305' }, { type: 'INACTIVE', gid: '1862483022' }] },
    { name: 'alina', sheets: [{ type: 'Active', gid: '1897384161' }, { type: 'InActive', gid: '99503959' }] },
    { name: 'marynau', sheets: [{ type: 'ACTIVE', gid: '1621382825' }, { type: 'INACTIVE', gid: '519635099' }] },
    { name: 'dmytroch', sheets: [{ type: 'ACTIVE', gid: '1352980819' }, { type: 'INACTIVE', gid: '57061661' }] },
    { name: 'nikitay', sheets: [{ type: 'ACTIVE', gid: '1944189408' }, { type: 'INACTIVE', gid: '673863445' }] },
    { name: 'alexandrab', sheets: [{ type: 'ACTIVE', gid: '962214485' }, { type: 'INACTIVE', gid: '1886272138' }] },
    { name: 'dianar', sheets: [{ type: 'ACTIVE', gid: '174663765' }, { type: 'INACTIVE', gid: '1986505364' }] },
];

// Пример создания маршрутов на основе списка пользователей
users.forEach(user => {
    user.sheets.forEach(sheet => {
        const sheetName = `${user.name} ${sheet.type}`;

        // Маршрут для получения данных
        app.get(`/${user.name.toLowerCase()}-${sheet.type.toLowerCase()}`, async (req, res) => {
            try {
                const data = await accessSpreadsheet(`'${sheetName}'!A1:ZZ1000`);
                res.json(data);
            } catch (error) {
                res.status(500).send(`Error retrieving data: ${error.message}`);
            }
        });

        // Маршрут для создания новых данных
        app.post(`/${user.name.toLowerCase()}-${sheet.type.toLowerCase()}/create`, async (req, res) => {
            const data = req.body;
            try {
                await addDataToGoogleSheet(data, sheetName);
                res.status(201).send('Data created successfully');
            } catch (error) {
                res.status(500).send(`Error creating data: ${error.message}`);
            }
        });
        
        // Маршрут для удаления данных
        app.delete(`/${user.name.toLowerCase()}-${sheet.type.toLowerCase()}/delete/:rowIndex`, async (req, res) => {
            const { rowIndex } = req.params; // Получаем rowIndex из параметров маршрута
        
            try {
                if (isNaN(rowIndex)) {
                    throw new Error('Row index must be a number');
                }
        
                // Преобразуем rowIndex в число
                const numericRowIndex = Number(rowIndex);
        
                if (numericRowIndex <= 0) {
                    throw new Error('Row index must be greater than 0 (headers cannot be deleted)');
                }
        
                // Вызов функции для удаления строки из Google Sheets
                await deleteRowFromGoogleSheet(numericRowIndex, sheetName);
        
                // Успешный ответ
                res.status(200).json({ message: `Row at index ${numericRowIndex} deleted successfully` });
            } catch (error) {
                // Логируем ошибку
                console.error(`Error deleting row at index ${rowIndex}:`, error.message);
        
                // Возвращаем ответ с соответствующим статусом и сообщением
                if (error.message.includes('Row index must')) {
                    res.status(400).json({ error: error.message }); // Ошибка клиента
                } else if (error.message.includes('not found')) {
                    res.status(404).json({ error: `Row at index ${rowIndex} not found` }); // Ошибка "не найдено"
                } else {
                    res.status(500).json({ error: 'An error occurred while deleting the row' }); // Общая ошибка сервера
                }
            }
        });
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

