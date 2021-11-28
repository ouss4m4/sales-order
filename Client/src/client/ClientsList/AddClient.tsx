import React, { useState } from 'react';
import CSS from 'csstype';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';
import { IClient } from '../typings';

interface Props {
  onClientAdded: (client: IClient) => void;
}

const AddClient = ({ onClientAdded }: Props) => {
  const [dialogOpen, setDialog] = React.useState(false);
  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };
  const initialFormState = {
    cardName: '',
    shippingAddress: '',
    billingAddress: '',
    phoneNumber: '',
  };

  const [formState, setFormState] = useState(initialFormState);
  const handleInputChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let input = ev.target;
    setFormState({
      ...formState,
      [input.name]: input.value,
    });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const client: any = {
      cardName: formState.cardName,
      billingAddress: formState.billingAddress,
      shippingAddress: formState.shippingAddress,
      phoneNumber: formState.phoneNumber,
    };
    onClientAdded(client);
    setFormState(initialFormState);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Client
      </Button>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent style={{ minWidth: '450px' }}>
          <form
            onSubmit={(e) => onFormSubmit(e)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <TextField
              type="text"
              name="cardName"
              label="Name"
              onChange={(e) => handleInputChange(e)}
              value={formState.cardName}
              style={fieldStyle}
              required
            />

            <TextField
              type="text"
              name="shippingAddress"
              label="Shipping Address"
              onChange={(e) => handleInputChange(e)}
              value={formState.shippingAddress}
              style={fieldStyle}
              required
            />
            <TextField
              type="text"
              name="billingAddress"
              label="Billing Address"
              onChange={(e) => handleInputChange(e)}
              value={formState.billingAddress}
              style={fieldStyle}
              required
            />

            <TextField
              type="text"
              name="phoneNumber"
              label="Phone"
              onChange={(e) => handleInputChange(e)}
              value={formState.phoneNumber}
              style={fieldStyle}
              required
            />
            <Button type="submit" name="submit" value="add">
              Add
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const fieldStyle: CSS.Properties = {
  margin: '10px',
};

export default AddClient;
