import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import {
  Menu,
  User,
  BarChart2,
  History,
  Globe,
  Info,
  Thermometer,
  Droplets,
  Wind,
  Search,
  Mic,
  Send,
  Bell,
  Sun,
  Moon,
  Activity,
} from "lucide-react";
import { useState, useEffect, useRef } from "react"; // Import useState, useEffect, and useRef
import "./Chatbox.css";

const Chatbox = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [searchText, setSearchText] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [loading, setLoading] = useState(false); // for loading state
  const [searchHistory, setSearchHistory] = useState([]); // Rename state variable to searchHistory
  const [answersVisible, setAnswersVisible] = useState({});

  const historyRef = useRef(null); // Reference for the history container
  const navigate = useNavigate(); // Use useNavigate for navigation

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleHistory = () => setHistoryOpen(!historyOpen);

  const handleSearchChange = (e) => setSearchText(e.target.value);

  const handleMicClick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => setSearchText(event.results[0][0].transcript);
    recognition.start();
  };

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      setLoading(true);
      setSearchHistory([...searchHistory, searchText]); // Update search history
      setSearchText(""); // Clear input after submitting
      setTimeout(() => setLoading(false), 1500); // Remove loading state after a short delay
    
      // Navigate to SearchBar page with search text as URL parameter
      navigate(`/searchbar?query=${searchText}`);
    }
  };
  
  
  const toggleAnswerVisibility = (index) => {
    setAnswersVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Close history when clicking outside 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setHistoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const questionsWithAnswers = [
    { question: "How is the temperature currently?", answer: "The current temperature is 25°C." },
    { question: "What is the water quality level?", answer: "The water quality is within acceptable limits." },
    { question: "What is the airflow rate?", answer: "The airflow rate is 1200 CFM." },
    { question: "Are there any alerts or warnings?", answer: "No alerts or warnings at the moment." },
  ];

  return (
    <div className={`chatbot-container ${theme}`}>
      {/* Top Section */}
      <div className="top-bar">
        <div className="menu-icon" onClick={toggleMenu}>
          <Menu />
        </div>
        <h1>Hello User, How can I assist today?</h1>
        <div className="top-icons">
          <Bell className="icon" />
          {theme === "light" ? (
            <Sun className="icon" onClick={toggleTheme} />
          ) : (
            <Moon className="icon" onClick={toggleTheme} />
          )}
        </div>
      </div>

      {/* Left Menu */}
      {menuOpen && (
        <div className="menu">
          <div className="menu-item">
            <User /> New Chat
          </div>
          <div className="menu-item">
            <BarChart2 /> Profile
          </div>
          <div className="menu-item" onClick={toggleHistory}>
            <History /> History
          </div>
          <div className="menu-item">
            <Globe /> Language
          </div>
          <div className="menu-item">
            <Info /> About Us
          </div>
        </div>
      )}

      {/* History Section */}
      <div
        className={`history-container ${historyOpen ? "open" : ""}`}
        ref={historyRef}
      >
        <div className="history">
          <h2>History</h2>
          <div className="history-content">
            {searchHistory.length === 0 ? (
              <p>No history yet.</p>
            ) : (
              searchHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <p>{item}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="features">
          <div className="feature pink">
            <Thermometer /> Smart Monitoring
          </div>
          <div className="feature green">
            <Droplets /> Water Quality
          </div>
          <div className="feature orange">
            <Wind /> Airflow Control
          </div>
          <div className="feature dark-blue">
            <BarChart2 /> System Health
          </div>
          <div className="feature brown">
            <Activity /> pH Values
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-bar">
            <Search />
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search here..."
            />
            <Mic onClick={handleMicClick} />
            <button onClick={handleSearchSubmit}>
              <Send />
            </button>
            <button className="clear-btn" onClick={() => setSearchText("")}>
              Clear
            </button>
          </div>

          {/* Operator Questions */}
          <div className="questions">
            {questionsWithAnswers.map((item, index) => (
              <div
                key={index}
                className="question-box"
                onClick={() => toggleAnswerVisibility(index)}
              >
                <h4>{item.question}</h4>
                {answersVisible[index] && <p>{item.answer}</p>}
              </div>
            ))}
          </div>

          {/* Loading State */}
          {loading && <div className="loading">Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
