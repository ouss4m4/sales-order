import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../shared/authservice';
import LoginForm from './LoginForm/LoginForm';

interface Props {
  updateLogin: (state: boolean) => void;
}

const LoginPage: FC<Props> = ({ updateLogin }) => {
  const history = useHistory();

  const loginAsAdmin = async () => {
    await authService.tryLogin('admin@me.com', 'admin');
    history.replace('/items');
    console.log('wtf?');
    updateLogin(true);
    return true;
  };
  const loginAsUser = async () => {
    await authService.tryLogin('sales@per.son', 'sales');
    history.replace('/clients');
    updateLogin(true);

    return true;
  };

  return <LoginForm onLoginAdmin={loginAsAdmin} onLoginUser={loginAsUser} />;
};

export default LoginPage;
