// src/Components/WelcomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleContinue = () => {
    if (name.trim()) {
      navigate(`/dashboard?name=${name}`);
    } else {
      alert('Please enter your name');
    }
  };

  return (
    <div className="welcome-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="welcome-card"
      >
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h1 className="welcome-title">CoolTower AI Assistant</h1>
        <p className="welcome-subtitle">Hi, what's your name?</p>
        <input
          type="text"
          className="name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button
          className="continue-button"
          onClick={handleContinue}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
