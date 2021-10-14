import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { itemApi } from '../../api/item';
import ItemDetails from './ItemDetails';
import { IItem } from '../typing/IItem';

export const ItemDetailsPage: FC = () => {
  const { itemcode } = useParams<{ itemcode: string }>();
  const [item, setItem] = useState<IItem>();
  const [loading, setLoading] = useState<string>();

  useEffect(() => {
    fetchItemDetails(parseInt(itemcode));
  }, [itemcode]);

  const fetchItemDetails = async (itemcode: number) => {
    try {
      setLoading('loading ...');
      const details = await itemApi.getItemById(itemcode);
      setItem(details);
      setLoading('');
    } catch (error: any) {
      setLoading(error.message);
    }
  };

  const editItemDetails = async (item: IItem): Promise<boolean> => {
    try {
      await itemApi.editItem(item);
      setItem(item);
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <>
      {item && <ItemDetails item={item} onEditSubmit={editItemDetails} />}
      <p>{loading}</p>
    </>
  );
};
