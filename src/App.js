import React, { useEffect, useState } from 'react';
import {
    Admin,
    Resource,
    Show,
    TabbedShowLayout,
    Tab,
    TextField,
    EditButton,
    DeleteButton,
    TopToolbar,
    UserMenu,
} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import UserList from './components/UserList';
import AuthComponent from './components/AuthComponent';
import LogoutComponent from './components/LogoutComponent';
import { useAuth } from './authProvider';
import MyLayout from './components/MyLayout'; 
import { useNavigate } from 'react-router-dom';  // Хук для навигации

// Панель действий для каждой записи
const CustomActions = ({ basePath, data }) => (
    <TopToolbar>
        {data && (
            <>
                <EditButton basePath={basePath} record={data} />
                <DeleteButton basePath={basePath} record={data} undoable={false} />
            </>
        )}
    </TopToolbar>
);

// Компонент для отображения записи
const UserShow = (props) => (
    <Show {...props} actions={<CustomActions />} >
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
const App = () => {
    const { user, allowedSheets, login, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Используем useNavigate для маршрутизации

    useEffect(() => {
        setIsLoading(!user);
    }, [user]);

    return (
        <>
            {isLoading ? (
                <AuthComponent onLogin={login} />
            ) : (
                <Admin
                    layout={MyLayout}  // Используем кастомный layout с кнопкой выхода
                    dataProvider={simpleRestProvider('http://localhost:3001')}
                    userMenu={<UserMenu><LogoutComponent onLogout={logout} /></UserMenu>}
                >
                    {allowedSheets && allowedSheets.length > 0 ? (
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
                        <div>Нет доступных данных для отображения</div>
                    )}
                </Admin>
            )}
        </>
    );
};

export default App;
