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
import logo from './logo.svg';
import OrderPage from './order/OrderPage';

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

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Redirect to="/clients" />
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
            <Route path="/orders">
              <OrderPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
