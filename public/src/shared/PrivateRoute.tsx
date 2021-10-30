import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authService } from './authservice';

const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
  console.log('so what ?', authService.isUserLoggedIn());
  return (
    <Route
      {...rest}
      render={(props) =>
        authService.isUserLoggedIn() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
