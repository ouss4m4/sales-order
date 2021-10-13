import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { itemApi } from '../../api/item';
import ItemDetails from '../components/ItemDetails';
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

  return (
    <>
      {item && <ItemDetails item={item} />}
      <p>{loading}</p>
    </>
  );
};
