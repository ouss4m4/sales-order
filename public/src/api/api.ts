import { apiUrl } from '../core/consts';
import { IItem } from '../item/typing/IItem';

class Api {
  constructor(private url: string) {}

  public async getItems(): Promise<IItem[]> {
    try {
      const items = await fetch(`${this.url}/items`).then((data) =>
        data.json()
      );
      return items;
    } catch (error) {
      console.log('error fetching items', error);
      return [];
    }
  }

  public async addItem(item: IItem): Promise<void> {
    try {
      const response = await fetch(`${this.url}/items`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      }).then((data) => data.json());
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export const api = new Api(apiUrl);
