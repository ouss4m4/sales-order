import React, { useState } from 'react';
import { useHistory } from 'react-router';
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      {client && (
        <div>
          <div className="two-cols">
            <strong>CardName: </strong>
            {editing ? (
              <input
                type="text"
                value={formState.cardName}
                name="cardName"
                onChange={(e) => handleInputChange(e)}
              />
            ) : (
              <span>{client.cardName}</span>
            )}
          </div>
          <div className="two-cols">
            <strong>Shipping Address: </strong>
            {editing ? (
              <input
                type="text"
                value={formState.shippingAddress}
                name="shippingAddress"
                onChange={(e) => handleInputChange(e)}
              />
            ) : (
              <p>{client.shippingAddress}</p>
            )}
          </div>
          <div className="two-cols">
            <strong>Billing Address: </strong>
            {editing ? (
              <input
                type="text"
                value={formState.billingAddress}
                name="billingAddress"
                onChange={(e) => handleInputChange(e)}
              />
            ) : (
              <p>{client.billingAddress}</p>
            )}
          </div>
          <div>
            <strong>Phone Number: </strong>
            {editing ? (
              <input
                type="text"
                value={formState.phoneNumber}
                name="unitPrice"
                onChange={(e) => handleInputChange(e)}
              />
            ) : (
              <p>{client.phoneNumber}</p>
            )}
          </div>
          <div>
            {editing ? (
              <button onClick={onSaveClick}>Save</button>
            ) : (
              <button onClick={onEditClick}>Edit</button>
            )}
            {editing ? (
              <button onClick={onCancelClick}>Cancel</button>
            ) : (
              <button onClick={onBackClick}>Back</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;
