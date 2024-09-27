// src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './loginscreen/Home';
import About from './loginscreen/About';
import Categorize from './loginscreen/Categorize';
import Products from './loginscreen/Products';
import Cart from './users/commonuser/Cart';
import Admin from './users/admin/admin'; // Admin component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  return (
    <Router>
      {isLoggedIn && userType === 'user' && ( // Show navbar only for regular users
        <div style={{ textAlign: "center" }}>
          <Link to="/loginscreen/Home">Home</Link> | 
          <Link to="/loginscreen/About">About Us</Link> | 
          <Link to="/loginscreen/Categorize">Category</Link> | 
          <Link to="/loginscreen/Products">Products</Link> | 
          <Link to="/users/commonuser/Cart">My Cart</Link>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/loginscreen/Home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/loginscreen/About" element={isLoggedIn ? <About /> : <Navigate to="/" />} />
        <Route path="/loginscreen/Categorize" element={isLoggedIn ? <Categorize /> : <Navigate to="/" />} />
        <Route path="/loginscreen/Products" element={isLoggedIn ? <Products /> : <Navigate to="/" />} />
        <Route path="/users/commonuser/Cart" element={isLoggedIn ? <Cart /> : <Navigate to="/" />} />
        <Route path="/users/admin/admin" element={userType === 'admin' ? <Admin /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
