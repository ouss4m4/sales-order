import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { authService } from '../shared/authservice';

interface Props {
  updateLogin: (state: boolean) => void;
}

const Logout: FC<Props> = ({ updateLogin }) => {
  authService.logOutUser();
  updateLogin(false);

  return <Redirect to="/login" />;
};

export default Logout;
