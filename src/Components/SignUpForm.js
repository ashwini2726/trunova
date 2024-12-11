import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = ({ onShowLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user already exists
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && storedUserData.email === email) {
      setError('This email is already registered. Please log in.');
      return;
    }

    // Save new user data
    const userData = {
      username,
      email,
      password,
      bloodGroup,
      category,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('User data saved:', userData);

    // Navigate based on selected category
    if (category === 'Operator') {
      navigate('/chatbox'); // Navigate to ChatBox if the category is Operator
    } else {
      navigate('/welcome'); // Otherwise, navigate to Welcome page
    }
  };

  return (
    <div className="signup-form-container">
      <h2 className="form-title">Create Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label className="form-label">Blood Group</label>
          <select
            className="form-input"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Maintenance">Maintenance</option>
            <option value="IT Automation">IT Automation</option>
            <option value="Operator">Operator</option>
            <option value="Engineer">Engineer</option>
            <option value="Safety Officer">Safety Officer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
        <button type="button" className="toggle-login" onClick={onShowLogin}>+</button>
        <button type="button" className="google-button">
          <img src="/api/placeholder/20/20" alt="Google" />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
