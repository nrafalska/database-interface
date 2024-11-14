import React, { useState } from 'react';
import { SimpleForm, TextInput, NumberInput } from 'react-admin';
import { useNavigate } from 'react-router-dom';

const UserCreate = ({ basePath }) => {
  const [formData, setFormData] = useState({
    planDate1: '',
    planAmount1: '',
    factAmount1: '',
    factDate1: '',
    planDate2: '',
    planAmount2: '',
    factAmount2: '',
    factDate2: '',
    salesManager: '',
    clientName: '',
    managerName: '',
    collectionStatus: '',
    dateTillDNC: '',
    reasonDNC: '',
    companyName: '',
    shortUsefulInfo: '',
    totalContractAmount: '',
    currentBalance: '',
    paymentScheduleChanged: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Логирование данных перед отправкой
      console.log('Data being submitted:', formData);
      
      // Добавление данных в Google Sheets
      await addDataToGoogleSheet(formData);
      
      // Логирование успешной отправки
      console.log('Data successfully added to Google Sheets');
      navigate(basePath); // Перенаправление после успешного сохранения
    } catch (error) {
      // Логирование ошибки
      console.error('Error during form submission:', error);
    }
  };

  const addDataToGoogleSheet = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/marynau-inactive/create', {  // Ensure the correct endpoint here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add data to Google Sheets');
      }

      // Логирование успешной отправки на сервер
      console.log('Data successfully sent to the server');
    } catch (error) {
      console.error('Error adding data to Google Sheets:', error);
    }
  };

  return (
    <SimpleForm onSubmit={handleSubmit} redirect={basePath}>
      <TextInput
        source="salesManager"
        label="Sales Manager"
        value={formData.salesManager}
        onChange={handleChange}
      />
      <TextInput
        source="clientName"
        label="Client Name"
        value={formData.clientName}
        onChange={handleChange}
      />
      <TextInput
        source="managerName"
        label="Manager Name"
        value={formData.managerName}
        onChange={handleChange}
      />
      <TextInput
        source="collectionStatus"
        label="Collection Status"
        value={formData.collectionStatus}
        onChange={handleChange}
      />
      <TextInput
        source="dateTillDNC"
        label="Date till DNC"
        value={formData.dateTillDNC}
        onChange={handleChange}
      />
      <TextInput
        source="reasonDNC"
        label="Reason for DNC"
        value={formData.reasonDNC}
        onChange={handleChange}
      />
      <TextInput
        source="companyName"
        label="Company Name"
        value={formData.companyName}
        onChange={handleChange}
      />
      <TextInput
        source="shortUsefulInfo"
        label="Short Useful Info"
        value={formData.shortUsefulInfo}
        onChange={handleChange}
      />
      <NumberInput
        source="totalContractAmount"
        label="Total Contract Amount"
        value={formData.totalContractAmount}
        onChange={handleChange}
      />
      <NumberInput
        source="currentBalance"
        label="Current Balance"
        value={formData.currentBalance}
        onChange={handleChange}
      />
      <TextInput
        source="paymentScheduleChanged"
        label="Payment Schedule Changed?"
        value={formData.paymentScheduleChanged}
        onChange={handleChange}
      />
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <TextInput
            source={`planDate${i + 1}`}
            label={`Planned Date ${i + 1}`}
            value={formData[`planDate${i + 1}`]}
            onChange={handleChange}
          />
          <NumberInput
            source={`planAmount${i + 1}`}
            label={`Planned Amount ${i + 1}`}
            value={formData[`planAmount${i + 1}`]}
            onChange={handleChange}
          />
          <NumberInput
            source={`factAmount${i + 1}`}
            label={`Actual Amount ${i + 1}`}
            value={formData[`factAmount${i + 1}`]}
            onChange={handleChange}
          />
          <TextInput
            source={`factDate${i + 1}`}
            label={`Actual Date ${i + 1}`}
            value={formData[`factDate${i + 1}`]}
            onChange={handleChange}
          />
        </React.Fragment>
      ))}
    </SimpleForm>
  );
};

export default UserCreate;
