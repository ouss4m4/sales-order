import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderApi } from '../../api/order';
import { IOrder } from '../typings';
import OrderDetails from './OrderDetails';

interface Props {}

const OrderDetailsPage = (props: Props) => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<IOrder>();
  const [loading, setLoading] = useState<string>();

  useEffect(() => {
    fetchOrderDetails(parseInt(orderId));
  }, [orderId]);

  const fetchOrderDetails = async (orderId: number) => {
    try {
      setLoading('loading ...');
      const details = await orderApi.getOrderById(orderId);
      setOrder(details);
      setLoading('');
    } catch (error: any) {
      setLoading(error.message);
    }
  };
  return (
    <>
      {order && <OrderDetails order={order} />}
      <p>{loading}</p>
    </>
  );
};

export default OrderDetailsPage;
