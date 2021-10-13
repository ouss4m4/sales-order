import React, { useState, useEffect } from 'react';
import { itemApi } from '../api/item';
import AddItem from './components/AddItem';
import { ItemsTable } from './ItemsList/ItemsTable';
import { IItem } from './typing/IItem';

interface Props {}

export const ItemPage = (props: Props) => {
  useEffect(() => {
    fetchItems();
  }, []);
  const [list, setList] = useState<IItem[]>([]);

  const fetchItems = async () => {
    const result = await itemApi.getItems();
    setList(result);
  };

  const addItem = async (item: IItem): Promise<void> => {
    await itemApi.addItem(item);
    fetchItems();
  };

  return (
    <>
      <AddItem onItemAdded={addItem} />
      <ItemsTable Items={list} />
    </>
  );
};
