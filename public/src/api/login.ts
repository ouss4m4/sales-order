import { ILoginSuccess } from '../login/Typings';

class LoginApi {
  constructor(private url: string) {}
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  public async loginUser(
    email: string,
    password: string
  ): Promise<ILoginSuccess> {
    try {
      const resp: ILoginSuccess = await fetch(`${this.url}/login`, {
        headers: this.headers,
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
