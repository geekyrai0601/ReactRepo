// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Home from './loginscreen/Home';
import About from './loginscreen/About';
import Categorize from './loginscreen/Categorize';
import Products from './loginscreen/Products';
import Cart from './users/commonuser/Cart';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import MyCart from './users/commonuser/Cart';

const routing = (
  <Router>
    
    <div style={{ textAlign: "center" }}>
      <Link to="/loginscreen/Home">Home</Link>| 
      <Link to="/loginscreen/About">About Us</Link>| 
      <Link to="/loginscreen/Categorize">Category</Link>| 
      <Link to="/loginscreen/Products">Products</Link>|
      <Link to="/users/commonuser/Cart">My Cart</Link>
    </div>

    <Routes>
      <Route path="/loginscreen/Home" element={<Home />} />
      <Route path="/loginscreen/About" element={<About />} />
      <Route path="/loginscreen/Categorize" element={<Categorize />} />
      <Route path="/loginscreen/Products" element={<Products />} />
      <Route path="/users/commonuser/Cart" element={<MyCart />} />

    </Routes>
  </Router>

);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* {routing} */}

    {routing}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
