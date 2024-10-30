import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Table = ({ data }) => {
  const [tableData, setTableData] = useState(data);

  // Функция для обновления данных на сервере
  const updateDataOnServer = async (updatedRow) => {
    try {
      // Здесь предполагается, что у каждой записи есть уникальный id
      await axios.put(`http://localhost:3001/data/${updatedRow.id}`, updatedRow);
      toast.success("Данные успешно обновлены");
    } catch (error) {
      toast.error("Ошибка обновления данных");
      console.error("Error updating data:", error);
    }
  };

  // Обработчик изменения данных ячейки
  const handleBlur = (event, index, field) => {
    const updatedData = [...tableData];
    updatedData[index] = { ...updatedData[index], [field]: event.target.innerText };
    setTableData(updatedData);
    updateDataOnServer(updatedData[index]);
  };

  // Вспомогательный компонент для создания редактируемой ячейки
  const EditableCell = ({ value, index, field }) => (
    <TableCell contentEditable onBlur={(event) => handleBlur(event, index, field)}>
      {value}
    </TableCell>
  );

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Sales Manager</TableCell>
            <TableCell>Name of Client</TableCell>
            <TableCell>Manager Name</TableCell>
            <TableCell>Collection Status</TableCell>
            <TableCell>Date Till DNC</TableCell>
            <TableCell>Reason DNC</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Short Useful Info</TableCell>
            <TableCell>Total Contract Amount</TableCell>
            <TableCell>Current Balance</TableCell>
            <TableCell>Payment Schedule Changed?</TableCell>
            <TableCell>Payment 1 Plan Date</TableCell>
            <TableCell>Payment 1 Plan Amount</TableCell>
            <TableCell>Payment 1 Fact Amount</TableCell>
            <TableCell>Payment 1 Fact Date</TableCell>
            {/* Добавьте остальные заголовки аналогично */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item, index) => (
            <TableRow key={item.id || index}>
              <TableCell>{item.number}</TableCell>
              <EditableCell value={item.salesManager} index={index} field="salesManager" />
              <EditableCell value={item.nameOfClient} index={index} field="nameOfClient" />
              <EditableCell value={item.managerName} index={index} field="managerName" />
              <EditableCell value={item.collectionStatus} index={index} field="collectionStatus" />
              <EditableCell value={item.dateTillDNC} index={index} field="dateTillDNC" />
              <EditableCell value={item.reasonDNC} index={index} field="reasonDNC" />
              <EditableCell value={item.companyName} index={index} field="companyName" />
              <EditableCell value={item.shortUsefulInfo} index={index} field="shortUsefulInfo" />
              <EditableCell value={item.totalContractAmount} index={index} field="totalContractAmount" />
              <EditableCell value={item.currentBalance} index={index} field="currentBalance" />
              <EditableCell value={item.paymentScheduleChanged} index={index} field="paymentScheduleChanged" />

              {/* Добавляем ячейки для каждого платежа */}
              {Array.from({ length: 10 }).map((_, i) => (
                <React.Fragment key={i}>
                  <EditableCell value={item[`payment${i + 1}PlanDate`]} index={index} field={`payment${i + 1}PlanDate`} />
                  <EditableCell value={item[`payment${i + 1}PlanAmount`]} index={index} field={`payment${i + 1}PlanAmount`} />
                  <EditableCell value={item[`payment${i + 1}FactAmount`]} index={index} field={`payment${i + 1}FactAmount`} />
                  <EditableCell value={item[`payment${i + 1}FactDate`]} index={index} field={`payment${i + 1}FactDate`} />
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
