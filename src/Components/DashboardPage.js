import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DashboardPage.css';
import { FaSearch, FaMicrophone, FaPaperPlane } from 'react-icons/fa';

const DashboardPage = () => {
  const location = useLocation();
  const [name, setName] = useState('User');
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get('name') || 'User';
    setName(userName.charAt(0).toUpperCase() + userName.slice(1));
  }, [location]);

  const handleMicClick = () => {
    setIsListening(!isListening);
  };

  const handleSendClick = () => {
    if (searchText.trim()) {
      alert(`You searched for: ${searchText}`);
      setSearchText(''); // Clear the input after sending
    } else {
      alert('Please enter some text before sending!');
    }
  };

  return (
    <div className="dashboard-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card"
      >
        <h1 className="greeting-title">Welcome, {name}!</h1>
        <p className="greeting-subtitle">How can I assist you today?</p>

        <div className="image-grid">
          {/* Operators */}
          <div className="image-card" onClick={() => alert('Operators clicked!')}>
            <img src="https://img.freepik.com/premium-photo/industrial-employees-working-together-factory-production-line-isolated-white-background_660230-78986.jpg?w=740" alt="Operators" className="image" />
            <p>Operators</p>
          </div>

          {/* Maintenance Person */}
          <div className="image-card" onClick={() => alert('Maintenance Person clicked!')}>
            <img src="https://img.freepik.com/premium-vector/man-stands-front-collection-items-including-man-with-beard_1033579-69847.jpg?w=740" alt="Maintenance Person" className="image" />
            <p>Maintenance Person</p>
          </div>

          {/* Engineers */}
          <div className="image-card" onClick={() => alert('Engineers clicked!')}>
            <img src="https://img.freepik.com/premium-vector/professional-construction-projection-engineering-flat-style-vector-illustration_1332465-17559.jpg?w=996" alt="Engineers" className="image" />
            <p>Engineers</p>
          </div>

          {/* Managers */}
          <div className="image-card" onClick={() => alert('Managers clicked!')}>
            <img src="https://img.freepik.com/premium-vector/man-suit-likely-manager-holding-clipboard-while-auditing-business-data-manager-auditing-business-data-simple-minimalist-flat-vector-illustration_538213-118874.jpg?w=740" alt="Managers" className="image" />
            <p>Managers</p>
          </div>

          {/* Safety Officers */}
          <div className="image-card" onClick={() => alert('Safety Officers clicked!')}>
            <img src="https://img.freepik.com/premium-photo/3d-flat-icon-as-safety-engineer-with-iso-certificate-compliance-documentation-concept-as-safet_980716-402667.jpg?w=996" alt="Safety Officers" className="image" />
            <p>Safety Officers</p>
          </div>

          {/* IT Automation Specialists */}
          <div className="image-card" onClick={() => alert('IT Automation Specialists clicked!')}>
            <img src="https://img.freepik.com/free-vector/hand-drawn-rpa-illustration_23-2149243387.jpg?t=st=1729763852~exp=1729767452~hmac=a8b8b1a853274ccafe609ba88a7a698c237c7b3c02ea0284bdb4557165b75e07&w=740" alt="IT Automation Specialists" className="image" />
            <p>IT Specialists</p>
          </div>
        </div>

        <div className="search-bar">
          <FaSearch className="icon search-icon" />
          <input
            type="text"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Type your query..."
          />
          <FaMicrophone className={`icon mic-icon ${isListening ? 'listening' : ''}`} onClick={handleMicClick} />
          <FaPaperPlane className="icon send-icon" onClick={handleSendClick} />
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
