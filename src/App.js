// src/App.js
import * as React from 'react';
import { Admin, Resource, ListGuesser, Show, TabbedShowLayout, Tab, TextField, EditButton, DeleteButton, TopToolbar } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from './authProvider';
import UserCreate from './UserCreate';  // Импортируем компонент UserCreate
import UserEdit from './UserEdit';      // Импортируем компонент UserEdit

// Компонент для отображения панели действий с кнопками Edit и Delete
const CustomActions = ({ basePath, data }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />  {/* Кнопка редактирования */}
        <DeleteButton basePath={basePath} record={data} />  {/* Кнопка удаления */}
    </TopToolbar>
);

// Компонент для отображения детальной информации о пользователе
const UserShow = props => (
    <Show {...props} actions={<CustomActions />}> {/* Добавляем CustomActions в качестве панели действий */}
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
            name="active"
            list={ListGuesser}
            show={UserShow}       // Используем UserShow для отображения детальной информации с CustomActions
            create={UserCreate}   // Используем UserCreate для добавления новой записи
            edit={UserEdit}       // Используем UserEdit для редактирования записи
            options={{ label: 'Active' }}
        />
        
        {/* Ресурс "Inactive" для неактивных данных */}
        <Resource
            name="inactive"
            list={ListGuesser}
            show={UserShow}
            create={UserCreate}
            edit={UserEdit}
            options={{ label: 'Inactive' }}
        />
    </Admin>
);

export default App;
