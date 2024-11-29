import React, { useEffect, useState } from 'react';
import {
    Admin,
    Resource,
    Show,
    TabbedShowLayout,
    Tab,
    TextField,
    UserMenu,
    useNotify,
    CustomRoutes // Добавлено
} from 'react-admin';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import UserList from './components/UserList';
import AuthComponent from './components/AuthComponent';
import LogoutComponent from './components/LogoutComponent';
import { useAuth } from './authProvider';
import MyLayout from './components/MyLayout';
import { Route } from 'react-router-dom';

const App = () => {
    const { user, allowedSheets, login, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const notify = useNotify(); // Добавлено

    useEffect(() => {
        setIsLoading(!user);
    }, [user]);

    // Кастомизация dataProvider
    const dataProvider = {
        getList: async (resource) => {
            try {
                const response = await fetch(`http://localhost:3001/${resource}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch list of ${resource}`);
                }
                const data = await response.json();
                return { data, total: data.length };
            } catch (error) {
                notify(`Error fetching list: ${error.message}`, { type: 'error' }); // Добавлено уведомление
                throw error;
            }
        },
        getOne: async (resource, params) => {
            try {
                const response = await fetch(`http://localhost:3001/${resource}/${params.id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch record with ID ${params.id}`);
                }
                const data = await response.json();
                return { data };
            } catch (error) {
                notify(`Error fetching record: ${error.message}`, { type: 'error' }); // Добавлено уведомление
                throw error;
            }
        },
        create: async (resource, params) => {
            try {
                const response = await fetch(`http://localhost:3001/${resource}/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(params.data),
                });
                if (!response.ok) {
                    throw new Error(`Failed to create record in ${resource}`);
                }
                notify('Record created successfully!', { type: 'success' }); // Добавлено уведомление
                return { data: params.data };
            } catch (error) {
                notify(`Error creating record: ${error.message}`, { type: 'error' }); // Добавлено уведомление
                throw error;
            }
        },
        update: async (resource, params) => {
            try {
                const response = await fetch(`http://localhost:3001/${resource}/update/${params.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(params.data),
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to update record with ID ${params.id}: ${errorText}`);
                }
                const data = await response.json();
                notify('Record updated successfully!', { type: 'success' }); // Добавлено уведомление
                return { data };
            } catch (error) {
                notify(`Error updating record: ${error.message}`, { type: 'error' }); // Добавлено уведомление
                throw error;
            }
        },
        delete: async (resource, params) => {
            try {
                const url = `http://localhost:3001/${resource}/delete/${params.id}`;
                console.log(`Sending DELETE request to: ${url}`);
        
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });
        
                if (!response.ok) {
                    const errorMessage = `Failed DELETE request. Status: ${response.status}, StatusText: ${response.statusText}`;
                    console.error(errorMessage);
                    throw new Error(errorMessage);
                }
        
                const responseData = await response.json();
                notify('Record deleted successfully!', { type: 'success' }); // Добавлено уведомление
                return { data: { id: params.id } };
            } catch (error) {
                notify(`Error deleting record: ${error.message}`, { type: 'error' }); // Добавлено уведомление
                throw error;
            }
        },
        deleteMany: async (resource, params) => {
            try {
                const response = await fetch(`http://localhost:3001/${resource}/deleteMany`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ids: params.ids }), // Передаём массив ids
                });
        
                if (!response.ok) {
                    throw new Error(`Failed to delete records in ${resource}`);
                }
                notify('Records deleted successfully!', { type: 'success' }); // Добавлено уведомление
                return { data: params.ids };
            } catch (error) {
                notify(`Error deleting records: ${error.message}`, { type: 'error' }); // Добавлено уведомление
                throw error;
            }
        },
    };

    return isLoading ? (
        <AuthComponent onLogin={login} />
    ) : (
        <Admin
            layout={MyLayout}
            dataProvider={dataProvider}
            userMenu={
                <UserMenu>
                    <LogoutComponent onLogout={logout} />
                </UserMenu>
            }
            customRoutes={
                <CustomRoutes>
                    {/* Маршрут для создания записи */}
                    <Route path="/:resource/create" element={<UserCreate />} />
                </CustomRoutes>
            }
        >
            {allowedSheets?.length > 0 ? (
                allowedSheets.map((sheet) => (
                    <Resource
                        key={sheet}
                        name={sheet.toLowerCase().replace(/\s+/g, '-')}
                        list={UserList}
                        create={UserCreate}
                        edit={UserEdit}
                        show={() => (
                            <Show>
                                <TabbedShowLayout>
                                <Tab label="Client Information">
                                <TextField source="ID" label="ID" />
                                <TextField source="Sales manager" label="Sales Manager" />
                                <TextField source="Name of client" label="Name of Client" />
                                <TextField source="Manger name" label="Manager Name" />
                                <TextField source="Collection status" label="Collection Status" />
                                <TextField source="Date till DNC" label="Date Till DNC" />
                                <TextField source="Reason DNC" label="Reason for DNC" />
                                <TextField source="Company name" label="Company Name" />
                                <TextField source="Short Useful Info" label="Short Useful Info" />
                            </Tab>
                            <Tab label="Financial Information">
                                <TextField source="Total contract amount" label="Total Contract Amount" />
                                <TextField source="Current balance" label="Current Balance" />
                                <TextField source="Payment schedule changed?" label="Payment Schedule Changed?" />
                            </Tab>
                            <Tab label="Payments">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i}>
                                        <TextField source={`plan amount${i + 1}`} label={`Plan Amount ${i + 1}`} />
                                        <TextField source={`plan date${i + 1}`} label={`Plan Date ${i + 1}`} />
                                        <TextField source={`fact amount${i + 1}`} label={`Fact Amount ${i + 1}`} />
                                        <TextField source={`fact date${i + 1}`} label={`Fact Date ${i + 1}`} />
                                    </div>
                                ))}
                            </Tab>
                                </TabbedShowLayout>
                            </Show>
                        )}
                        
                        
                        options={{ label: sheet }}
                    />
                ))
            ) : (
                <div>No available data to display</div>
            )}
        </Admin>
    );
};

export default App;
