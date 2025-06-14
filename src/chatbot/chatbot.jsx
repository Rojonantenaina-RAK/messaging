import { useState, useRef, useEffect } from "react";
import ChatContainer from "./chatcontainer/chatcontainer";
import Header from "./chatcontainer/header/header";
import MessageList from "./chatcontainer/messagelist/messagelist";
import MessageInput from "./chatcontainer/messageinput/messageinput";
import SideBar from "./sidebar/sidebar";
import { FiMenu, FiChevronLeft } from "react-icons/fi";
import "./chatbot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check user's preferred color scheme
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });
  const messagesEndRef = useRef(null);
  const messageListRef = useRef(null);

  // Apply dark/light mode to document root
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
    document.documentElement.classList.toggle("light-mode", !isDarkMode);

    // Save preference to localStorage
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleSendMessage = async (message, files = []) => {
    const newMessage = {
      text: message,
      sender: "user",
      files: files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      })),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse = {
        text: "Voici une réponse simulée de l'IA. Dans une application réelle, cela proviendrait d'un modèle d'IA.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 5500);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
      />
      <ChatContainer isDarkMode={isDarkMode}>
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          {isSidebarCollapsed ? <FiMenu /> : <FiChevronLeft />}
        </button>
        <Header
          title="IKOM Chat"
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <MessageList
          messages={messages}
          isLoading={isLoading}
          ref={messageListRef}
          scrollRef={messagesEndRef}
          isDarkMode={isDarkMode}
        />
        <MessageInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
      </ChatContainer>
    </div>
  );
};

export default ChatBot;
