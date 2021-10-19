import React, { FC, useState } from 'react';
import CSS from 'csstype';
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { IItem } from '../typing/IItem';

interface Props {
  item: IItem;
  onEditSubmit: (item: IItem) => Promise<boolean>;
  onDeleteItem: (item: IItem) => Promise<boolean>;
}

const ItemDetails: FC<Props> = ({ item, onEditSubmit, onDeleteItem }) => {
  const history = useHistory();
  const [editing, SetEditing] = useState(false);
  const [formState, setFormState] = useState({
    itemName: item.itemName,
    description: item.description,
    stockQty: item.stockQty,
    unitPrice: item.unitPrice,
  });

  const onEditClick = () => {
    SetEditing(true);
  };

  const onSaveClick = async () => {
    const editedItem: IItem = {
      itemCode: item.itemCode,
      description: formState.description,
      itemName: formState.itemName,
      stockQty: formState.stockQty,
      unitPrice: formState.unitPrice,
    };

    await onEditSubmit(editedItem);
    SetEditing(false);
  };

  const onCancelClick = () => {
    setFormState({
      itemName: item.itemName,
      description: item.description,
      stockQty: item.stockQty,
      unitPrice: item.unitPrice,
    });
    SetEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let input = e.target;
    setFormState({
      ...formState,
      [input.name]: input.value,
    });
  };

  const onDeleteClick = async () => {
    let confirmDelete = window.confirm('You sure you want to delete ?');
    if (confirmDelete) {
      var deleted = await onDeleteItem(item);
      console.log('------', deleted);
      if (deleted) {
        onBackClick();
      } else {
        alert('can not delete');
      }
    } else {
      return;
    }
  };
  const onBackClick = () => {
    history.goBack();
  };

  return (
    <>
      <div>
        <div style={formGroup}>
          <TextField
            type="text"
            value={formState.itemName}
            name="itemName"
            label="Name"
            onChange={(e) => handleInputChange(e)}
            style={fieldStyle}
            inputProps={{ readOnly: editing ? false : true }}
          />

          <TextField
            type="text"
            value={formState.description}
            name="description"
            label="Description"
            multiline
            onChange={(e) => handleInputChange(e)}
            style={fieldStyle}
            inputProps={{ readOnly: editing ? false : true }}
          />

          <TextField
            type="text"
            value={formState.stockQty}
            name="stockQty"
            label="Quantity"
            onChange={(e) => handleInputChange(e)}
            style={fieldStyle}
            inputProps={{ readOnly: editing ? false : true }}
          />

          <TextField
            type="text"
            value={formState.unitPrice}
            name="unitPrice"
            label="Price"
            onChange={(e) => handleInputChange(e)}
            style={fieldStyle}
            inputProps={{ readOnly: editing ? false : true }}
          />
        </div>

        <div style={btnGroup}>
          <Button variant="outlined" color="error" onClick={onDeleteClick}>
            Delete
          </Button>

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
    </>
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

export default ItemDetails;
