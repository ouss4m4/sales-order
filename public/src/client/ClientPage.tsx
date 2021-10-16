import React, { ReactElement, useEffect, useState } from 'react';
import { clientApi } from '../api/client';
import AddClient from './ClientsList/AddClient';
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

  const addClient = async (client: IClient): Promise<void> => {
    await clientApi.addClient(client);
    fetchClients();
  };

  return (
    <div>
      <AddClient onClientAdded={addClient} />
      <ClientsList clients={list} />
    </div>
  );
}
