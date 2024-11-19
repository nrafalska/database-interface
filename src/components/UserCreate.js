import React, { useState } from 'react';
import { SimpleForm, TextInput, NumberInput } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { Toolbar, SaveButton } from 'react-admin'; // Импортируем Toolbar и SaveButton
const UserCreate = ({ basePath }) => {
  const [formData, setFormData] = useState({
    id: '',                       // Уникальный идентификатор
    salesManager: '',                // Менеджер по продажам
    nameOfClient: '',                // Имя клиента
    collectionStatus: '',            // Статус коллекции
    dateTillDNC: '',                 // Дата до DNC
    reasonForDNC: '',                // Причина DNC
    companyName: '',                 // Название компании
    shortUsefulInfo: '',             // Краткая полезная информация
    totalContractAmount: '',         // Общая сумма контракта
    currentBalance: '',              // Текущий баланс
    paymentScheduleChanged: '',      // Изменено ли расписание платежей?
    planDate1: '',                   // Плановая дата 1
    planAmount1: '',                 // Плановая сумма 1
    factAmount1: '',                 // Фактическая сумма 1
    factDate1: '',                   // Фактическая дата 1
    planDate2: '',                   // Плановая дата 2
    planAmount2: '',                 // Плановая сумма 2
    factAmount2: '',                 // Фактическая сумма 2
    factDate2: '',                   // Фактическая дата 2
    planDate3: '',                   // Плановая дата 3
    planAmount3: '',                 // Плановая сумма 3
    factAmount3: '',                 // Фактическая сумма 3
    factDate3: '',                   // Фактическая дата 3
    planDate4: '',                   // Плановая дата 4
    planAmount4: '',                 // Плановая сумма 4
    factAmount4: '',                 // Фактическая сумма 4
    factDate4: '',                   // Фактическая дата 4
    planDate5: '',                   // Плановая дата 5
    planAmount5: '',                 // Плановая сумма 5
    factAmount5: '',                 // Фактическая сумма 5
    factDate5: '',                   // Фактическая дата 5
    planDate6: '',                   // Плановая дата 6
    planAmount6: '',                 // Плановая сумма 6
    factAmount6: '',                 // Фактическая сумма 6
    factDate6: '',                   // Фактическая дата 6
    planDate7: '',                   // Плановая дата 7
    planAmount7: '',                 // Плановая сумма 7
    factAmount7: '',                 // Фактическая сумма 7
    factDate7: '',                   // Фактическая дата 7
    planDate8: '',                   // Плановая дата 8
    planAmount8: '',                 // Плановая сумма 8
    factAmount8: '',                 // Фактическая сумма 8
    factDate8: '',                   // Фактическая дата 8
    planDate9: '',                   // Плановая дата 9
    planAmount9: '',                 // Плановая сумма 9
    factAmount9: '',                 // Фактическая сумма 9
    factDate9: '',                   // Фактическая дата 9
    planDate10: '',                  // Плановая дата 10
    planAmount10: '',                // Плановая сумма 10
    factAmount10: '',                // Фактическая сумма 10
    factDate10: ''                   // Фактическая дата 10
}
);

  
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log('Submitting form...'); // Лог для проверки
    try {
      const response = await fetch('http://localhost:3001/marynau-inactive/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create record');
      }

      console.log('Data successfully added to Google Sheets');
      navigate(basePath); // Перенаправление после успешного сохранения
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const CustomToolbar = () => (
    <Toolbar>
      <SaveButton onClick={handleSubmit} />

    </Toolbar>
  );

  return (
    <SimpleForm toolbar={<CustomToolbar />}>
      <NumberInput
        source="id"
        label="ID"
        value={formData.id}
        onChange={handleChange}
      />
      <TextInput
        source="salesManager"
        name="salesManager"
        label="Sales Manager"
        value={formData.salesManager}
        onChange={handleChange}
      />
      <TextInput
        source="nameOfClient"
        name="nameOfClient"
        label="Client Name"
        value={formData.nameOfClient}
        onChange={handleChange}
      />
      <TextInput
        source="collectionStatus"
        name="collectionStatus"
        label="Collection Status"
        value={formData.collectionStatus}
        onChange={handleChange}
      />
      <TextInput
        source="dateTillDNC"
        name="dateTillDNC"
        label="Date till DNC"
        value={formData.dateTillDNC}
        onChange={handleChange}
      />
      <TextInput
        source="reasonForDNC"
        name="reasonForDNC"
        label="Reason for DNC"
        value={formData.reasonForDNC}
        onChange={handleChange}
      />
      <TextInput
        source="companyName"
        name="companyName"
        label="Company Name"
        value={formData.companyName}
        onChange={handleChange}
      />
      <TextInput
        source="shortUsefulInfo"
        name="shortUsefulInfo"
        label="Short Useful Info"
        value={formData.shortUsefulInfo}
        onChange={handleChange}
      />
      <NumberInput
        source="totalContractAmount"
        name="totalContractAmount"
        label="Total Contract Amount"
        value={formData.totalContractAmount}
        onChange={handleChange}
      />
      <NumberInput
        source="currentBalance"
        name="currentBalance"
        label="Current Balance"
        value={formData.currentBalance}
        onChange={handleChange}
      />
      <TextInput
        source="paymentScheduleChanged"
        name="paymentScheduleChanged"
        label="Payment Schedule Changed?"
        value={formData.paymentScheduleChanged}
        onChange={handleChange}
      />
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <TextInput
            source={`planDate${i + 1}`}
            name={`planDate${i + 1}`}
            label={`Planned Date ${i + 1}`}
            value={formData[`planDate${i + 1}`]}
            onChange={handleChange}
          />
          <NumberInput
            source={`planAmount${i + 1}`}
            name={`planAmount${i + 1}`}
            label={`Planned Amount ${i + 1}`}
            value={formData[`planAmount${i + 1}`]}
            onChange={handleChange}
          />
          <NumberInput
            source={`factAmount${i + 1}`}
            name={`factAmount${i + 1}`}
            label={`Actual Amount ${i + 1}`}
            value={formData[`factAmount${i + 1}`]}
            onChange={handleChange}
          />
          <TextInput
            source={`factDate${i + 1}`}
            name={`factDate${i + 1}`}
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