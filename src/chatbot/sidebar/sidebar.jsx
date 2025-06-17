import { useState, useEffect, useCallback } from "react";
import "./sidebar.css";
import { FiMessageSquare, FiTrash2, FiMail } from "react-icons/fi";
import { useTranslation } from "../../services/usetranslation";
import axios from "axios";

const SideBar = ({
  isCollapsed,
  isDarkMode,
  currentLanguage,
  onConversationChange,
  activeConversationId,
}) => {
  const { t } = useTranslation(currentLanguage);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      setUserData(JSON.parse(user));
    }
    fetchConversations();
  }, []);

  const fetchConversations = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/conversations_chat/list/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConversations(response.data);
    } catch (err) {
      setError(
        t("errorFetchingConversations") || "Failed to load conversations"
      );
    } finally {
      setLoading(false);
    }
  }, [t]);

  const createNewConversation = useCallback(async () => {
    try {
      onConversationChange(activeConversationId);
    } catch (err) {
      setError(
        t("errorCreatingConversation") || "Failed to create conversation"
      );
    }
  }, [t, onConversationChange]);

  const deleteConversation = useCallback(
    async (id, e) => {
      e.stopPropagation();
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/conversations_chat/${id}/delete/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setConversations((prev) => prev.filter((conv) => conv.id !== id));

        if (activeConversationId === id) {
          const remainingConversations = conversations.filter(
            (conv) => conv.id !== id
          );
          if (remainingConversations.length > 0) {
            onConversationChange(remainingConversations[0].id);
          } else {
            createNewConversation();
          }
        }
      } catch (err) {
        setError(
          t("errorDeletingConversation") || "Failed to delete conversation"
        );
      }
    },
    [
      activeConversationId,
      conversations,
      createNewConversation,
      onConversationChange,
      t,
    ]
  );

  const getLastMessagePreview = useCallback((conversation) => {
    if (!conversation.messages?.length) return "";
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return lastMessage.contenu.length > 30
      ? `${lastMessage.contenu.substring(0, 30)}...`
      : lastMessage.contenu;
  }, []);

  const formatDate = useCallback(
    (dateString) => {
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) return t("today");
      if (date.toDateString() === yesterday.toDateString())
        return t("yesterday");

      return date.toLocaleDateString(currentLanguage, {
        month: "short",
        day: "numeric",
      });
    },
    [currentLanguage, t]
  );

  return (
    <div
      className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""} ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      <button className="new-chat-btn" onClick={createNewConversation}>
        <FiMessageSquare className="icon" />
        {!isCollapsed && (t("newChat") || "New Chat")}
      </button>

      {loading && <div className="sidebar-loading">{t("loading")}...</div>}
      {error && <div className="sidebar-error">{error}</div>}

      <div className="conversations-section">
        {conversations.length > 0 && !isCollapsed && (
          <div className="time-label">
            {t("recentConversations") || "Recent conversations"}
          </div>
        )}

        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`conversation-item ${
              activeConversationId === conv.id ? "active" : ""
            }`}
            onClick={() => onConversationChange(conv.id)}
          >
            <FiMessageSquare className="conv-icon" />
            {!isCollapsed && (
              <div className="conv-content">
                <div className="conv-title">
                  {conv.titre || t("newChat") || "New Chat"}
                  <button
                    className="conv-action-btn"
                    onClick={(e) => deleteConversation(conv.id, e)}
                    title={t("delete") || "Delete"}
                  >
                    <FiTrash2 />
                  </button>
                </div>
                <div className="conv-preview">
                  {getLastMessagePreview(conv)}
                </div>
                <div className="conv-date">{formatDate(conv.created_at)}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="user-profile">
        <div className="avatar">
          {userData?.nom?.charAt(0)?.toUpperCase() || "U"}
        </div>
        {!isCollapsed && userData && (
          <div className="user-info">
            <div className="username">{userData.nom}</div>
            <div className="user-email">
              <FiMail className="email-icon" />
              {userData.email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
