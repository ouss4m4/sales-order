import React, { useEffect, useState } from 'react';
import { clientApi } from '../../api/client';
import { IClient } from '../../client/typings';
import AutoComp from './autocomplete';

interface Props {
  clientSelected: (client: IClient) => void;
}

const ClientPicker = ({ clientSelected }: Props) => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [chunk, setChunk] = useState('');
  const getClients = async (val: string) => {
    const list = await clientApi.getClients();
    setClients(list);
  };
  useEffect(() => {
    getClients(chunk);
  }, [chunk]);

  const inputChange = (val: string) => {
    if (val === '') {
      setClients([]);
      return;
    }
    setChunk(val);
  };

  return (
    <>
      <AutoComp
        onOptionSelected={clientSelected}
        onInputChange={inputChange}
        showByKey={'cardName'}
        label={'Client'}
        options={clients}
      />
    </>
  );
};

export default ClientPicker;
