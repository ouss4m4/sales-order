import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import AddItem from './components/AddItem';
import { ItemsTable } from './components/ItemsTable';
import { IItem } from './typing/IItem';

interface Props {}

export const ItemPage = (props: Props) => {
  const [data, setData] = useState<IItem[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const result = await api.getItems();
      setData(result);
    }
    fetchItems();
  }, []);

  const addItem = (item: IItem): void => {};

  return (
    <>
      <AddItem onItemAdded={addItem} />
      <ItemsTable Items={data} />
    </>
  );
};
