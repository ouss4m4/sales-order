import React from 'react';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderLines from './OrderLines/OrderLines';
import { IOrder } from '../typings';

interface Props {
  order: IOrder;
}

const OrderDetails = ({ order }: Props) => {
  return (
    <div>
      <OrderHeader header={order} />
      <OrderLines lines={order.orderLines} />
    </div>
  );
};

export default OrderDetails;
