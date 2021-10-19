import { Card } from '@mui/material';
import React from 'react';
import { formatDate } from '../../shared/dateHelper';
import { IOrderHeader } from '../typings';

interface Props {
  header: IOrderHeader;
}

const OrderHeader = ({ header }: Props) => {
  const { cardName, billingAddress, shippingAddress, docDate, docDueDate } =
    header;
  return (
    <Card
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Client:</p>
        <strong style={{ marginLeft: '4px' }}>{cardName}</strong>
      </div>
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Billing Address:</p>
        <p>{billingAddress}</p>
      </div> */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Shipping Address:</p>
        <strong style={{ marginLeft: '4px' }}>{shippingAddress}</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Order Date:</p>
        <strong style={{ marginLeft: '4px' }}>{formatDate(docDate)}</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Order Due Date:</p>
        <strong style={{ marginLeft: '4px' }}>{formatDate(docDueDate)}</strong>
      </div>
    </Card>
  );
};

export default OrderHeader;
