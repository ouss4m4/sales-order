import React, { useEffect, useState } from 'react';
import { IClient } from '../../client/typings';
import AutoComp from './autocomplete';

interface Props {
  clientSelected: (client: IClient) => void;
}

const ClientPicker = (props: Props) => {
  const [clients, setClients] = useState([]);
  const [chunk, setChunk] = useState('');
  const getClients = (val: string) => {
    console.log('getting clients');
    setClients([]);
  };
  useEffect(() => {
    getClients(chunk);
  }, [chunk]);
  const optionSelected = (client: IClient) => {
    console.log('Client Picked success: ', client);
  };

  const inputChange = (val: string) => {
    setChunk(val);
  };

  return (
    <>
      <AutoComp
        onOptionSelected={optionSelected}
        onInputChange={inputChange}
        showByKey={'cardName'}
        label={'Client'}
        options={clients}
      />
    </>
  );
};

export default ClientPicker;
