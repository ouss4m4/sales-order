import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { IItem } from '../typing/IItem';

interface Props {
  item: IItem;
}

export default function ItemDetails({ item }: Props): ReactElement {
  const history = useHistory();

  const goback = () => {
    history.goBack();
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
            <button>Edit</button>
            <button onClick={goback}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
