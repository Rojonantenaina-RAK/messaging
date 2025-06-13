import { useState } from "react";
import "./sidebar.css";

const Sidebar = ({ onConversationSelect, onNewConversation }) => {
  const [conversations, setConversations] = useState([
    { id: 1, title: "Discussion 1", preview: "Dernier message..." },
    {
      id: 2,
      title: "Support technique",
      preview: "Comment puis-je vous aider?",
    },
    {
      id: 3,
      title: "Questions fréquentes",
      preview: "Voici quelques réponses...",
    },
  ]);
  const [activeConversation, setActiveConversation] = useState(1);

  const handleNewConversation = () => {
    const newId =
      conversations.length > 0
        ? Math.max(...conversations.map((c) => c.id)) + 1
        : 1;
    const newConversation = {
      id: newId,
      title: `Nouvelle discussion ${newId}`,
      preview: "Démarrer une nouvelle conversation...",
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newId);
    onNewConversation(newId);
  };

  const handleSelect = (id) => {
    setActiveConversation(id);
    onConversationSelect(id);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-button" onClick={handleNewConversation}>
          <i className="fas fa-comment-medical"></i>
        </button>
      </div>

      <div className="conversation-list">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`conversation-item ${
              activeConversation === conv.id ? "active" : ""
            }`}
            onClick={() => handleSelect(conv.id)}
          >
            <div className="conversation-title">{conv.title}</div>
            <div className="conversation-preview">{conv.preview}</div>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">U</div>
          <div className="user-name">Utilisateur</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
