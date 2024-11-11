// src/UserCreate.js
import * as React from 'react';
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Client Name" />
            <TextInput source="salesManager" label="Sales Manager" />
            <TextInput source="managerName" label="Manager Name" />
            <TextInput source="collectionStatus" label="Collection Status" />
            <TextInput source="dateTillDNC" label="Date Till DNC" />
            <TextInput source="reasonDNC" label="Reason for DNC" />
            <TextInput source="companyName" label="Company" />
            <TextInput source="shortUsefulInfo" label="Short Useful Info" />
            <NumberInput source="totalContractAmount" label="Total Contract Amount" />
            <NumberInput source="currentBalance" label="Current Balance" />
            <TextInput source="paymentScheduleChanged" label="Payment Schedule Changed?" />

            {/* Payment dates and amounts for each of the 10 payments */}
            {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                    <TextInput source={`planDate${i + 1}`} label={`Planned Date ${i + 1}`} />
                    <NumberInput source={`planAmount${i + 1}`} label={`Planned Amount ${i + 1}`} />
                    <NumberInput source={`factAmount${i + 1}`} label={`Actual Amount ${i + 1}`} />
                    <TextInput source={`factDate${i + 1}`} label={`Actual Date ${i + 1}`} />
                </React.Fragment>
            ))}
        </SimpleForm>
    </Create>
);

export default UserCreate;
