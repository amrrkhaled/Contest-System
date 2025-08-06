import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../style/Register.css";

export const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { name, password, institution },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Registration successful');
        navigate('/login');
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
            IEEE <span style={{ fontSize: '2.3rem' , fontWeight: 'bold' ,color: '#4682A9' }}>AlexSB</span>
          </h1>
          <h3 className="branding-sub">Alextreme</h3>
        </div>

        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              autoComplete="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="input-group">
            <label htmlFor="institution">Institution</label>
            <input
              type="text"
              id="institution"
              autoComplete="organization"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="register-footer">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};
