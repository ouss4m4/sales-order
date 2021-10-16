import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderApi } from '../api/order';
import { IOrderHeader } from './typings';

export default function OrderPage(): ReactElement {
  const [list, setList] = useState<IOrderHeader[]>([]);
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    const result = await orderApi.getOrders();
    setList(result);
  };
  const renderRows = () => {
    const formatDate = (raw: string): string => {
      const date = new Date(raw);
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
      }).format(date);
    };
    return list.map((or) => (
      <tr>
        <td>{or.orderId}</td>
        <td>{or.cardName}</td>
        <td>{formatDate(or.docDate)}</td>
        <td>{formatDate(or.docDueDate)}</td>
        <td>
          <Link to={`/orders/${or.orderId}`}>{'>'}</Link>
        </td>
      </tr>
    ));
  };
  return (
    <div>
      <button> New Order </button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Client</th>
            <th>Date</th>
            <th>Due Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
}
