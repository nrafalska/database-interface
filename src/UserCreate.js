// src/UserCreate.js
import * as React from 'react';
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Имя клиента" />
            <TextInput source="salesManager" label="Менеджер по продажам" />
            <TextInput source="collectionStatus" label="Статус коллекции" />
            <TextInput source="dateTillDNC" label="Дата" />
            <TextInput source="reasonDNC" label="Причина" />
            <TextInput source="companyName" label="Компания" />
            <TextInput source="shortUsefulInfo" label="Краткая информация" />
            <NumberInput source="totalContractAmount" label="Сумма контракта" />
            <NumberInput source="currentBalance" label="Текущий баланс" />
        </SimpleForm>
    </Create>
);

export default UserCreate;
