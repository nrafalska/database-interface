// src/App.js
import * as React from 'react';
import { Admin, Resource, ListGuesser, Show, TabbedShowLayout, Tab, TextField } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from './authProvider';

// Компонент для отображения детальной информации о пользователе
const UserShow = props => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="Основные данные">
                <TextField source="name" label="Имя клиента" />
                <TextField source="salesManager" label="Менеджер по продажам" />
                <TextField source="collectionStatus" label="Статус коллекции" />
                {/* Дополнительные поля можно добавить здесь */}
            </Tab>
            <Tab label="Финансовая информация">
                <TextField source="totalContractAmount" label="Общая сумма контракта" />
                <TextField source="currentBalance" label="Текущий баланс" />
                {/* Дополнительные финансовые поля */}
            </Tab>
        </TabbedShowLayout>
    </Show>
);

// Главный компонент приложения
const App = () => (
    <Admin authProvider={authProvider} dataProvider={simpleRestProvider('http://localhost:3001')}>
        {/* Ресурс "Active" для активных данных */}
        <Resource
            name="active"  // URL для ресурса должен совпадать с маршрутом на сервере
            list={ListGuesser}  // Используем ListGuesser для отображения списка записей
            show={UserShow}     // Используем UserShow для отображения детальной информации
            options={{ label: 'Active' }}  // Устанавливаем метку "Active" в боковой панели
        />
        
        {/* Ресурс "Inactive" для неактивных данных */}
        <Resource
            name="inactive"  // URL для ресурса должен совпадать с маршрутом на сервере
            list={ListGuesser}
            show={UserShow}
            options={{ label: 'Inactive' }}  // Устанавливаем метку "Inactive" в боковой панели
        />
    </Admin>
);

export default App;
