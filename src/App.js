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
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import UserList from './UserList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthComponent from './components/AuthComponent';
import LogoutComponent from './components/LogoutComponent';
import React, { useEffect, useState } from 'react';
import { useAuth } from './authProvider'; // Импортируем только useAuth

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
                    undoable={false}
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
    const { user, allowedSheets, login } = useAuth(); // Используем хук useAuth
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!user);
    }, [user]);

    return (
        <>
            <Admin dataProvider={simpleRestProvider('http://localhost:3001')}>
                <ToastContainer />
                {!isLoading && allowedSheets.length > 0 ? (
                    allowedSheets.map((sheet) => (
                        <Resource
                            key={sheet}
                            name={sheet.toLowerCase().replace(/\s+/g, '-')}
                            list={UserList}
                            show={UserShow}
                            create={UserCreate}
                            edit={UserEdit}
                            options={{ label: sheet }}
                        />
                    ))
                ) : (
                    <AuthComponent onLogin={login} />
                )}
            </Admin>
        </>
    );
};

export default App;
