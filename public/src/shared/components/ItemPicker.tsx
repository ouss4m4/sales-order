import React, { useEffect, useState } from 'react';
import { itemApi } from '../../api/item';
import { IItem } from '../../item/typing/IItem';
import AutoComp from './autocomplete';

interface Props {
  itemSelected: (item: IItem) => void;
}

const ItemPicker = ({ itemSelected }: Props) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [chunk, setChunk] = useState('');
  const getItems = async (val: string) => {
    const list = await itemApi.getItems();
    setItems(list);
  };

  useEffect(() => {
    getItems(chunk);
  }, [chunk]);

  const inputChange = (val: string) => {
    if (val === '') {
      setItems([]);
      return;
    }
    setChunk(val);
  };

  return (
    <>
      <AutoComp
        onOptionSelected={itemSelected}
        onInputChange={inputChange}
        showByKey={'itemName'}
        label={'Item'}
        options={items}
      />
    </>
  );
};

export default ItemPicker;
