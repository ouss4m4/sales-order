import { authService } from '../shared/authservice';

export const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${authService.getToken()}`,
});
