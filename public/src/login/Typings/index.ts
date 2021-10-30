export enum IRole {
  Admin,
  SalesPerson,
}
export interface ILoginSuccess {
  token: string;
  username: string;
  email: string;
  role: IRole;
}
