import { useEffect, useRef } from "react";
import "./setting.css";

const SettingsModal = ({ isOpen, onClose, isDarkMode, toggleDarkMode }) => {
  const modalRef = useRef();

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
        <h3>Paramètres</h3>
        <div className="setting-item">
          <label>Mode sombre</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
