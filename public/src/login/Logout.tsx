import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { authService } from '../shared/authservice';

interface Props {}

const Logout: FC<Props> = () => {
  authService.logOutUser();
  return <Redirect to="/login" />;
};

export default Logout;
