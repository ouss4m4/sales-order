class LoginApi {
  constructor(private url: string) {}
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  public async loginUser(email: string, password: string): Promise<any> {
    try {
      const resp = await fetch(`${this.url}/login`, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }).then((data) => data.json());
      console.log(resp);
      return resp;
    } catch (error) {
      console.log('error login', error);
    }
  }
}

export const loginApi = new LoginApi('/api');
