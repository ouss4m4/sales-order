import { loginApi } from '../api/login';
import { ILoginSuccess, IRole } from '../login/Typings';

class AuthService {
  constructor() {
    this._user = this.getStoredUser();
    console.log('huh ?');
  }

  private _user: ILoginSuccess | null = null;

  public isUserLoggedIn(): boolean {
    return this._user !== null;
  }

  public async tryLogin(email: string, password: string): Promise<boolean> {
    try {
      const user = await loginApi.loginUser(email, password);
      this.persistUser(user);
      this._user = user;
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public persistUser(user: ILoginSuccess) {
    try {
      this._user = user;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log('err', error);
    }
  }

  public getStoredUser(): ILoginSuccess | null {
    try {
      if (this._user !== null) return this._user;
      console.log('getStoredUser');

      const stored = localStorage.getItem('user');
      if (stored == null) return null;
      const user: ILoginSuccess = JSON.parse(stored);
      return user;
    } catch (error) {
      console.log('err', error);
      return null;
    }
  }

  public isUserAuthorizedByRole(role: IRole): boolean {
    return this._user?.role === role;
  }

  public logOutUser() {
    this._user = null;
    localStorage.removeItem('user');
  }
}

export const authService = new AuthService();
