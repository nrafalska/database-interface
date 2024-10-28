// src/Table.js
import React from 'react';

const Table = ({ data }) => {
  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>Number</th>
          <th>Sales Manager</th>
          <th>Client Name</th>
          <th>Current Balance</th>
          {/* Добавьте больше заголовков, если нужно */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.number}</td>
            <td>{item.sales_manager}</td>
            <td>{item.name_of_client}</td>
            <td>{item.currentBalance}</td>
            {/* Добавьте больше ячеек, если нужно */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
