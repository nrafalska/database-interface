// src/components/ClientTable.js
import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';

// Компонент для отображения данных в таблице
const ClientTable = ({ schema, ...props }) => (
    <List {...props}>
        <Datagrid>
            {schema.map((field, index) => (
                <TextField key={index} source={field} label={field} />
            ))}
        </Datagrid>
    </List>
);

export default ClientTable;
