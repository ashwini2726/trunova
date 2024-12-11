import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LogoAnimation.css';

const LogoAnimation = () => {
  const navigate = useNavigate();

  return (
    <div className="logo-container">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="logo-text"
      >
        CoolingTower AI
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="start-button"
        onClick={() => navigate('/signup')}
      >
        Click to Start
      </motion.button>
    </div>
  );
};

export default LogoAnimation;
