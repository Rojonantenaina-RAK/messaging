import { useState, useRef, useEffect } from "react";
import ChatContainer from "./chatcontainer";
import Header from "./header";
import MessageList from "./messagelist";
import MessageInput from "./messageinput";
import LoadingIndicator from "./loadingindicator";
import SideBar from "./sidebar";
import "./chatbot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fonction pour envoyer un message
  const handleSendMessage = async (message) => {
    const newMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const aiResponse = {
        text: "Je suis une réponse simulée de l'IA. Dans une vraie application, je serais générée par un modèle d'IA.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-page">
      <SideBar />
      <ChatContainer>
        <Header title="ChatBot" />
        <MessageList messages={messages} isLoading={isLoading} />
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
        <MessageInput onSendMessage={handleSendMessage} />
      </ChatContainer>
    </div>
  );
};

export default ChatBot;
