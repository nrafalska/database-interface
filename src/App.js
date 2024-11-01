// src/App.js
import * as React from 'react';
import {
    Admin,
    Resource,
    Show,
    TabbedShowLayout,
    Tab,
    TextField,
    EditButton,
    DeleteButton,
    TopToolbar
} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from './authProvider';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import UserList from './UserList'; // Импорт кастомного списка
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthComponent from './components/AuthComponent';
import LogoutComponent from './components/LogoutComponent';
import React, { useEffect, useState } from 'react';

// Панель действий для каждой записи
const CustomActions = ({ basePath, data }) => (
    <TopToolbar>
        {data && (
            <>
                <EditButton
                    basePath={basePath}
                    record={data}
                    onClick={() => showNotification('Редактирование записи')}
                />
                <DeleteButton
                    basePath={basePath}
                    record={data}
                    undoable={false} // Чтобы уведомление сразу показывало результат
                    onSuccess={() => showNotification('Запись успешно удалена', 'info')}
                    onFailure={() => showNotification('Ошибка при удалении записи', 'error')}
                />
            </>
        )}
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

// Функция для отображения уведомлений
const showNotification = (message, type = 'success') => {
    toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

const App = () => {
    const [allowedSheets, setAllowedSheets] = useState([]);

    useEffect(() => {
        // Получаем разрешённые листы при загрузке приложения
        authProvider.getPermissions().then((sheets) => {
            setAllowedSheets(sheets);
        }).catch(() => {
            console.error('Не удалось получить разрешения для пользователя.');
        });
    }, []);

    return (
        <Admin authProvider={authProvider} dataProvider={simpleRestProvider('http://localhost:3001')}>
            <ToastContainer />
            {allowedSheets.length > 0 ? (
                allowedSheets.map((sheet) => (
                    <Resource
                        key={sheet}
                        name={sheet.toLowerCase().replace(/\s+/g, '-')} // Убедитесь, что ваши имена ресурсов совпадают с тем, что обрабатывает сервер
                        list={UserList}
                        show={UserShow}
                        create={UserCreate}
                        edit={UserEdit}
                        options={{ label: sheet }}
                    />
                ))
            ) : (
                <div>Загрузка ресурсов или недостаточно прав для отображения данных.</div>
            )}
        </Admin>
    );
};
export default App;
