import { loginApi } from '../api/login';

class AuthService {
  private _userLoggedIn = false;
  public isUserLoggedIn(): boolean {
    return this._userLoggedIn;
  }
  public async tryLogin(email: string, password: string): Promise<boolean> {
    const result = await loginApi.loginUser(email, password);
    this._userLoggedIn = true;
    return result;
  }
  public logOutUser() {
    this._userLoggedIn = false;
  }
}

export const authService = new AuthService();
