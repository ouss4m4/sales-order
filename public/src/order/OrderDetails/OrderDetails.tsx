import React from 'react';
import { IOrder } from '../typings';

interface Props {
  order: IOrder;
}

const OrderDetails = ({ order }: Props) => {
  const renderRows = () => {
    return order.orderLines.map((line, i) => (
      <tr key={line.lineId}>
        <td>{i + 1}</td>
        <td>{line.itemName}</td>
        <td>{line.description}</td>
        <td>{line.quantity}</td>
      </tr>
    ));
  };
  return (
    <div>
      {/* Order Header */}
      <div>
        <p>{order.cardName}</p>
        <p>{order.docDate}</p>
        <p>{order.docDueDate}</p>
        <p>{order.shippingAddress}</p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
