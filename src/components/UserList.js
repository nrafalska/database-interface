// src/UserList.js
import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const UserList = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" label="ID" />
            <TextField source="salesManager" label="Менеджер по продажам" />
            <TextField source="name" label="Имя клиента" />
            <TextField source="managerName" label="Имя менеджера" />
            <TextField source="collectionStatus" label="Статус коллекции" />
            <TextField source="dateTillDNC" label="Дата DNC" />
            <TextField source="reasonDNC" label="Причина DNC" />
            <TextField source="companyName" label="Компания" />
            <TextField source="shortUsefulInfo" label="Краткая информация" />
            <TextField source="totalContractAmount" label="Сумма контракта" />
            <TextField source="currentBalance" label="Текущий баланс" />
            <TextField source="paymentScheduleChanged" label="График платежей изменен?" />

            {/* Платежные даты и суммы для каждого платежа */}
            <TextField source="planDate1" label="Плановая дата 1" />
            <TextField source="planAmount1" label="Плановая сумма 1" />
            <TextField source="factAmount1" label="Фактическая сумма 1" />
            <TextField source="factDate1" label="Фактическая дата 1" />

            <TextField source="planDate2" label="Плановая дата 2" />
            <TextField source="planAmount2" label="Плановая сумма 2" />
            <TextField source="factAmount2" label="Фактическая сумма 2" />
            <TextField source="factDate2" label="Фактическая дата 2" />

            <TextField source="planDate3" label="Плановая дата 3" />
            <TextField source="planAmount3" label="Плановая сумма 3" />
            <TextField source="factAmount3" label="Фактическая сумма 3" />
            <TextField source="factDate3" label="Фактическая дата 3" />

            <TextField source="planDate4" label="Плановая дата 4" />
            <TextField source="planAmount4" label="Плановая сумма 4" />
            <TextField source="factAmount4" label="Фактическая сумма 4" />
            <TextField source="factDate4" label="Фактическая дата 4" />

            <TextField source="planDate5" label="Плановая дата 5" />
            <TextField source="planAmount5" label="Плановая сумма 5" />
            <TextField source="factAmount5" label="Фактическая сумма 5" />
            <TextField source="factDate5" label="Фактическая дата 5" />

            <TextField source="planDate6" label="Плановая дата 6" />
            <TextField source="planAmount6" label="Плановая сумма 6" />
            <TextField source="factAmount6" label="Фактическая сумма 6" />
            <TextField source="factDate6" label="Фактическая дата 6" />

            <TextField source="planDate7" label="Плановая дата 7" />
            <TextField source="planAmount7" label="Плановая сумма 7" />
            <TextField source="factAmount7" label="Фактическая сумма 7" />
            <TextField source="factDate7" label="Фактическая дата 7" />

            <TextField source="planDate8" label="Плановая дата 8" />
            <TextField source="planAmount8" label="Плановая сумма 8" />
            <TextField source="factAmount8" label="Фактическая сумма 8" />
            <TextField source="factDate8" label="Фактическая дата 8" />

            <TextField source="planDate9" label="Плановая дата 9" />
            <TextField source="planAmount9" label="Плановая сумма 9" />
            <TextField source="factAmount9" label="Фактическая сумма 9" />
            <TextField source="factDate9" label="Фактическая дата 9" />

            <TextField source="planDate10" label="Плановая дата 10" />
            <TextField source="planAmount10" label="Плановая сумма 10" />
            <TextField source="factAmount10" label="Фактическая сумма 10" />
            <TextField source="factDate10" label="Фактическая дата 10" />

            <EditButton /> {/* Кнопка для редактирования записи */}
            <DeleteButton /> {/* Кнопка для удаления записи */}
        </Datagrid>
    </List>
);

export default UserList;
