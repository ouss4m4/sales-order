import { Button } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderApi } from '../api/order';
import OrdersList from './OrdersList/OrdersList';
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
  return (
    <div>
      <Link to="orders/new">
        <Button variant="outlined">New Order</Button>
      </Link>
      <OrdersList Orders={list} />
    </div>
  );
}
