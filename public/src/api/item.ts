import { IItem } from '../item/typing/IItem';
import { headers } from './headers';
class ItemApi {
  constructor(private url: string) {}

  public async getItems(): Promise<IItem[]> {
    try {
      const items = await fetch(`${this.url}/items`, {
        headers,
      }).then((data) => data.json());
      return items;
    } catch (error) {
      console.log('error fetching items', error);
      return [];
    }
  }

  public async addItem(item: IItem): Promise<void> {
    try {
      const response = await fetch(`${this.url}/items`, {
        headers,
        method: 'POST',
        body: JSON.stringify(item),
      }).then((data) => data.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async getItemById(itemcode: number): Promise<IItem> {
    try {
      const response = await fetch(`${this.url}/items/${itemcode}`, {
        headers,
      }).then((data) => data.json());
      return response;
    } catch (error: any) {
      throw new Error('Item not found');
    }
  }
  public async editItem(item: IItem): Promise<IItem> {
    try {
      const response = await fetch(`${this.url}/items`, {
        headers,
        method: 'PUT',
        body: JSON.stringify(item),
      }).then((data) => data.json());
      return response;
    } catch (error: any) {
      throw new Error('Edit failed');
    }
  }

  public async deleteItem(item: IItem): Promise<boolean> {
    try {
      await fetch(`${this.url}/items`, {
        headers,
        method: 'DELETE',
        body: JSON.stringify(item),
      });
      return true;
    } catch (error: any) {
      console.log(error);
      throw new Error('Delete failed');
    }
  }
}

export const itemApi = new ItemApi('/api');
