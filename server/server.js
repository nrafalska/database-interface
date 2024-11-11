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

        console.log('Ответ от Google Sheets:', response.data.values); // Проверка полученных данных

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
    { name: 'natasha', sheets: [{ type: 'ACTIVE', gid: '1240916250' }, { type: 'INACTIVE', gid: '1540701091' }] },
    { name: 'nazariik', sheets: [{ type: 'Active!', gid: '90018042' }, { type: 'INACTIVE', gid: '2012750231' }] },
    { name: 'nikita_shakotko', sheets: [{ type: 'Shakotko Active!', gid: '2113883320' }, { type: 'INACTIVE', gid: '503637199' }] },
    { name: 'ruslan_dawydenko', sheets: [{ type: 'ACTIVE', gid: '1401851167' }, { type: 'Dawydenko Active!', gid: '668133830' }, { type: 'INACTIVE', gid: '416038541' }] },
    { name: 'alex_megas', sheets: [{ type: 'Active!', gid: '310291825' }, { type: 'INACTIVE', gid: '430621295' }] },
    { name: 'nebojsa', sheets: [{ type: 'ACTIVE', gid: '1695684781' }, { type: 'INACTIVE', gid: '1392500008' }, { type: 'Active!', gid: '299232860' }] },
    { name: 'mark_tarytsanu', sheets: [{ type: 'Active!', gid: '1327900089' }, { type: 'INACTIVE', gid: '1972066586' }] },
    { name: 'anton_zhidkov', sheets: [{ type: 'ACTIVE', gid: '1334264924' }, { type: 'INACTIVE', gid: '1822325838' }] },
    { name: 'julia', sheets: [{ type: 'ACTIVE', gid: '1910261012' }, { type: 'Krendeleva Active!', gid: '828755112' }, { type: 'INACTIVE', gid: '352885166' }] },
    { name: 'arkadiy', sheets: [{ type: 'Osokin Active!', gid: '1436572648' }, { type: 'INACTIVE', gid: '520725355' }] },
    { name: 'olga', sheets: [{ type: 'ACTIVE', gid: '1884425070' }, { type: 'Meshcheryakova Active!', gid: '449469755' }, { type: 'INACTIVE', gid: '285512120' }] },
    { name: 'kolya_solomennyi', sheets: [{ type: 'Active!', gid: '11031933' }, { type: 'INACTIVE', gid: '1623940457' }] },
    { name: 'nataliia_denisenko', sheets: [{ type: 'Active', gid: '774640725' }, { type: 'D INACTIVE', gid: '1563493966' }] },
    { name: 'nataliia_grek', sheets: [{ type: 'Active', gid: '1800218305' }, { type: 'G INACTIVE', gid: '1862483022' }] },
    { name: 'alina_kolpakova', sheets: [{ type: 'Active!', gid: '1897384161' }, { type: 'InActive', gid: '99503959' }] },
    { name: 'maryna_urvantseva', sheets: [{ type: 'ACTIVE', gid: '1621382825' }, { type: 'INACTIVE', gid: '519635099' }] },
    { name: 'dmytro_chernuha', sheets: [{ type: 'ACTIVE', gid: '1352980819' }, { type: 'INACTIVE', gid: '57061661' }] },
    { name: 'nikita_yagunov', sheets: [{ type: 'ACTIVE', gid: '1944189408' }, { type: 'INACTIVE', gid: '673863445' }] },
    { name: 'alexandra_belova', sheets: [{ type: 'ACTIVE', gid: '962214485' }, { type: 'INACTIVE', gid: '1886272138' }] },
    { name: 'diana_romaniuk', sheets: [{ type: 'ACTIVE', gid: '174663765' }, { type: 'INACTIVE', gid: '1986505364' }] },
];
// Пример создания маршрутов на основе списка users
users.forEach(user => {
    user.sheets.forEach(sheet => {
        const sheetName = `${user.name} ${sheet.type}`; // Формируем имя листа

        app.get(`/${user.name.toLowerCase()}-${sheet.type.toLowerCase()}`, async (req, res) => {
            try {
                // Задаем нужный диапазон для каждого листа
                const data = await accessSpreadsheet(`'${sheetName}'!A1:ZZ1000`);
                
                // Устанавливаем заголовки для обработки диапазона данных
                res.setHeader('Content-Range', `${user.name.toLowerCase()}-${sheet.type.toLowerCase()} 0-${data.length}/${data.length}`);
                res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
                res.json(data);
            } catch (error) {
                console.error(`Error retrieving data for ${sheetName}:`, error);
                res.status(500).send('Error retrieving data');
            }
        });
    });
});
// Запуск сервера
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
