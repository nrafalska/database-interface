import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
        <TextInput source="id" label="ID" /> {/* Поле ID, тепер доступне для редагування */}
            <TextInput source="salesManager" label="Sales Manager" />
            <TextInput source="nameOfClient" label="Name of Client" />
            <TextInput source="managerName" label="Manager Name" />
            <TextInput source="collectionStatus" label="Collection Status" />
            <TextInput source="dateTillDNC" label="Date till DNC" />
            <TextInput source="reasonDNC" label="Reason DNC" />
            <TextInput source="companyName" label="Company Name" />
            <TextInput source="shortUsefulInfo" label="Short Useful Info" />
            <NumberInput source="totalContractAmount" label="Total Contract Amount" />
            <NumberInput source="currentBalance" label="Current Balance" />
            <TextInput source="paymentScheduleChanged" label="Payment Schedule Changed?" />
            {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                    <TextInput source={`planDate${i + 1}`} label={`Planned Date ${i + 1}`} />
                    <NumberInput source={`planAmount${i + 1}`} label={`Planned Amount ${i + 1}`} />
                    <NumberInput source={`factAmount${i + 1}`} label={`Actual Amount ${i + 1}`} />
                    <TextInput source={`factDate${i + 1}`} label={`Actual Date ${i + 1}`} />
                </React.Fragment>
            ))}
        </SimpleForm>
    </Edit>
);

export default UserEdit;
