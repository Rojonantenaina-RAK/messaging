// header.jsx
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import SettingsModal from "../setting/setting";
import "./header.css";
import { useTranslation } from "../../../services/usetranslation";

const Header = ({
  isDarkMode,
  toggleDarkMode,
  currentLanguage,
  onLanguageChange,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t } = useTranslation(currentLanguage);

  return (
    <div className="chat-header">
      <h2>IKOM {t("chat")}</h2>

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
