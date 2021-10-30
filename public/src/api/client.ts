import { IClient } from '../client/typings';
import { getHeaders } from './headers';
class ClientApi {
  constructor(private url: string) {}
  public async getClients(): Promise<IClient[]> {
    try {
      const clients = await fetch(`${this.url}/clients`, {
        headers: getHeaders(),
      }).then((data) => data.json());
      return clients;
    } catch (error) {
      console.log('error fetching clients', error);
      return [];
    }
  }

  public async addClient(client: IClient): Promise<void> {
    try {
      const response = await fetch(`${this.url}/clients`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(client),
      }).then((data) => data.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async getClientById(cardcode: number): Promise<IClient> {
    try {
      const response = await fetch(`${this.url}/clients/${cardcode}`, {
        headers: getHeaders(),
      }).then((data) => data.json());
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async editCLient(client: IClient): Promise<IClient> {
    try {
      const response = await fetch(`${this.url}/clients`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(client),
      }).then((data) => data.json());
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const clientApi = new ClientApi('/api');
