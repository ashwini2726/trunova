import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoAnimation from './Components/LogoAnimation';
import SignUpPage from './Components/SignUpPage';
import WelcomePage from './Components/WelcomePage';
import DashboardPage from './Components/DashboardPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoAnimation />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
