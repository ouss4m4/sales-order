import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';
import ClientPage from './client/ClientPage';
import { ItemDetailsPage } from './item/ItemDetails/ItemDetailsPage';
import { ItemPage } from './item/ItemPage';
import LoginPage from './login/LoginPage';
import logo from './logo.svg';
import CreateOrderPage from './order/CreateOrder/CreateOrderPage';
import OrderDetailsPage from './order/OrderDetails/OrderDetailsPage';
import OrderPage from './order/OrderPage';
import Navbar from './shared/Navbar';
import PrivateRoute from './shared/PrivateRoute';

function App() {
  const [login, updateLogin] = useState(false);
  const setLoggedIn = (state: boolean) => {
    updateLogin(state);
  };
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
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
            <PrivateRoute path="/clients/:cardcode" />

            <PrivateRoute exact path="/orders" component={OrderPage} />
            <PrivateRoute path="/orders/new" component={CreateOrderPage} />
            <PrivateRoute
              path="/orders/:orderId"
              component={OrderDetailsPage}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
