import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router';
import CSS from 'csstype';
import { IClient } from '../typings';

interface Props {
  client: IClient;
  onEditClient: (client: IClient) => Promise<boolean>;
}

const ClientDetails = ({ client, onEditClient }: Props) => {
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState({
    cardCode: client.cardCode,
    cardName: client.cardName,
    shippingAddress: client.shippingAddress,
    billingAddress: client.billingAddress,
    phoneNumber: client.phoneNumber,
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let input = e.target;
    setFormState({
      ...formState,
      [input.name]: input.value,
    });
  };

  const onSaveClick = async () => {
    const editedItem: IClient = {
      cardCode: client.cardCode,
      cardName: formState.cardName,
      shippingAddress: formState.shippingAddress,
      billingAddress: formState.billingAddress,
      phoneNumber: formState.phoneNumber,
    };

    await onEditClient(editedItem);
    setEditing(false);
  };

  const onEditClick = () => {
    setEditing(true);
  };

  const onCancelClick = () => {
    setFormState(client);
    setEditing(false);
  };

  const onBackClick = () => {
    history.goBack();
  };

  return (
    <div>
      <div style={formGroup}>
        <TextField
          type="text"
          value={formState.cardName}
          name="cardName"
          label="Name"
          onChange={(e) => handleInputChange(e)}
          style={fieldStyle}
          inputProps={{ readOnly: editing ? false : true }}
        />
        <TextField
          type="text"
          value={formState.shippingAddress}
          name="shippingAddress"
          label="Shipping Address"
          onChange={(e) => handleInputChange(e)}
          style={fieldStyle}
          inputProps={{ readOnly: editing ? false : true }}
        />
        <TextField
          type="text"
          value={formState.billingAddress}
          name="billingAddress"
          label="Billing Address"
          onChange={(e) => handleInputChange(e)}
          style={fieldStyle}
          inputProps={{ readOnly: editing ? false : true }}
        />
        <TextField
          type="text"
          value={formState.phoneNumber}
          name="phoneNumber"
          label="Phone Number"
          onChange={(e) => handleInputChange(e)}
          style={fieldStyle}
          inputProps={{ readOnly: editing ? false : true }}
        />
      </div>

      <div style={btnGroup}>
        {editing ? (
          <Button variant="outlined" color="success" onClick={onSaveClick}>
            Save
          </Button>
        ) : (
          <Button variant="outlined" onClick={onEditClick}>
            Edit
          </Button>
        )}
        {editing ? (
          <Button variant="outlined" onClick={onCancelClick}>
            Cancel
          </Button>
        ) : (
          <Button variant="outlined" onClick={onBackClick}>
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

const btnGroup: CSS.Properties = {
  minWidth: '180px',
  display: 'flex',
  justifyContent: 'space-around',
};
const fieldStyle: CSS.Properties = {
  margin: '10px',
};
const formGroup: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '8px',
  minWidth: '450px',
};

export default ClientDetails;
