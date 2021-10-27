import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import './App.css';
import ClientDetails from './client/ClientDetails/ClientDetailsPage';
import ClientPage from './client/ClientPage';
import { ItemDetailsPage } from './item/ItemDetails/ItemDetailsPage';
import { ItemPage } from './item/ItemPage';
import LoginPage from './login/LoginPage';
import logo from './logo.svg';
import CreateOrderPage from './order/CreateOrder/CreateOrderPage';
import OrderDetailsPage from './order/OrderDetails/OrderDetailsPage';
import OrderPage from './order/OrderPage';
import { authService } from './shared/authservice';

function App() {
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
          {authService.isUserLoggedIn() ? (
            <nav
              style={{
                display: 'flex',
                width: 250,
                justifyContent: 'space-evenly',
                marginBottom: 40,
              }}
            >
              <Link to="/items">Items</Link>

              <Link to="/clients">Clients</Link>

              <Link to="/orders">Orders</Link>
            </nav>
          ) : (
            <Redirect to="/login" />
          )}
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/items">
              <ItemPage />
            </Route>
            <Route path={`/items/:itemcode`}>
              <ItemDetailsPage />
            </Route>
            <Route exact path="/clients">
              <ClientPage />
            </Route>
            <Route path="/clients/:cardcode">
              <ClientDetails />
            </Route>
            <Route exact path="/orders">
              <OrderPage />
            </Route>
            <Route path="/orders/new">
              <CreateOrderPage />
            </Route>
            <Route path="/orders/:orderId">
              <OrderDetailsPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
