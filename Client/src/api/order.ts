import { IOrder, IOrderHeader } from '../order/typings';
import { getHeaders } from './headers';
class OrderApi {
  constructor(private url: string) {}

  public async getOrders(): Promise<IOrderHeader[]> {
    try {
      const orders = await fetch(`${this.url}/orders`, {
        headers: getHeaders(),
      }).then((data) => data.json());
      return orders;
    } catch (error) {
      console.log('error fetching orders', error);
      return [];
    }
  }

  public async addOrder(order: IOrder): Promise<void> {
    try {
      const response = await fetch(`${this.url}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(order),
      }).then((data) => data.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async getOrderById(orderId: number): Promise<IOrder> {
    try {
      const response = await fetch(`${this.url}/orders/${orderId}`, {
        headers: getHeaders(),
      }).then((data) => data.json());
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const orderApi = new OrderApi('/api');
