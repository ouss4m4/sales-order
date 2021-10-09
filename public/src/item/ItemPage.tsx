import React from 'react';
import { Item } from './components/Item';
import { IItem } from './typing/IItem';

const fakeItems: IItem[] = [
  {
    itemCode: 1,
    itemName: 'Chair',
    description: 'Round curvy chair',
    stockQty: 140,
    unitPrice: 54.99,
  },
  {
    itemCode: 2,
    itemName: 'Table',
    description: '4 by 4 wooden table',
    stockQty: 10,
    unitPrice: 89.99,
  },
];

interface Props {}

export const ItemPage = (props: Props) => {
  const renderRows = (items: IItem[]) => {
    return items.map((item) => <Item item={item} key={item.itemCode} />);
  };
  return (
    <div>
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
        <tbody>{renderRows(fakeItems)}</tbody>
      </table>
    </div>
  );
};
