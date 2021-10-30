import { ILoginSuccess } from '../login/Typings';
import { headers } from './headers';
class LoginApi {
  constructor(private url: string) {}

  public async loginUser(
    email: string,
    password: string
  ): Promise<ILoginSuccess> {
    try {
      const resp: ILoginSuccess = await fetch(`${this.url}/login`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }).then((data) => data.json());

      return resp;
    } catch (error) {
      throw error;
    }
  }
}

export const loginApi = new LoginApi('/api');
