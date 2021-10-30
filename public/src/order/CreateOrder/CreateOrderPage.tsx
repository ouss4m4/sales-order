import React, { useState } from 'react';

import { IClient } from '../../client/typings';
import { IItem } from '../../item/typing/IItem';
import OrderHeader from '../OrderDetails/OrderHeader/OrderHeader';
import ClientPicker from '../../shared/components/ClientPicker';
import { IOrderHeader, IOrderLine } from '../typings';
import OrderLines from '../OrderDetails/OrderLines/OrderLines';
import LinePicker from './LinePicker/LinePicker';
import { Button, Container, Typography } from '@mui/material';
import { orderApi } from '../../api/order';
import { useHistory } from 'react-router';

interface Props {}

const CreateOrderPage = (props: Props) => {
  const [client, setClient] = useState<IClient>();
  const [header, setHeader] = useState<IOrderHeader>();
  const [lines, setLines] = useState<IOrderLine[]>([]);
  const history = useHistory();
  const onClientSelected = (client: IClient) => {
    const emptyHeader: IOrderHeader = {
      ...client,
      cardCode: client.cardCode as number,
      docDate: new Date().toString(),
      docDueDate: new Date().toString(),
    };
    setClient(client);
    setHeader(emptyHeader);
  };

  const addLineToOrder = (item: IItem, qty: number) => {
    const newLine: IOrderLine = {
      itemCode: item.itemCode as number,
      itemName: item.itemName,
      description: item.description,
      quantity: qty,
    };
    setLines(lines.concat(newLine));
  };

  const createOrder = async () => {
    if (!header) {
      return;
    }
    const order: any = {
      billingAddress: header.billingAddress,
      shippingAddress: header.shippingAddress,
      cardCode: header.cardCode,
      cardName: header.cardName,
      orderLines: lines.filter((l) => l.quantity > 0),
    };
    await orderApi.addOrder(order);
    history.push('/orders');
  };
  return (
    <>
      <div>
        <Typography component="h1" variant="h5" textAlign="center">
          Create Order
        </Typography>
        {!client && (
          <Typography component="h1" variant="h5" textAlign="center">
            Please select a client first
          </Typography>
        )}
        {!client && <ClientPicker clientSelected={onClientSelected} />}
        {header && (
          <Container>
            <OrderHeader header={header} />
            <OrderLines lines={lines}>
              <LinePicker onQtySubmit={addLineToOrder} />
            </OrderLines>
            <Button variant="outlined" color="success" onClick={createOrder}>
              Save
            </Button>
          </Container>
        )}
      </div>
    </>
  );
};

export default CreateOrderPage;
