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
    TopToolbar
} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import UserList from './components/UserList';
import AuthComponent from './components/AuthComponent';
import { useAuth } from './authProvider';

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

const App = () => {
    const { user, allowedSheets, login } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('Пользователь:', user);
        setIsLoading(!user);
    }, [user]);

    return (
        <>
            {isLoading ? (
                <AuthComponent onLogin={login} />
            ) : (
                <Admin dataProvider={simpleRestProvider('http://localhost:3001')}>
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
