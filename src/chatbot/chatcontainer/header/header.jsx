// header.jsx
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import SettingsModal from "../setting/setting";
import "./header.css";

const Header = ({
  title,
  isDarkMode,
  toggleDarkMode,
  currentLanguage,
  onLanguageChange,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="chat-header">
      <h2>{title}</h2>
      <button
        className="settings-btn"
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
      >
        <FiSettings className="icon" />
      </button>

      {isSettingsOpen && (
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
      )}
    </div>
  );
};

export default Header;
