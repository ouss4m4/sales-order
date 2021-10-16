export interface IClient {
  cardCode: number | undefined;
  cardName: string;
  shippingAddress: string;
  billingAddress: string;
  phoneNumber: string;
}
