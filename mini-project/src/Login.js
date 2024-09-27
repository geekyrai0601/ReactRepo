// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import
import Home from './loginscreen/Home';
import App from './App';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3500/users');
      const users = response.data;

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // Redirect to Home page on successful login
        //navigate('./Home'); // Use navigate to redirect
        <App/>

      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Error fetching user data', err);
      setError('Error fetching user data');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
