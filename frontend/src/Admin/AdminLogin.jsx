import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/admin/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        console.log('Admin login successful');
        navigate('/admin/dashboard'); // redirect to admin dashboard
      } else {
        setError('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message ||
        'An error occurred while logging in. Please try again.'
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-branding">
          <h1 className="branding-main">
            IEEE <span style={{ color: "#4682A9", fontWeight: "bold", fontSize: "2.5rem" }}>AlexSB</span>
          </h1>
          <h3 className="branding-sub">Admin Panel</h3>
        </div>

        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        {error && <p className="error-message">{error}</p>}

      </div>
    </div>
  );
};
