import React from 'react';
import { IClient } from '../typings';
import ClientRow from './ClientRow';

interface Props {
  clients: IClient[];
}

const ClientsList = ({ clients }: Props) => {
  const renderRows = (clients: IClient[]) => {
    return clients.map((client) => (
      <ClientRow client={client} key={client.cardCode} />
    ));
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>cardCode</th>
            <th>cardName</th>
            <th>Shipping Address</th>
            <th>Billing Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>{renderRows(clients)}</tbody>
      </table>
    </>
  );
};

export default ClientsList;
