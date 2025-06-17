import { forwardRef, useEffect, useRef, useState } from "react";
import LoadingIndicator from "./loadingindicator";
import { FiVolume2 } from "react-icons/fi";
import "./messagelist.css";

const MessageList = forwardRef(
  (
    { messages = [], isLoading, scrollRef, currentLanguage, isDarkMode },
    ref
  ) => {
    const [speaking, setSpeaking] = useState(false);
    const synthRef = useRef(null);

    useEffect(() => {
      synthRef.current = window.speechSynthesis;
      return () => {
        if (synthRef.current?.speaking) {
          synthRef.current.cancel();
        }
      };
    }, []);

    const readMessage = (text) => {
      if (synthRef.current?.speaking) {
        synthRef.current.cancel();
        setSpeaking(false);
        return;
      }

      const langMap = {
        fr: "fr-FR",
        en: "en-US",
        mg: "fr-FR",
        es: "es-ES",
        de: "de-DE",
        it: "it-IT",
        pt: "pt-PT",
        ru: "ru-RU",
        zh: "zh-CN",
        ja: "ja-JP",
        ar: "ar-SA",
      };

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langMap[currentLanguage] || "fr-FR";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      synthRef.current?.speak(utterance);
    };

    return (
      <div className="message-list" ref={ref}>
        {messages.map((message, index) => (
          <div
            key={`${message.id || index}-${message.creer_le}`}
            className={`message ${message.reponse_de_bot ? "bot" : "user"} ${
              isDarkMode ? "dark" : "light"
            }`}
          >
            <div className="message-content">{message.contenu}</div>
            <div className="message-meta">
              <span className="message-time">
                {new Date(message.creer_le).toLocaleTimeString(
                  currentLanguage,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </span>
              {message.reponse_de_bot && (
                <button
                  className={`read-aloud ${speaking ? "active" : ""}`}
                  onClick={() => readMessage(message.contenu)}
                  title={
                    currentLanguage === "en"
                      ? "Read aloud"
                      : "Lire à haute voix"
                  }
                >
                  <FiVolume2 />
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && <LoadingIndicator />}
        <div ref={scrollRef} />
      </div>
    );
  }
);

export default MessageList;
