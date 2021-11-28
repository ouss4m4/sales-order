import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../shared/authservice';
import LoginForm from './LoginForm/LoginForm';

interface Props {
  updateLogin: (state: boolean) => void;
}

const LoginPage: FC<Props> = ({ updateLogin }) => {
  const history = useHistory();
  useEffect(() => {
    if (authService.isUserLoggedIn()) history.replace('/orders/new');
  });

  const loginAsAdmin = async () => {
    await authService.tryLogin('admin@me.com', 'admin');
    history.replace('/orders/new');
    updateLogin(true);
    return true;
  };
  const loginAsUser = async () => {
    await authService.tryLogin('sales@per.son', 'sales');
    history.replace('/orders/new');
    updateLogin(true);

    return true;
  };

  return <LoginForm onLoginAdmin={loginAsAdmin} onLoginUser={loginAsUser} />;
};

export default LoginPage;
