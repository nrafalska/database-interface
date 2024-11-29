import React, { useState } from 'react';
import { SimpleForm, TextInput, NumberInput, Toolbar, SaveButton, useNotify, useResourceContext } from 'react-admin';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
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

    const navigate = useNavigate();
    const resource = useResourceContext(); // Получаем текущий ресурс
    const notify = useNotify();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resource) {
            notify('Error: Resource is undefined', { type: 'error' });
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/${resource}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create record');
            }

            notify(`Record successfully added to ${resource}!`, { type: 'success' });
            navigate(`/${resource}`); // Перенаправляем обратно на страницу ресурса
        } catch (error) {
            console.error(`Error during form submission for resource: ${resource}`, error.message);
            notify(`Error creating record for ${resource}: ${error.message}`, { type: 'error' });
        }
    };

    const CustomToolbar = () => (
        <Toolbar>
            <SaveButton onClick={handleSubmit} />
        </Toolbar>
    );

    return (
        <form onSubmit={handleSubmit}>
            <SimpleForm toolbar={<CustomToolbar />}>
                <NumberInput source="ID" name="ID" label="ID" value={formData.ID} onChange={handleChange} />
                <TextInput
                    source="Sales manager"
                    name="Sales manager"
                    label="Sales Manager"
                    value={formData["Sales manager"]}
                    onChange={handleChange}
                />
                <TextInput
                    source="Name of client"
                    name="Name of client"
                    label="Client Name"
                    value={formData["Name of client"]}
                    onChange={handleChange}
                />
                <TextInput
                    source="Manger name"
                    name="Manger name"
                    label="Manager Name"
                    value={formData["Manger name"]}
                    onChange={handleChange}
                />
                <TextInput
                    source="Collection status"
                    name="Collection status"
                    label="Collection Status"
                    value={formData["Collection status"]}
                    onChange={handleChange}
                />
                <TextInput
                    source="Date till DNC"
                    name="Date till DNC"
                    label="Date till DNC"
                    value={formData["Date till DNC"]}
                    onChange={handleChange}
                />
                <TextInput
                    source="Reason DNC"
                    name="Reason DNC"
                    label="Reason DNC"
                    value={formData["Reason DNC"]}
                    onChange={handleChange}
                />
                <TextInput
                    source="Company name"
                    name="Company name"
                    label="Company Name"
                    value={formData["Company name"]}
                    onChange={handleChange}
                />
                <TextInput
                    source="Short Useful Info"
                    name="Short Useful Info"
                    label="Short Useful Info"
                    value={formData["Short Useful Info"]}
                    onChange={handleChange}
                />
                <NumberInput
                    source="Total contract amount"
                    name="Total contract amount"
                    label="Total Contract Amount"
                    value={formData["Total contract amount"]}
                    onChange={handleChange}
                />
                <NumberInput
                    source="Current balance"
                    name="Current balance"
                    label="Current Balance"
                    value={formData["Current balance"]}
                    onChange={handleChange}
                />
                <TextInput
                    source="Payment schedule changed?"
                    name="Payment schedule changed?"
                    label="Payment Schedule Changed?"
                    value={formData["Payment schedule changed?"]}
                    onChange={handleChange}
                />
                {[...Array(12)].map((_, i) => (
                    <React.Fragment key={i}>
                        <NumberInput
                            source={`plan amount${i + 1}`}
                            name={`plan amount${i + 1}`}
                            label={`Plan Amount ${i + 1}`}
                            value={formData[`plan amount${i + 1}`]}
                            onChange={handleChange}
                        />
                        <TextInput
                            source={`plan date${i + 1}`}
                            name={`plan date${i + 1}`}
                            label={`Plan Date ${i + 1}`}
                            value={formData[`plan date${i + 1}`]}
                            onChange={handleChange}
                        />
                        <NumberInput
                            source={`fact amount${i + 1}`}
                            name={`fact amount${i + 1}`}
                            label={`Fact Amount ${i + 1}`}
                            value={formData[`fact amount${i + 1}`]}
                            onChange={handleChange}
                        />
                        <TextInput
                            source={`fact date${i + 1}`}
                            name={`fact date${i + 1}`}
                            label={`Fact Date ${i + 1}`}
                            value={formData[`fact date${i + 1}`]}
                            onChange={handleChange}
                        />
                    </React.Fragment>
                ))}
            </SimpleForm>
        </form>
    );
};

export default UserCreate;
