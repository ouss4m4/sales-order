import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { clientApi } from '../../api/client';
import { IClient } from '../typings';
import ClientDetails from './ClientDetails';

const ClientDetailsPage = () => {
  const { cardcode } = useParams<{ cardcode: string }>();
  const [client, setClient] = useState<IClient>();
  const [loading, setLoading] = useState<string>();

  useEffect(() => {
    fetchClientDetails(parseInt(cardcode));
  }, [cardcode]);

  const fetchClientDetails = async (cardcode: number) => {
    try {
      setLoading('loading ...');
      const details = await clientApi.getClientById(cardcode);
      setClient(details);
      setLoading('');
    } catch (error: any) {
      setLoading(error.message);
    }
  };

  const editClientDetails = async (client: IClient): Promise<boolean> => {
    try {
      await clientApi.editCLient(client);
      setClient(client);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      {client && (
        <ClientDetails client={client} onEditClient={editClientDetails} />
      )}
      <p>{loading}</p>
    </>
  );
};

export default ClientDetailsPage;
