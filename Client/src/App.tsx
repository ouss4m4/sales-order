import { Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';
import ClientDetailsPage from './client/ClientDetails/ClientDetailsPage';
import ClientPage from './client/ClientPage';
import { ItemDetailsPage } from './item/ItemDetails/ItemDetailsPage';
import { ItemPage } from './item/ItemPage';
import LoginPage from './login/LoginPage';
import Logout from './login/Logout';
import logo from './logo.svg';
import CreateOrderPage from './order/CreateOrder/CreateOrderPage';
import OrderDetailsPage from './order/OrderDetails/OrderDetailsPage';
import OrderPage from './order/OrderPage';
import { authService } from './shared/authservice';
import Navbar from './shared/Navbar';
import PrivateRoute from './shared/PrivateRoute';

function App() {
  authService.getStoredUser();
  const [login, updateLogin] = useState(false);
  const setLoggedIn = (state: boolean) => {
    updateLogin(state);
  };
  useEffect(() => {
    updateLogin(authService.isUserLoggedIn());
  }, []);
  return (
    <>
      <div className="App">
        {/*  <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Alert severity="info">
            WebApp hosted of FREE Azure tier, You may face a SLOW Start
          </Alert>
        </div>
      </div>
      <Router>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {login && <Navbar />}
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <LoginPage updateLogin={setLoggedIn} />
            </Route>

            <PrivateRoute exact path="/items" component={ItemPage} />
            <PrivateRoute path="/items/:itemcode" component={ItemDetailsPage} />

            <PrivateRoute exact path="/clients" component={ClientPage} />
            <PrivateRoute
              path="/clients/:cardcode"
              component={ClientDetailsPage}
            />

            <PrivateRoute exact path="/orders" component={OrderPage} />
            <PrivateRoute path="/orders/new" component={CreateOrderPage} />
            <PrivateRoute
              path="/orders/:orderId"
              component={OrderDetailsPage}
            />

            <PrivateRoute
              exact
              path="/logout"
              component={Logout}
              updateLogin={setLoggedIn}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
