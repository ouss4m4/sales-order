import React, { FC, ReactElement } from 'react';
import { IItem } from '../typing/IItem';

interface Props {
  item: IItem;
}

export const ItemDetails: FC<Props> = ({ item }: Props) => {
  return (
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
        <button>Back</button>
      </div>
    </div>
  );
};
