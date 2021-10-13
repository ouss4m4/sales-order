import React from 'react';
import { Switch, Route } from 'react-router';
import { match } from 'react-router-dom';
import OrderPage from '../../order/OrderPage';
import { ItemDetails } from '../ItemDetails/ItemDetails';
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
            <th></th>
          </tr>
        </thead>
        <tbody>{renderRows(Items)}</tbody>
      </table>
      {/*  <div>
        here
        <Switch>
          <Route path={`/items/:itemcode`}>
            <ItemDetails />
          </Route>
        </Switch>
      </div> */}
    </>
  );
};
