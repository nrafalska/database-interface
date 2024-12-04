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
// Функция для добавления строки в Google Sheets
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

        // **Добавлено:** Проверка имени листа
        if (!sheetName || typeof sheetName !== 'string') {
            throw new Error('Invalid sheetName provided');
        }

        // Получение заголовков
        const headerRange = `${sheetName}!A1:BH1`; // Корректный диапазон заголовков
        console.log(`Fetching headers from range: ${headerRange}`);
        const headerResponse = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range: headerRange,
        });

        const rawHeaders = headerResponse.data.values ? headerResponse.data.values[0] : [];
        console.log('Raw Headers from Google Sheets:', rawHeaders);

        // **Добавлено:** Проверка наличия заголовков
        if (!rawHeaders || rawHeaders.length === 0) {
            console.error('No headers found in the specified sheet.');
            throw new Error('No headers available in the sheet.');
        }

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
            const value = data[header] !== undefined ? data[header] : ''; // Значение по умолчанию — пустая строка
            console.log(`Header: "${header}" -> Value: "${value}"`);
            return value;
        });

        console.log('Generated Row:', row);

        // **Добавлено:** Предупреждение, если длины строки и заголовков не совпадают
        if (row.length !== headers.length) {
            console.warn(
                `Row length (${row.length}) does not match headers length (${headers.length}).`
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

        // **Добавлено:** Логирование следующей строки
        console.log(`Next available row index: ${nextRowIndex}`);

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

        // **Добавлено:** Уведомление об успехе
        console.log(`Row successfully added at index ${nextRowIndex}`);
    } catch (error) {
        // **Добавлено:** Улучшенное логирование ошибок
        console.error('Error adding data to Google Sheets:', error.message);
        console.error('Error details:', error);
        throw error;
    }
}



// Функция для удаления строки в Google Sheets
async function deleteRow(spreadsheetId, sheetName, rowIndex) {
    console.log(`Deleting row in sheet "${sheetName}" at index ${rowIndex}`);

    const client = await getGoogleClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    try {
        const sheetId = await getSheetId(sheetName, googleSheets, spreadsheetId);
        console.log('Sheet ID:', sheetId);

        if (rowIndex <= 0) {
            throw new Error(`Invalid rowIndex: ${rowIndex}. Row indices must start from 1.`);
        }

        await googleSheets.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: {
                requests: [
                    {
                        deleteRange: {
                            range: {
                                sheetId: sheetId,
                                startRowIndex: rowIndex - 1,
                                endRowIndex: rowIndex,
                            },
                            shiftDimension: 'ROWS',
                        },
                    },
                ],
            },
        });

        console.log(`Row ${rowIndex} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting row ${rowIndex} in sheet "${sheetName}":`, error.message);
        throw error;
    }
}




// Вспомогательная функция для получения sheetId по имени
async function getSheetId(sheetName, googleSheets, spreadsheetId) {
    const response = await googleSheets.spreadsheets.get({ spreadsheetId });
    console.log('Available sheets:', response.data.sheets.map(s => s.properties.title));

    const sheet = response.data.sheets.find(
        s => s.properties.title.toLowerCase() === sheetName.toLowerCase()
    );

    if (!sheet) {
        console.error(`Sheet "${sheetName}" not found`);
        throw new Error(`Sheet "${sheetName}" not found`);
    }

    return sheet.properties.sheetId;
}





// Функция для обновления данных в Google Sheets
async function updateDataInGoogleSheet(id, data, sheetName) {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'credentials.json'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    try {
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: 'v4', auth: client });
        const spreadsheetId = '1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y'; // Ваш ID таблицы

        // Чтение текущих данных листа
        const range = `${sheetName}!A1:ZZ1000`;
        const response = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            throw new Error(`No data found in sheet "${sheetName}"`);
        }

        const headers = rows[0]; // Получаем заголовки
        const rowIndex = rows.findIndex(row => row[0] == id); // Находим индекс строки по ID

        if (rowIndex === -1) {
            throw new Error(`Record with ID ${id} not found in sheet "${sheetName}"`);
        }

        // Обновляем строку на основе переданных данных
        const updatedRow = headers.map(header => {
            const value = data[header] || '';
            console.log(`Updating column "${header}": ${value}`);
            return value;
        });

        // Запись обновленных данных в лист
        await googleSheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A${rowIndex + 1}`,
            valueInputOption: 'RAW',
            resource: {
                values: [updatedRow],
            },
        });

        console.log(`Record with ID ${id} successfully updated in sheet "${sheetName}"`);
    } catch (error) {
        console.error(`Error updating data in sheet "${sheetName}":`, error.message);
        throw new Error(`Failed to update data: ${error.message}`);
    }
}

// Вспомогательная функция для преобразования ресурса в корректное имя листа
function getSheetName(resource) {
    return resource
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ')
        .trim();
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
        // Вспомогательный маршрут для вывода списка листов
app.get('/list-sheets', async (req, res) => {
    try {
        const client = await getGoogleClient(); // Используем вашу функцию getGoogleClient
        const googleSheets = google.sheets({ version: 'v4', auth: client });
        const response = await googleSheets.spreadsheets.get({ spreadsheetId });

        // Получаем список названий листов
        const sheets = response.data.sheets.map(sheet => sheet.properties.title);
        console.log('Available sheets:', sheets); // Логируем доступные листы

        res.json({ sheets }); // Возвращаем список листов
    } catch (error) {
        console.error('Error listing sheets:', error.message);
        res.status(500).send(`Error listing sheets: ${error.message}`);
    }
});

        
        // Маршрут для удаления данных
        app.delete('/:userName-:sheetType/delete/:rowIndex', async (req, res) => {
            const { userName, sheetType, rowIndex } = req.params;
        
            if (!userName || !sheetType || !rowIndex || isNaN(rowIndex)) {
                res.status(400).send('Missing or invalid parameters: userName, sheetType, or rowIndex');
                return;
            }
        
            const sheetName = `${userName} ${sheetType === 'inactive' ? 'INACTIVE' : 'ACTIVE'}`.trim();
            const parsedRowIndex = parseInt(rowIndex, 10);
        
            try {
                // Логируем значения для отладки
                console.log('User Name:', userName);
                console.log('Sheet Type:', sheetType);
                console.log('Sheet Name:', sheetName);
                console.log('Row Index:', rowIndex);
        
                if (parsedRowIndex <= 0) {
                    throw new Error('Row index must be greater than 0');
                }
        
                await deleteRow('1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y', sheetName, parsedRowIndex);
                res.status(200).send(`Row ${parsedRowIndex} deleted successfully from sheet "${sheetName}".`);
            } catch (error) {
                console.error(`Error deleting row ${parsedRowIndex} in sheet "${sheetName}": ${error.message}`);
                res.status(500).send(`Error deleting row: ${error.message}`);
            }
        });
        
        
        // Обновление записи
        app.put('/:resource/update/:id', async (req, res) => {
            const { resource, id } = req.params;
            const updatedData = req.body;
        
            try {
                const sheetName = getSheetName(resource);
        
                // Логируем значения для отладки
                console.log('Resource:', resource);
                console.log('Sheet name:', sheetName);
                console.log('Updating record with ID:', id);
                console.log('Updated data:', updatedData);
        
                await updateDataInGoogleSheet(id, updatedData, sheetName);
        
                res.status(200).send(`Record with ID: ${id} updated successfully in sheet "${sheetName}".`);
            } catch (error) {
                console.error(`Error updating record with ID ${id} in sheet "${sheetName}":`, error.message);
                res.status(500).send(`Error updating record: ${error.message}`);
            }
        });
        
        
        
        
        // Маршрут для обработки массового удаления
app.post('/:resource/deleteMany', async (req, res) => {
    const { ids } = req.body;
    const { resource } = req.params;

    console.log('Resource:', resource);
    console.log('IDs to delete:', ids);

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        console.error('Invalid request payload: "ids" must be a non-empty array');
        res.status(400).send('Invalid request payload: "ids" must be a non-empty array');
        return;
    }

    const sheetName = getSheetName(resource);
    console.log('Sheet name:', sheetName);

    try {
        const results = await Promise.allSettled(
            ids.map(async id => {
                console.log(`Deleting row with ID: ${id}`);
                await deleteRow('1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y', sheetName, parseInt(id, 10));
                return id;
            })
        );

        const successfulDeletes = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);

        const failedDeletes = results
            .filter(result => result.status === 'rejected')
            .map(result => result.reason.message);

        console.log('Successful deletes:', successfulDeletes);
        console.log('Failed deletes:', failedDeletes);

        if (failedDeletes.length > 0) {
            res.status(207).send({
                message: 'Partial success: some records were not deleted.',
                successfulDeletes,
                failedDeletes,
            });
        } else {
            res.status(200).send(`Successfully deleted records: ${successfulDeletes.join(', ')}`);
        }
    } catch (error) {
        console.error('Critical error deleting records:', error.message);
        res.status(500).send(`Critical error deleting records: ${error.message}`);
    }
});


        // Редактирование записи
        app.get('/:resource/:id', async (req, res) => {
            const { resource, id } = req.params;
        
            try {
                const sheetName = resource
                    .split('-')
                    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                    .join(' ')
                    .trim();
        
                console.log('Fetching data for sheet:', sheetName, 'ID:', id);
        
                const range = `${sheetName}!A1:ZZ1000`;
                const data = await accessSpreadsheet(range);
        
                const record = data.find(row => row.id == id);
                if (!record) {
                    return res.status(404).send(`Record with ID ${id} not found in sheet "${sheetName}"`);
                }
        
                res.json(record);
            } catch (error) {
                console.error('Error fetching record:', error.message);
                res.status(500).send(`Error fetching record: ${error.message}`);
            }
        });
        
        
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

