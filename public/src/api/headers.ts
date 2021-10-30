import { authService } from '../shared/authservice';

const token = authService.getToken();
export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};
