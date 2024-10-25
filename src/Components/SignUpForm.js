import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = ({ onShowLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/welcome');
  };

  return (
    <div className="signup-form-container">
      <h2 className="form-title">Create Account</h2>
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
          Sign Up
        </button>
        <button
          type="button"
          className="toggle-login"
          onClick={onShowLogin}
        >
          +
        </button>
        <button type="button" className="google-button">
          <img src="/api/placeholder/20/20" alt="Google" />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
