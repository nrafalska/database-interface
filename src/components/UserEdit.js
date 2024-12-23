// src/UserEdit.js
import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Имя клиента" />
            <TextInput source="salesManager" label="Менеджер по продажам" />
            <TextInput source="managerName" label="Имя менеджера" />
            <TextInput source="collectionStatus" label="Статус коллекции" />
            <TextInput source="dateTillDNC" label="Дата до DNC" />
            <TextInput source="reasonDNC" label="Причина DNC" />
            <TextInput source="companyName" label="Компания" />
            <TextInput source="shortUsefulInfo" label="Краткая информация" />
            <NumberInput source="totalContractAmount" label="Сумма контракта" />
            <NumberInput source="currentBalance" label="Текущий баланс" />
            <TextInput source="paymentScheduleChanged" label="График платежей изменен?" />

            {/* Платежные даты и суммы для каждого из 10 платежей */}
            {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                    <TextInput source={`planDate${i + 1}`} label={`Плановая дата ${i + 1}`} />
                    <NumberInput source={`planAmount${i + 1}`} label={`Плановая сумма ${i + 1}`} />
                    <NumberInput source={`factAmount${i + 1}`} label={`Фактическая сумма ${i + 1}`} />
                    <TextInput source={`factDate${i + 1}`} label={`Фактическая дата ${i + 1}`} />
                </React.Fragment>
            ))}
        </SimpleForm>
    </Edit>
);

export default UserEdit;
