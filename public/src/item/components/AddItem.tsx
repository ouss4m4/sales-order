import React, { FC, useReducer } from 'react';
import { IItem } from '../typing/IItem';

interface Props {
  onItemAdded: (item: IItem) => void;
}

interface IFormState {
  itemname: string;
  description: string;
  stockqty: number;
  unitprice: number;
}

interface IAction {
  type: string;
  field?: string;
  payload?: string;
}

const AddItem: FC<Props> = ({ onItemAdded }) => {
  const initialFormState: IFormState = {
    itemname: '',
    description: '',
    stockqty: 0,
    unitprice: 0,
  };

  const formReducer = (state: IFormState, action: IAction) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        return {
          ...state,
          [action.field as string]: action.payload,
        };
      case 'RESET':
        return initialFormState;
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'INPUT_CHANGE',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Item: IItem = {
      itemName: formState.itemname,
      description: formState.description,
      stockQty: formState.stockqty,
      unitPrice: formState.unitprice,
    };
    // @TODO: Add Validation using the model ?
    onItemAdded(Item);
    dispatch({ type: 'RESET' });
  };

  return (
    <form onSubmit={(e) => onFormSubmit(e)}>
      <input
        type="text"
        name="itemname"
        placeholder="Name"
        onChange={(e) => handleInputChange(e)}
        value={formState.itemname}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={(e) => handleInputChange(e)}
        value={formState.description}
        required
      />
      <input
        type="number"
        name="stockqty"
        placeholder="Quantity"
        onChange={(e) => handleInputChange(e)}
        value={formState.stockqty}
        required
      />
      <input
        type="number"
        name="unitprice"
        placeholder="Price"
        onChange={(e) => handleInputChange(e)}
        value={formState.unitprice}
        required
      />
      <input type="submit" name="submit" value="add" required />
    </form>
  );
};

export default AddItem;
