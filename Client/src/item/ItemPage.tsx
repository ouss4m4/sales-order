import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { itemApi } from '../api/item';
import AddItem from './AddItem/AddItem';
import { ItemsTable } from './ItemsList/ItemsTable';
import { IItem } from './typing/IItem';
import { authService } from '../shared/authservice';
import { IRole } from '../login/Typings';

interface Props {}

export const ItemPage = (props: Props) => {
  const [list, setList] = useState<IItem[]>([]);
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const result = await itemApi.getItems();
    setList(result);
  };

  const addItem = async (item: IItem): Promise<void> => {
    await itemApi.addItem(item);
    fetchItems();
  };

  const authorized = authService.isUserAuthorizedByRole(IRole.Admin);
  return (
    <Container maxWidth="lg">
      {authorized && <AddItem onItemAdded={addItem} />}
      <ItemsTable Items={list} />
    </Container>
  );
};
