import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="ID" label="ID" disabled /> {/* Поле ID не редактируемое */}
            <TextInput source="Sales manager" label="Sales Manager" />
            <TextInput source="Name of client" label="Name of Client" />
            <TextInput source="Manger name" label="Manager Name" />
            <TextInput source="Collection status" label="Collection Status" />
            <TextInput source="Date till DNC" label="Date till DNC" />
            <TextInput source="Reason DNC" label="Reason DNC" />
            <TextInput source="Company name" label="Company Name" />
            <TextInput source="Short Useful Info" label="Short Useful Info" />
            <NumberInput source="Total contract amount" label="Total Contract Amount" />
            <NumberInput source="Current balance" label="Current Balance" />
            <TextInput source="Payment schedule changed?" label="Payment Schedule Changed?" />

            {[...Array(12)].map((_, i) => (
                <React.Fragment key={i}>
                    <TextInput source={`plan amount${i + 1}`} label={`Plan Amount ${i + 1}`} />
                    <TextInput source={`plan date${i + 1}`} label={`Plan Date ${i + 1}`} />
                    <TextInput source={`fact amount${i + 1}`} label={`Fact Amount ${i + 1}`} />
                    <TextInput source={`fact date${i + 1}`} label={`Fact Date ${i + 1}`} />
                </React.Fragment>
            ))}
        </SimpleForm>
    </Edit>
);

export default UserEdit;
