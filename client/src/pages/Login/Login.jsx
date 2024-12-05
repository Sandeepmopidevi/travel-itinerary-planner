import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); // Save the token in localStorage
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        throw new Error('Token not received');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      alert('Invalid credentials or server error.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="glow">Travel Itinerary Planner</h1>
        <p className="subtitle">Plan your Travel here</p>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <div className="register-option">
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="register-link">
          Register here
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
