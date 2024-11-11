// src/DynamicSheetList.js
import React, { useEffect, useState } from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import fetchSheetData from './fetchSheetData'; // Импортируйте функцию для получения данных

const DynamicSheetList = ({ sheetId, range = 'A1:Z100', ...props }) => {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const values = await fetchSheetData(sheetId, range);
            if (values.length > 0) {
                setHeaders(values[0]); // Первая строка — заголовки
                setData(values.slice(1)); // Остальные строки — данные
            }
        };
        loadData();
    }, [sheetId, range]);

    return (
        <List {...props}>
            <Datagrid>
                {headers.map((header, index) => (
                    <TextField
                        key={header}
                        source={header}
                        label={header}
                        render={() => (
                            data.map(row => (
                                <span key={row[index]}>{row[index]}</span>
                            ))
                        )}
                    />
                ))}
            </Datagrid>
        </List>
    );
};

export default DynamicSheetList;
