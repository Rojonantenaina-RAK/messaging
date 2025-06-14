import { useState } from "react";
import "./sidebar.css";

import { FiMessageSquare } from "react-icons/fi";
import { useTranslation } from "../../services/usetranslation";

const Sidebar = ({ isCollapsed, currentLanguage }) => {
  const { t } = useTranslation(currentLanguage);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "Application des commandes",
      preview: "Workflow Git pour travail en équ.",
      time: "Today",
    },
    {
      id: 2,
      title: "Principe des sociétés réseau",
      preview: "Explication des concepts clés",
      time: "Today",
    },
    {
      id: 3,
      title: "Préparation hackathon",
      preview: "Frontend et outils à maîtriser",
      time: "Today",
    },
    {
      id: 4,
      title: "Développement jeu vidéo",
      preview: "Je veux développer un jeu vidéo",
      time: "7 Days",
    },
  ]);

  const [activeId, setActiveId] = useState(1);

  return (
    <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <button className="new-chat-btn">
        <FiMessageSquare className="icon" />
        {!isCollapsed && t("newChat")}
      </button>

      <div className="conversations-section">
        {!isCollapsed && <div className="time-label">{t("today")}</div>}
        {conversations
          .filter((c) => c.time === t("Today"))
          .map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${
                activeId === conv.id ? "active" : ""
              }`}
              onClick={() => setActiveId(conv.id)}
              data-title={conv.title}
            >
              {conv.icon}
              {!isCollapsed && (
                <div className="conv-content">
                  <div className="conv-title">{conv.title}</div>
                  <div className="conv-preview">{conv.preview}</div>
                </div>
              )}
            </div>
          ))}

        {!isCollapsed && <div className="time-label">7 Jours</div>}
        {conversations
          .filter((c) => c.time === "7 Days")
          .map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${
                activeId === conv.id ? "active" : ""
              }`}
              onClick={() => setActiveId(conv.id)}
              data-title={conv.title}
            >
              {conv.icon}
              {!isCollapsed && (
                <div className="conv-content">
                  <div className="conv-title">{conv.title}</div>
                  <div className="conv-preview">{conv.preview}</div>
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="user-profile">
        <div className="avatar">U</div>
        {!isCollapsed && (
          <div className="user-info">
            <div className="username">{t("user")}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
