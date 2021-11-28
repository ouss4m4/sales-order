import { Container } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { clientApi } from '../api/client';
import { IRole } from '../login/Typings';
import { authService } from '../shared/authservice';
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
  const authorized = authService.isUserAuthorizedByRole(IRole.Admin);

  return (
    <Container maxWidth="lg">
      {authorized && <AddClient onClientAdded={addClient} />}
      <ClientsList clients={list} />
    </Container>
  );
}
