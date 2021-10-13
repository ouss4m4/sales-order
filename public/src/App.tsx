import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ClientPage from './client/typings/ClientPage';
import { ItemDetails } from './item/ItemDetails/ItemDetails';
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
            <Route path={`/items/:itemcode`}>
              <ItemDetails />
            </Route>
            <Route path="/items">
              <ItemPage />
            </Route>
            <Route path="/clients">
              <ClientPage />
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
