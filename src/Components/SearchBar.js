import React, { useState, useEffect, useRef } from "react";
import { VegaLite } from "react-vega";
import { useLocation } from "react-router-dom";
import { History, Settings, MessageSquare, Search, Send, Mic } from "lucide-react";
import "./SearchBar.css";

const SearchBar = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [chat, setChat] = useState([]); // Holds all questions and answers
  const chatEndRef = useRef(null);
  const [answersData, setAnswersData] = useState([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]); // Tracks search queries
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const location = useLocation();

  // Fetch search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("query") || "");
  }, [location]);

  // Fetch answers data (from answers.json)
  useEffect(() => {
    console.log("Fetching from /answers.json");
    fetch("/answers.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setAnswersData(data);
      })
      .catch((error) => {
        console.error("Error fetching answers.json:", error);
        setError("Unable to load answers. Please try again later.");
      });
  }, []);

  // Scroll chat to the bottom when new chat is added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const toggleHistory = () => {
    setHistoryOpen(!historyOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSend = () => {
    if (searchQuery.trim()) {
      const matchingAnswer = answersData.find((answer) =>
        answer.question.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const newChatEntry = {
        question: searchQuery,
        answer: matchingAnswer
          ? matchingAnswer
          : {
              question: searchQuery,
              textAnswer: "Sorry, I couldn't find an answer to your question.",
              chartSpec: null,
            },
      };

      setChat((prevChat) => [...prevChat, newChatEntry]); // Append new question-answer to chat
      setHistory((prevHistory) => [...prevHistory, searchQuery]); // Update search history
      setSearchQuery(""); // Clear the input
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="header">
        <div className="logo" onClick={toggleHistory}>
          Truenova
        </div>
        <div className="icons">
          <History className="icon" onClick={toggleHistory} title="History" />
          <Settings className="icon" title="Settings" />
          <MessageSquare className="icon" title="New Chat" />
        </div>
      </div>

      <div className={`history-container ${historyOpen ? "open" : ""}`}>
        <div className="history">
          <h2>History</h2>
          <div className="history-content">
            {history.length > 0 ? (
              history.map((item, index) => (
                <p key={index} className="history-item">
                  {item}
                </p>
              ))
            ) : (
              <p>No history yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="main-section">
        {chat.length > 0 ? (
          chat.map((entry, index) => (
            <div
              key={index}
              className={`answer-container ${
                entry.answer.chartSpec ? "left-aligned" : "center-aligned"
              }`}
            >
              <div className="answer-content">
                <div className="question">{entry.question}</div>
                <div className="answer">{entry.answer.textAnswer}</div>
              </div>
              {entry.answer.chartSpec && (
                <div className="chart-container">
                  <VegaLite spec={entry.answer.chartSpec} />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No chat history yet. Ask a question!</p>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="search-section">
        <div className="search-bar-bottom">
          <input
            type="text"
            className="search-input"
            placeholder="Type your question..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            aria-label="Search Query"
          />
          <button
            className="search-button"
            onClick={handleSend}
            aria-label="Search Button"
          >
            <Search className="search-icon" />
          </button>
          <button
            className="send-button"
            onClick={handleSend}
            aria-label="Send or Speak"
          >
            {searchQuery ? <Send /> : <Mic />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
