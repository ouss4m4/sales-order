import { Card } from '@mui/material';
import React from 'react';
import { formatDate } from '../../../shared/dateHelper';
import { IOrderHeader } from '../../typings';
import avatar from './avatar.png';
import './order-header.css';
interface Props {
  header: IOrderHeader;
}

const OrderHeader = ({ header }: Props) => {
  const { cardName, shippingAddress, docDate, docDueDate } = header;
  return (
    <Card>
      <div className="order-header-wrap">
        <div className="client-info">
          <div className="avatar-wrap">
            <img src={avatar} alt="avatar" className="avatar" />
          </div>
          <div className="bio">
            <p>{cardName}</p>
            <p>{shippingAddress}</p>
            <p>+123456789</p>
          </div>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <label>Doc Date </label>
            <p>{formatDate(docDate)}</p>
          </div>
          <div>
            <label> Doc Due Date </label>
            <input
              type="date"
              defaultValue={new Date(docDueDate).toJSON().substr(0, 10)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderHeader;
