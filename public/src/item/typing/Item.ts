import { IItem } from './IItem';

export class Item {
  itemCode?: number;
  itemName: string;
  description: string;
  stockQty: number;
  unitPrice: number;
  constructor(props: IItem) {
    if (props.itemCode) {
      this.itemCode = props.itemCode;
    }
    this.itemName = props.itemName;
    this.description = props.description;
    this.stockQty = props.stockQty;
    this.unitPrice = props.unitPrice;
  }
}
