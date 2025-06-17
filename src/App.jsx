import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import Landing from "./landing/landing";
import Discussion from "./discussion/discussion";
import Chatbot from "./chatbot/chatbot";
import Loging from "./login/login";
import SettingsModal from "./chatbot/chatcontainer/setting/setting";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });
  const [currentLanguage, setCurrentLanguage] = useState("fr");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
    document.documentElement.classList.toggle("light-mode", !isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <Router>
      <div className="app-container">
        <button
          className="settings-btn"
          onClick={() => setIsSettingsOpen(true)}
        >
          <FiSettings className="icon" />
        </button>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                isDarkMode={isDarkMode}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Loging
                isDarkMode={isDarkMode}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/chatbot"
            element={
              <Chatbot
                isDarkMode={isDarkMode}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/discussion"
            element={
              <Discussion
                isDarkMode={isDarkMode}
                currentLanguage={currentLanguage}
              />
            }
          />
        </Routes>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    </Router>
  );
}

export default App;
