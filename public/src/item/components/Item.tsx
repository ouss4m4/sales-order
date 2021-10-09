import React from 'react';
import { IItem } from '../typing/IItem';

interface Props {
  item: IItem;
}

export const Item = (props: Props) => {
  return (
    <tr>
      <td>{props.item.itemCode}</td>
      <td>{props.item.itemName}</td>
      <td>{props.item.description}</td>
      <td>{props.item.stockQty}</td>
      <td>{props.item.unitPrice}</td>
    </tr>
  );
};
