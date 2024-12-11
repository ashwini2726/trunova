import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoAnimation from './Components/LogoAnimation';
import SignUpPage from './Components/SignUpPage';
import Chatbox from './Components/Chatbox';
import SearchBar from './Components/SearchBar';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoAnimation />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/searchbar" element={<SearchBar />} />
      </Routes>
    </Router>
  );
};

export default App;
