import React from 'react';
import ClientPicker from '../../shared/components/ClientPicker';

interface Props {}

const CreateOrderPage = (props: Props) => {
  const onClientSelected = (opt: any) => {
    console.log(opt);
  };
  return (
    <>
      <h1>Create Order</h1>
      <ClientPicker clientSelected={onClientSelected} />
    </>
  );
};

export default CreateOrderPage;
