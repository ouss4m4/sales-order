import { apiUrl } from '../core/consts';
import { IOrder, IOrderHeader } from '../order/typings';

class OrderApi {
  constructor(private url: string) {}
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  public async getOrders(): Promise<IOrderHeader[]> {
    try {
      const orders = await fetch(`${this.url}/orders`, {
        headers: this.headers,
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
        headers: this.headers,
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
        headers: this.headers,
      }).then((data) => data.json());
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const orderApi = new OrderApi(apiUrl);
