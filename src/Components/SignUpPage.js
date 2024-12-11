import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="signup-container">
      {/* Left Side - Dashboard Preview */}
      <div className="preview-section">
        <motion.div className="preview-carousel">
          <motion.img
            src="'
            alt="Dashboard
            className="preview-image"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.img
            src=""
            alt="Queries"
            className="preview-image"
            animate={{ opacity: [0, 1, 0] }
        }
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 3 }}
          />
          <motion.img
            src=""
            alt="Graph"
            className="preview-image"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 6 }}
          />
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="form-section">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        {showLogin ? (
          <LoginForm onBack={() => setShowLogin(false)} />
        ) : (
          <SignUpForm onShowLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default SignUpPage;