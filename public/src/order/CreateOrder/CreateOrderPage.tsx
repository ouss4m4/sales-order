import React from 'react';
import { IClient } from '../../client/typings';
import { IItem } from '../../item/typing/IItem';
import ClientPicker from '../../shared/components/ClientPicker';
import ItemPicker from '../../shared/components/ItemPicker';

interface Props {}

const CreateOrderPage = (props: Props) => {
  const onClientSelected = (client: IClient) => {
    console.log(client);
  };

  const onItemSelected = (item: IItem) => {
    console.log(item);
  };
  return (
    <>
      <h1>Create Order</h1>
      <ClientPicker clientSelected={onClientSelected} />
      <ItemPicker itemSelected={onItemSelected} />
    </>
  );
};

export default CreateOrderPage;
