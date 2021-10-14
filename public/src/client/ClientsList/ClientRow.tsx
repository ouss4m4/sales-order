import React from 'react';
import { Link } from 'react-router-dom';
import { IClient } from '../typings';

interface Props {
  client: IClient;
}

const ClientRow = ({ client }: Props) => {
  return (
    <tr>
      <td>{client.cardCode}</td>
      <td>{client.cardName}</td>
      <td>{client.billingAddress}</td>
      <td>{client.shippingAddress}</td>
      <td>{client.phoneNumber}</td>
      <td>
        <Link to={`/clients/${client.cardCode}`}>{'>'}</Link>
      </td>
    </tr>
  );
};

export default ClientRow;
