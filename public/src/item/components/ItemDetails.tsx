import React, { FC, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IItem } from '../typing/IItem';

interface Props {
  item: IItem;
  onEditSubmit: (item: IItem) => Promise<boolean>;
}

const ItemDetails: FC<Props> = ({ item, onEditSubmit }) => {
  const [editing, SetEditing] = useState(false);
  const history = useHistory();

  const goback = () => {
    history.goBack();
  };
  const onEditClick = () => {
    SetEditing(true);
  };

  const onSaveClick = async () => {
    const editedItem: IItem = {
      itemCode: item.itemCode,
      description: item.description,
      itemName: item.itemName,
      stockQty: item.stockQty,
      unitPrice: item.unitPrice,
    };

    await onEditSubmit(editedItem);
    SetEditing(false);
  };
  return (
    <div>
      {item && (
        <div>
          <div>
            <strong>ItemName: </strong> <p>{item.itemName}</p>
          </div>
          <div>
            <strong>Description: </strong> <p>{item.description}</p>
          </div>
          <div>
            <strong>Quantity: </strong> <p>{item.stockQty}</p>
          </div>
          <div>
            <strong>Price: </strong> <p>{item.unitPrice}</p>
          </div>
          <div>
            {editing ? (
              <button onClick={onSaveClick}>Save</button>
            ) : (
              <button onClick={onEditClick}>Edit</button>
            )}
            <button onClick={goback}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
