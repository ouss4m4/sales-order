import React, { FC, useState } from 'react';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div>
      {item && (
        <div>
          <div className="two-cols">
            <strong>ItemName: </strong>
            {editing ? (
              <input
                type="text"
                value={formState.itemName}
                name="itemName"
                onChange={(e) => handleInputChange(e)}
              />
            ) : (
              <span>{item.itemName}</span>
            )}
          </div>
          <div className="two-cols">
            <strong>Description: </strong>
            {editing ? (
              <input
                type="text"
                value={formState.description}
                name="description"
                onChange={(e) => handleInputChange(e)}
              />
            ) : (
              <p>{item.description}</p>
            )}
          </div>
          <div className="two-cols">
            <strong>Quantity: </strong>{' '}
            {editing ? (
              <input
                type="text"
                value={formState.stockQty}
                name="stockQty"
                onChange={(e) => handleInputChange(e)}
              />
            ) : (
              <p>{item.stockQty}</p>
            )}
          </div>
          <div>
            <strong>Price: </strong>{' '}
            {editing ? (
              <input
                type="text"
                value={formState.unitPrice}
                name="unitPrice"
                onChange={(e) => handleInputChange(e)}
              />
            ) : (
              <p>{item.unitPrice}</p>
            )}
          </div>
          <div>
            {!editing && <button onClick={onDeleteClick}>Delete</button>}
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

export default ItemDetails;
