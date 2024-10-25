// src/Components
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onBack }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/welcome');
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" className="form-input" required />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
        <button type="button" className="google-button">
          <img src="/api/placeholder/20/20" alt="Google" />
          Continue with Google
        </button>
      </form>
      <button onClick={onBack} className="login-back">
        Back to Sign Up
      </button>
    </div>
  );
};

export default LoginForm;