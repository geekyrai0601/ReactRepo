// src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './loginscreen/Home';
import About from './loginscreen/About';
import CategoriesPage from './loginscreen/Categorize';
import Products from './loginscreen/Products';
import Cart from './users/commonuser/Cart';
import Admin from './users/admin/admin';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const AdminRoute = ({ children }) => {
    return userType === 'admin' ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      {isLoggedIn && ( 
        <nav style={styles.navbar}>
          <div style={styles.navLinks}>
            <Link style={styles.link} to="/loginscreen/Home">Home</Link>
            <Link style={styles.link} to="/loginscreen/About">About Us</Link>
            <Link style={styles.link} to="/loginscreen/Categorize">Category</Link>
            <Link style={styles.link} to="/loginscreen/Products">Products</Link>
            <Link style={styles.link} to="/users/commonuser/Cart">My Cart</Link>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route 
          path="/loginscreen/Home" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/loginscreen/About" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <About />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/loginscreen/Categorize" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CategoriesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/loginscreen/Products" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Products />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users/commonuser/Cart" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Cart />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users/admin/admin" 
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: '10px 20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  navLinks: {
    display: 'flex',
    gap: '15px', // Space between links
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    transition: 'color 0.3s',
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
