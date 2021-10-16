import React, { useState } from 'react';
import { IClient } from '../typings';

interface Props {
  onClientAdded: (client: IClient) => void;
}

const AddClient = ({ onClientAdded }: Props) => {
  const initialFormState = {
    cardName: '',
    shippingAddress: '',
    billingAddress: '',
    phoneNumber: '',
  };

  const [formState, setFormState] = useState(initialFormState);
  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <div>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input
          type="text"
          name="cardName"
          placeholder="Name"
          onChange={(e) => handleInputChange(e)}
          value={formState.cardName}
          required
        />
        <input
          type="text"
          name="shippingAddress"
          placeholder="Shipping Address"
          onChange={(e) => handleInputChange(e)}
          value={formState.shippingAddress}
          required
        />
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing Address"
          onChange={(e) => handleInputChange(e)}
          value={formState.billingAddress}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone"
          onChange={(e) => handleInputChange(e)}
          value={formState.phoneNumber}
          required
        />
        <input type="submit" name="submit" value="add" required />
      </form>
    </div>
  );
};

export default AddClient;
