import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Navbar: FC<Props> = (props) => {
  return (
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

      <Link to="/logout">Logout</Link>
    </nav>
  );
};

export default Navbar;
