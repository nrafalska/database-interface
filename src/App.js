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
import UserEdit from './components/UserEdit'; // Импортируем компонент редактирования
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

const createRecord = async (data) => {
    const response = await fetch('http://localhost:3001/marynau-inactive/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create record');
    }
    return await response.json();
};


// Компонент для отображения записи
const UserShow = (props) => (
    <Show {...props} actions={<CustomActions />}>
        <TabbedShowLayout>
            <Tab label="Client Information">
                <TextField source="name" label="Client Name" />
                <TextField source="salesManager" label="Sales Manager" />
                <TextField source="managerName" label="Manager's Name" />
                <TextField source="collectionStatus" label="Collection Status" />
            </Tab>
            <Tab label="Financial Information">
                <TextField source="totalContractAmount" label="Contract Amount" />
                <TextField source="currentBalance" label="Current Balance" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

// Главный компонент приложения
const App = () => {
    const { user, allowedSheets, login, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Хук для навигации

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
                                edit={UserEdit} // Подключаем компонент редактирования
                                options={{ label: sheet }}
                            />
                        ))
                    ) : (
                        <div>No available data to display</div>
                    )}
                </Admin>
            )}
        </>
    );
};

export default App;
