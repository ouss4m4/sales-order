import React, { ReactElement, useEffect, useState } from 'react';
import { clientApi } from '../api/client';
import ClientsList from './ClientsList/ClientsList';
import { IClient } from './typings';

export default function ClientPage(): ReactElement {
  useEffect(() => {
    fetchClients();
  }, []);
  const [list, setList] = useState<IClient[]>([]);

  const fetchClients = async () => {
    const result = await clientApi.getClients();
    setList(result);
  };

  /* const addItem = async (client: IClient): Promise<void> => {
    await clientApi.addItem(client);
    fetchClients();
  }; */
  return (
    <div>
      <ClientsList clients={list} />
    </div>
  );
}
