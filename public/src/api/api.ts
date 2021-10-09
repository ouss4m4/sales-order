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
}

export const api = new Api(apiUrl);
