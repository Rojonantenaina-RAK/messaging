import { useState, useEffect, useRef } from "react";
import "./setting.css";
import { getLanguages } from "../../../services/translate";
import { useTranslation } from "../../../services/usetranslation";

const SettingsModal = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
  currentLanguage,
  onLanguageChange,
}) => {
  const modalRef = useRef();
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const { t } = useTranslation(currentLanguage);

  useEffect(() => {
    const fetchLanguages = async () => {
      const langs = await getLanguages();
      setAvailableLanguages(langs);
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="settings-modal" ref={modalRef}>
        <h3>{t("settings")}</h3>
        <div className="setting-item">
          <label>{t("darkMode")}</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="setting-item">
          <label>{t("language")}</label>
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="language-select"
          >
            {availableLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
