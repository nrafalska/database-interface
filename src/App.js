// src/App.js
import * as React from 'react';
import {
    Admin,
    Resource,
    ListGuesser,
    Show,
    TabbedShowLayout,
    Tab,
    TextField,
    EditButton,
    DeleteButton,
    TopToolbar
} from 'react-admin'; // Здесь добавлены EditButton и DeleteButton
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from './authProvider';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import UserList from './UserList';  // Импортируем кастомный список

// Панель действий для каждой записи (кнопки Edit и Delete)
const CustomActions = ({ basePath, data }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />       {/* Кнопка редактирования */}
        <DeleteButton basePath={basePath} record={data} />     {/* Кнопка удаления */}
    </TopToolbar>
);

// Компонент отображения информации о пользователе с вкладками
const UserShow = (props) => (
    <Show {...props} actions={<CustomActions />}>
        <TabbedShowLayout>
            <Tab label="Основные данные">
                <TextField source="name" label="Имя клиента" />
                <TextField source="salesManager" label="Менеджер по продажам" />
                <TextField source="collectionStatus" label="Статус коллекции" />
            </Tab>
            <Tab label="Финансовая информация">
                <TextField source="totalContractAmount" label="Общая сумма контракта" />
                <TextField source="currentBalance" label="Текущий баланс" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

// Главный компонент приложения
const App = () => (
    <Admin authProvider={authProvider} dataProvider={simpleRestProvider('http://localhost:3001')}>
        {['active', 'inactive'].map((resource) => (
            <Resource
                key={resource}
                name={resource}
                list={UserList}             // Используем кастомный список с кнопками редактирования и удаления
                show={UserShow}              // Компонент для отображения информации с панелью действий
                create={UserCreate}          // Компонент для добавления записи
                edit={UserEdit}              // Компонент для редактирования записи
                options={{ label: resource.charAt(0).toUpperCase() + resource.slice(1) }}  // Capitalize label
            />
        ))}
    </Admin>
);

export default App;
