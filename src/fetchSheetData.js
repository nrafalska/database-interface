// src/fetchSheetData.js

import axios from 'axios';

const fetchSheetData = async (sheetId, range) => {
    const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
        {
            headers: {
                Authorization: `1040ZuR04Gvwe2a-hWLB91SM__QXBOk22HDsfHYyNo6Y`, // Добавьте токен доступа
            },
        }
    );
    return response.data.values; // Массив значений ячеек
};

export default fetchSheetData;
