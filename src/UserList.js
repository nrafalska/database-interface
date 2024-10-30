// src/UserList.js
import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const UserList = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" label="ID" />
            <TextField source="salesManager" label="Менеджер по продажам" />
            <TextField source="name" label="Имя клиента" />
            <TextField source="collectionStatus" label="Статус коллекции" />
            <TextField source="dateTillDNC" label="Дата DNC" />
            <TextField source="reasonDNC" label="Причина DNC" />
            <TextField source="companyName" label="Компания" />
            <TextField source="shortUsefulInfo" label="Краткая информация" />
            <TextField source="totalContractAmount" label="Сумма контракта" />
            <TextField source="currentBalance" label="Текущий баланс" />
            <EditButton /> {/* Кнопка для редактирования записи */}
            <DeleteButton /> {/* Кнопка для удаления записи */}
        </Datagrid>
    </List>
);

export default UserList;
