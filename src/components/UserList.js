import React from 'react';
import { List, Datagrid, TextField, EditButton} from 'react-admin';

const UserList = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="ID" label="ID" />
            <TextField source="Sales manager" label="Sales Manager" />
            <TextField source="Name of client" label="Name of Client" />
            <TextField source="Manger name" label="Manager Name" />
            <TextField source="Collection status" label="Collection Status" />
            <TextField source="Date till DNC" label="Date till DNC" />
            <TextField source="Reason DNC" label="Reason DNC" />
            <TextField source="Company name" label="Company Name" />
            <TextField source="Short Useful Info" label="Short Useful Info" />
            <TextField source="Total contract amount" label="Total Contract Amount" />
            <TextField source="Current balance" label="Current Balance" />
            <TextField source="Payment schedule changed?" label="Payment Schedule Changed?" />
            <TextField source="plan amount1" label="Plan Amount 1" />
            <TextField source="plan date1" label="Plan Date 1" />
            <TextField source="fact amount1" label="Fact Amount 1" />
            <TextField source="fact date1" label="Fact Date 1" />

            <TextField source="plan amount2" label="Plan Amount 2" />
            <TextField source="plan date2" label="Plan Date 2" />
            <TextField source="fact amount2" label="Fact Amount 2" />
            <TextField source="fact date2" label="Fact Date 2" />

            <TextField source="plan amount3" label="Plan Amount 3" />
            <TextField source="plan date3" label="Plan Date 3" />
            <TextField source="fact amount3" label="Fact Amount 3" />
            <TextField source="fact date3" label="Fact Date 3" />

            <TextField source="plan amount4" label="Plan Amount 4" />
            <TextField source="plan date4" label="Plan Date 4" />
            <TextField source="fact amount4" label="Fact Amount 4" />
            <TextField source="fact date4" label="Fact Date 4" />

            <TextField source="plan amount5" label="Plan Amount 5" />
            <TextField source="plan date5" label="Plan Date 5" />
            <TextField source="fact amount5" label="Fact Amount 5" />
            <TextField source="fact date5" label="Fact Date 5" />

            <TextField source="plan amount6" label="Plan Amount 6" />
            <TextField source="plan date6" label="Plan Date 6" />
            <TextField source="fact amount6" label="Fact Amount 6" />
            <TextField source="fact date6" label="Fact Date 6" />

            <TextField source="plan amount7" label="Plan Amount 7" />
            <TextField source="plan date7" label="Plan Date 7" />
            <TextField source="fact amount7" label="Fact Amount 7" />
            <TextField source="fact date7" label="Fact Date 7" />

            <TextField source="plan amount8" label="Plan Amount 8" />
            <TextField source="plan date8" label="Plan Date 8" />
            <TextField source="fact amount8" label="Fact Amount 8" />
            <TextField source="fact date8" label="Fact Date 8" />

            <TextField source="plan amount9" label="Plan Amount 9" />
            <TextField source="plan date9" label="Plan Date 9" />
            <TextField source="fact amount9" label="Fact Amount 9" />
            <TextField source="fact date9" label="Fact Date 9" />

            <TextField source="plan amount10" label="Plan Amount 10" />
            <TextField source="plan date10" label="Plan Date 10" />
            <TextField source="fact amount10" label="Fact Amount 10" />
            <TextField source="fact date10" label="Fact Date 10" />

            <EditButton label="Edit" />
           
            
        </Datagrid>
    </List>
);

export default UserList;
