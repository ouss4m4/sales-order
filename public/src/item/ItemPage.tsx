import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import AddItem from './components/AddItem';
import { ItemsTable } from './components/ItemsTable';
import { IItem } from './typing/IItem';

interface Props {}

export const ItemPage = (props: Props) => {
  useEffect(() => {
    fetchItems();
  }, []);
  const [data, setData] = useState<IItem[]>([]);

  const fetchItems = async () => {
    const result = await api.getItems();
    setData(result);
  };

  const addItem = async (item: IItem): Promise<void> => {
    await api.addItem(item);
    fetchItems();
  };

  return (
    <>
      <AddItem onItemAdded={addItem} />
      <ItemsTable Items={data} />
    </>
  );
};
