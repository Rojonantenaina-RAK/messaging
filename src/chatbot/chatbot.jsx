import { useState, useRef, useEffect } from "react";
import ChatContainer from "./chatcontainer/chatcontainer";
import Header from "./chatcontainer/header/header";
import MessageList from "./chatcontainer/messagelist/messagelist";
import MessageInput from "./chatcontainer/messageinput/messageinput";
import SideBar from "./sidebar/sidebar";
import { FiMenu, FiChevronLeft } from "react-icons/fi";
import "./chatbot.css";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });
  const [currentLanguage, setCurrentLanguage] = useState("fr");
  const messagesEndRef = useRef(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
    document.documentElement.classList.toggle("light-mode", !isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const fetchMessages = async (conversationId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/conversations_chat/${conversationId}/details/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/conversations_chat/list/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };
    initializeChat();
  }, []);

  const handleConversationChange = async (id) => {
    setActiveConversationId(id);
    fetchMessages(id);
  };

  const createNewConversation = async (message) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/conversations_chat/nouveau/`,
        {
          message: message,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActiveConversationId(response.data.id);
      setMessages(messages);
      return response.data.id;
    } catch (error) {
      console.error("Error creating new conversation:", error);
      return null;
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (activeConversationId) {
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/conversations_chat/nouveau/`,
          {
            conversation_chat_id: activeConversationId,
            message: message,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessages(response.data.messages || []);
      } else {
        await createNewConversation(message);
      }

      // setActiveConversationId(conversationId);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        contenu: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        reponse_de_bot: true,
        creer_le: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`chatbot-page ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <SideBar
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={toggleSidebar}
        isDarkMode={isDarkMode}
        currentLanguage={currentLanguage}
        activeConversationId={activeConversationId}
        onConversationChange={handleConversationChange}
        messages={messages}
        setMessages={setMessages}
      />
      <ChatContainer isDarkMode={isDarkMode}>
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          {isSidebarCollapsed ? <FiMenu /> : <FiChevronLeft />}
        </button>
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
        <MessageList
          messages={messages}
          isLoading={isLoading}
          ref={messageListRef}
          scrollRef={messagesEndRef}
          isDarkMode={isDarkMode}
          currentLanguage={currentLanguage}
          conversationId={activeConversationId}
        />
        <MessageInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          currentLanguage={currentLanguage}
        />
      </ChatContainer>
    </div>
  );
};

export default ChatBot;
