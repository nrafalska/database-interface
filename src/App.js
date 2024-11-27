import React, { useEffect, useState } from 'react';
import {
    Admin,
    Resource,
    Show,
    TabbedShowLayout,
    Tab,
    TextField,
    UserMenu,
} from 'react-admin';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import UserList from './components/UserList';
import AuthComponent from './components/AuthComponent';
import LogoutComponent from './components/LogoutComponent';
import { useAuth } from './authProvider';
import MyLayout from './components/MyLayout';

const App = () => {
    const { user, allowedSheets, login, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!user);
    }, [user]);

    // Кастомизация dataProvider
    const dataProvider = {
        getList: async (resource) => {
            const response = await fetch(`http://localhost:3001/${resource}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch list of ${resource}`);
            }
            const data = await response.json();
            return { data, total: data.length };
        },
        getOne: async (resource, params) => {
            const response = await fetch(`http://localhost:3001/${resource}/${params.id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch record with ID ${params.id}`);
            }
            const data = await response.json();
            return { data };
        },
        create: async (resource, params) => {
            const response = await fetch(`http://localhost:3001/${resource}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params.data),
            });
            if (!response.ok) {
                throw new Error(`Failed to create record in ${resource}`);
            }
            return { data: params.data };
        },
        update: async (resource, params) => {
            const response = await fetch(`http://localhost:3001/${resource}/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params.data),
            });
            if (!response.ok) {
                throw new Error(`Failed to update record with ID ${params.id}`);
            }
            const data = await response.json();
            return { data };
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
                console.log(`Successfully deleted record with ID ${params.id}:`, responseData);
        
                return { data: { id: params.id } };
            } catch (error) {
                console.error(`Error during DELETE request: ${error.message}`);
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
        
                return { data: params.ids };
            } catch (error) {
                console.error(`Error in deleteMany: ${error.message}`);
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
        >
            {allowedSheets?.length > 0 ? (
                allowedSheets.map((sheet) => (
                    <Resource
                        key={sheet}
                        name={sheet.toLowerCase().replace(/\s+/g, '-')}
                        list={UserList}
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
                        create={UserCreate}
                        edit={UserEdit}
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
