import React from 'react';
import { IItem } from '../typing/IItem';
import { Item } from './Item';

interface Props {
  Items: IItem[];
}

export const ItemsTable = ({ Items }: Props) => {
  const renderRows = (items: IItem[]) => {
    return items.map((item) => <Item item={item} key={item.itemCode} />);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>itemCode</th>
            <th>itemName</th>
            <th>description</th>
            <th>stockQty</th>
            <th>unitPrice</th>
          </tr>
        </thead>
        <tbody>{renderRows(Items)}</tbody>
      </table>
    </>
  );
};
