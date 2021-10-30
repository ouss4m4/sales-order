import React, { FC, useRef, useState } from 'react';
import { IItem } from '../../../item/typing/IItem';
import ItemPicker from '../../../shared/components/ItemPicker';

interface Props {
  onQtySubmit: (item: IItem, qty: number) => void;
}

const LinePicker: FC<Props> = ({ onQtySubmit }) => {
  const [item, setItem] = useState<IItem>();
  const qtyInput = useRef<HTMLInputElement>(null);
  const addLine = () => {
    if (!item) {
      return;
    }
    let qty = qtyInput.current ? parseInt(qtyInput.current.value, 10) : 0;
    if (!qty) {
      return;
    }
    onQtySubmit(item, qty);
    setItem(undefined);
    if (qtyInput.current) qtyInput.current.value = '';
  };

  return (
    <tr>
      <td></td>
      <td>{item ? item?.itemName : <ItemPicker itemSelected={setItem} />}</td>
      <td>
        <p>{item?.description}</p>
      </td>
      <td>
        <input ref={qtyInput} type="number" />
      </td>
      <td>
        <button onClick={addLine}> + </button>
      </td>
    </tr>
  );
};

export default LinePicker;
