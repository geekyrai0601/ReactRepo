// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <Link to="/">Home</Link> |
      <Link to="/about"> About Us</Link> |
      <Link to="/categorize"> Categorize</Link> |
      <Link to="/products"> Products</Link> |
      <Link to="/cart"> Cart</Link>
    </div>
  );
};

export default Navbar;
