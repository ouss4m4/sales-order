import React from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../typing/IItem';

interface Props {
  item: IItem;
}

export const Item = ({ item }: Props) => {
  return (
    <tr>
      <td>{item.itemCode}</td>
      <td>{item.itemName}</td>
      <td>{item.description}</td>
      <td>{item.stockQty}</td>
      <td>{item.unitPrice}</td>
      <td>
        <Link to={`/items/${item.itemCode}`}>{'>'}</Link>
      </td>
    </tr>
  );
};
