import React, { useState } from 'react';
import {
    SimpleForm,
    Toolbar,
    SaveButton,
    TextInput,
    NumberInput,
    Button,
    useNotify,
    useRedirect,
    useDataProvider,
    useRefresh,
    useRecordContext,
} from 'react-admin';

// Кастомная кнопка удаления
const CustomDeleteButton = ({ resource }) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();
    const refresh = useRefresh();
    const record = useRecordContext();

    const handleDelete = async (rowIndex) => {
        if (!rowIndex || isNaN(rowIndex)) {
            console.error('Invalid rowIndex:', rowIndex);
            return;
        }
    
        try {
            console.log(`Attempting to delete row with index: ${rowIndex}`);
    
            const response = await fetch(`http://localhost:3001/marynau-inactive/delete/${rowIndex}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete row with index: ${rowIndex}`);
            }
    
            console.log(`Row ${rowIndex} deleted successfully`);
            notify('Row deleted successfully', { type: 'success' });
        } catch (error) {
            console.error(`Error deleting row with index ${rowIndex}:`, error.message);
            notify(`Error deleting row: ${error.message}`, { type: 'error' });
        }
    };
    
};
const handleDeleteMany = async (ids) => {
    console.log('Deleting records with IDs:', ids);
    try {
        const response = await fetch(`http://localhost:3001/${resource}/deleteMany`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids }),
        });

        if (!response.ok) {
            throw new Error(`Failed to delete records: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Response from server:', result);
        notify('Records deleted successfully', { type: 'success' });
        refresh(); // Перезагрузка данных
    } catch (error) {
        console.error('Error deleting records:', error.message);
        notify(`Error deleting records: ${error.message}`, { type: 'error' });
    }
};


// Основная форма
const CustomForm = ({ resource }) => {
    const [formData, setFormData] = useState({
        ID: '',
        "Sales manager": '',
        "Name of client": '',
        "Manger name": '',
        "Collection status": '',
        "Date till DNC": '',
        "Reason DNC": '',
        "Company name": '',
        "Short Useful Info": '',
        "Total contract amount": '',
        "Current balance": '',
        "Payment schedule changed?": '',
        ...[...Array(12)].reduce((acc, _, i) => {
            acc[`plan amount${i + 1}`] = '';
            acc[`plan date${i + 1}`] = '';
            acc[`fact amount${i + 1}`] = '';
            acc[`fact date${i + 1}`] = '';
            return acc;
        }, {}),
    });

    const notify = useNotify();
    const dataProvider = useDataProvider();
    const refresh = useRefresh();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!resource) {
            notify('Error: Resource is undefined', { type: 'error' });
            return;
        }

        try {
            console.log(`Submitting form data to resource: ${resource}`);
            await dataProvider.create(resource, { data: formData });
            notify(`Record successfully added to ${resource}!`, { type: 'success' });
            refresh(); // Обновляем данные
        } catch (error) {
            console.error(`Error creating record for resource ${resource}:`, error);
            notify(`Error creating record: ${error.message}`, { type: 'error' });
        }
    };

    return (
        <SimpleForm toolbar={<Toolbar><SaveButton onClick={handleSubmit} /></Toolbar>}>
            <NumberInput source="ID" name="ID" label="ID" value={formData.ID} onChange={handleChange} />
            <TextInput source="Sales manager" name="Sales manager" label="Sales Manager" value={formData["Sales manager"]} onChange={handleChange} />
            <TextInput source="Name of client" name="Name of client" label="Client Name" value={formData["Name of client"]} onChange={handleChange} />
            <TextInput source="Manger name" name="Manger name" label="Manager Name" value={formData["Manger name"]} onChange={handleChange} />
            <TextInput source="Collection status" name="Collection status" label="Collection Status" value={formData["Collection status"]} onChange={handleChange} />
            <TextInput source="Date till DNC" name="Date till DNC" label="Date till DNC" value={formData["Date till DNC"]} onChange={handleChange} />
            <TextInput source="Reason DNC" name="Reason DNC" label="Reason DNC" value={formData["Reason DNC"]} onChange={handleChange} />
            <TextInput source="Company name" name="Company name" label="Company Name" value={formData["Company name"]} onChange={handleChange} />
            <TextInput source="Short Useful Info" name="Short Useful Info" label="Short Useful Info" value={formData["Short Useful Info"]} onChange={handleChange} />
            <NumberInput source="Total contract amount" name="Total contract amount" label="Total Contract Amount" value={formData["Total contract amount"]} onChange={handleChange} />
            <NumberInput source="Current balance" name="Current balance" label="Current Balance" value={formData["Current balance"]} onChange={handleChange} />
            <TextInput source="Payment schedule changed?" name="Payment schedule changed?" label="Payment Schedule Changed?" value={formData["Payment schedule changed?"]} onChange={handleChange} />
            {[...Array(12)].map((_, i) => (
                <React.Fragment key={i}>
                    <NumberInput source={`plan amount${i + 1}`} name={`plan amount${i + 1}`} label={`Plan Amount ${i + 1}`} value={formData[`plan amount${i + 1}`]} onChange={handleChange} />
                    <TextInput source={`plan date${i + 1}`} name={`plan date${i + 1}`} label={`Plan Date ${i + 1}`} value={formData[`plan date${i + 1}`]} onChange={handleChange} />
                    <NumberInput source={`fact amount${i + 1}`} name={`fact amount${i + 1}`} label={`Fact Amount ${i + 1}`} value={formData[`fact amount${i + 1}`]} onChange={handleChange} />
                    <TextInput source={`fact date${i + 1}`} name={`fact date${i + 1}`} label={`Fact Date ${i + 1}`} value={formData[`fact date${i + 1}`]} onChange={handleChange} />
                </React.Fragment>
            ))}
        </SimpleForm>
    );
};

export { CustomDeleteButton, CustomForm };
