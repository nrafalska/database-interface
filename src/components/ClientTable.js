import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ClientTable = ({ sheetName }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Запрос данных по конкретному листу
                const response = await fetch(`http://localhost:3001/${sheetName.toLowerCase().replace(/\s+/g, '-')}`);
                const result = await response.json();

                // Форматируем данные для DataGrid
                const formattedData = result.slice(1).map((row, index) => {
                    const rowData = { id: index + 1 };
                    result[0].forEach((header, i) => {
                        rowData[header] = row[i] || '';
                    });
                    return rowData;
                });

                setData(formattedData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, [sheetName]);

    return (
        <DataGrid
            rows={data}
            columns={[
                { field: 'ID', headerName: 'ID' },
                { field: 'Sales manager', headerName: 'Sales Manager' },
                { field: 'Name of client', headerName: 'Client Name' },
                { field: 'Collection status', headerName: 'Collection Status' },
                { field: 'Company name', headerName: 'Company Name' },
                { field: 'Total contract amount', headerName: 'Total Contract Amount' },
                { field: 'Current balance', headerName: 'Current Balance' },
                { field: 'Payment schedule changed?', headerName: 'Payment Schedule Changed?' },
                // Добавьте другие нужные столбцы
            ]}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            autoHeight
        />
    );
};

export default ClientTable;
