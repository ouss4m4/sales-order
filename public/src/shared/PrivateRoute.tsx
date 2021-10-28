import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authService } from './authservice';
/* interface Props {
  Component: React.Component
} */
const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
  console.log('-----', authService.isUserLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        authService.isUserLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
