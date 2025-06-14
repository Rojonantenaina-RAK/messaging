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

    try {
      // Traduire le message en français pour le traitement (si nécessaire)
      const messageToProcess =
        currentLanguage !== "fr" ? await translateText(message, "fr") : message;

      // Simuler le traitement de l'IA
      setTimeout(async () => {
        const aiResponseText =
          "Voici une réponse simulée de l'IA. Dans une application réelle, cela proviendrait d'un modèle d'IA.";

        // Traduire la réponse dans la langue sélectionnée si nécessaire
        const translatedResponse =
          currentLanguage !== "fr"
            ? await translateText(aiResponseText, currentLanguage)
            : aiResponseText;

        const aiResponse = {
          text: translatedResponse,
          sender: "bot",
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Translation error:", error);
      // En cas d'erreur, envoyer la réponse en français
      setTimeout(() => {
        const aiResponse = {
          text: "Voici une réponse simulée de l'IA. Dans une application réelle, cela proviendrait d'un modèle d'IA.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
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
      />
      <ChatContainer isDarkMode={isDarkMode}>
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          {isSidebarCollapsed ? <FiMenu /> : <FiChevronLeft />}
        </button>
        <Header
          title="IKOM Chat"
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
