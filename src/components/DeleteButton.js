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
    useRecordContext,
} from 'react-admin';

// Кастомная кнопка удаления
const CustomDeleteButton = ({ resource }) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();
    const record = useRecordContext(); // Получение текущей записи

    const handleDelete = async () => {
        if (!record || !record.id) {
            notify('Record or Record ID not found', { type: 'warning' });
            return;
        }

        if (window.confirm(`Are you sure you want to delete record with ID ${record.id}?`)) {
            try {
                // Логируем удаление
                console.log(`Attempting to delete record with ID: ${record.id} from resource: ${resource}`);

                await dataProvider.delete(resource, { id: record.id });
                notify('Record deleted successfully', { type: 'success' });
                redirect(`/${resource}`);
            } catch (error) {
                console.error(`Error deleting record with ID ${record.id}:`, error);
                notify(`Error deleting record: ${error.message}`, { type: 'error' });
            }
        }
    };

    return <Button label="Delete" onClick={handleDelete} />;
};

// Форма для редактирования/создания записей
const CustomForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        "ID": '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log('Submitted form data:', formData);
        if (onSubmit) onSubmit(formData);
    };

    return (
        <SimpleForm toolbar={<Toolbar><SaveButton onClick={handleSubmit} /></Toolbar>}>
            <NumberInput source="ID" name="ID" label="ID" value={formData.ID} onChange={handleChange} />
            <TextInput source="Sales manager" name="Sales manager" label="Sales Manager" value={formData["Sales manager"]} onChange={handleChange} />
            <TextInput source="Name of client" name="Name of client" label="Client Name" value={formData["Name of client"]} onChange={handleChange} />
            <TextInput source="Manger name" name="Manger name" label="Manager Name" value={formData["Manger name"]} onChange={handleChange} />
            <TextInput source="Collection status" name="Collection status" label="Collection Status" value={formData["Collection status"]} onChange={handleChange} />
            <TextInput source="Date till DNC" name="Date till DNC" label="Date till DNC" value={formData["Date till DNC"]} onChange={handleChange} />
            <TextInput source="Reason DNC" name="Reason DNC" label="Reason for DNC" value={formData["Reason DNC"]} onChange={handleChange} />
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
