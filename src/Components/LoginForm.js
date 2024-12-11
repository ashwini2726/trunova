import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onBack }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    // Validate user credentials
    if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
      console.log('Login successful');
      navigate('/ChatBox'); // Change to '/chatbox' if you want to go directly to chatbox
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">Welcome Back</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
        <button type="button" className="google-button">
          <img src="/api/placeholder/20/20" alt="Google" />
          Continue with Google
        </button>
      </form>
      <button onClick={onBack} className="login-back">Back to Sign Up</button>
    </div>
  );
};

export default LoginForm;
