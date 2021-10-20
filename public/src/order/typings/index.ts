export interface IOrderHeader {
  orderId?: number;
  docDate: string;
  docDueDate: string;
  cardCode: number;
  cardName: string;
  billingAddress: string;
  shippingAddress: string;
}
export interface IOrderLine {
  lineId?: number;
  orderId?: number;
  itemCode: number;
  itemName: string;
  description: string;
  quantity: number;
}

export interface IOrder extends IOrderHeader {
  orderLines: IOrderLine[];
}
