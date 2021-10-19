import React, { FC, useReducer } from 'react';
import CSS from 'csstype';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
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
  const [dialogOpen, setDialog] = React.useState(false);
  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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
    handleClose();
  };

  const fieldStyle: CSS.Properties = {
    margin: '10px',
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Item
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
              name="itemname"
              label="Name"
              onChange={(e) => handleInputChange(e)}
              value={formState.itemname}
              style={fieldStyle}
              required
            />

            <TextField
              type="text"
              name="description"
              label="Description"
              onChange={(e) => handleInputChange(e)}
              value={formState.description}
              style={fieldStyle}
              required
            />
            <TextField
              type="number"
              name="stockqty"
              label="Quantity"
              onChange={(e) => handleInputChange(e)}
              value={formState.stockqty}
              style={fieldStyle}
              required
            />
            <TextField
              type="number"
              name="unitprice"
              label="Price"
              onChange={(e) => handleInputChange(e)}
              value={formState.unitprice}
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

export default AddItem;
