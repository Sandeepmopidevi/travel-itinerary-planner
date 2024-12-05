import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      alert('Registration successful!');
    } catch (error) {
      alert('Failed to register. Try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Create an Account</h1>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="falling-input"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="falling-input"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="falling-input"
            />
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
        <p className="register-login-prompt">
          Already have an account?{' '}
          <Link to="/login" className="login-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
