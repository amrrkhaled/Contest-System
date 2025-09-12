import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Register.css"; // reuse the same styling
import api from "../api";

export const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin'); // fixed role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post(
        '/auth/admin/register',
        { username, password, email, role },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/login');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err.response?.data?.message ||
        'An error occurred while registering. Please try again.'
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-branding">
          <h1 className="branding-main">
            IEEE <span style={{ fontSize: '2.3rem', fontWeight: 'bold', color: '#4682A9' }}>AlexSB</span>
          </h1>
          <h3 className="branding-sub">Admin Panel</h3>
        </div>

        <h2>Admin Register</h2>
        <form onSubmit={handleRegister}>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="register-footer">
          Already an admin? <a href="/admin/login">Login here</a>
        </p>
      </div>
    </div>
  );
};
