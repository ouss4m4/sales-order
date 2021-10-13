import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { itemApi } from '../../api/item';
import { IItem } from '../typing/IItem';

export const ItemDetails: FC = () => {
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
    } catch (error: any) {
      setLoading(error.message);
    }
  };

  const history = useHistory();

  const goback = () => {
    history.goBack();
  };
  return (
    <>
      <h3>Requested Item With Id: {itemcode}</h3>
      <h1>Items Details</h1>
      {item && (
        <div>
          <div>
            <strong>ItemName: </strong> <p>{item.itemName}</p>
          </div>
          <div>
            <strong>Description: </strong> <p>{item.description}</p>
          </div>
          <div>
            <strong>Quantity: </strong> <p>{item.stockQty}</p>
          </div>
          <div>
            <strong>Price: </strong> <p>{item.unitPrice}</p>
          </div>
          <div>
            <button>Edit</button>
            <button onClick={goback}>Back</button>
          </div>
        </div>
      )}
      <p>{loading}</p>
    </>
  );
};
