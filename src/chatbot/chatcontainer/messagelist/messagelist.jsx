import { forwardRef, useEffect, useState, useRef } from "react";
import LoadingIndicator from "./loadingindicator";
import { FiVolume2 } from "react-icons/fi";
import "./messagelist.css";

const MessageList = forwardRef(
  ({ messages, isLoading, scrollRef, isDarkMode }, ref) => {
    const [speaking, setSpeaking] = useState(false);
    const synthRef = useRef(null);

    useEffect(() => {
      synthRef.current = window.speechSynthesis;
      return () => {
        if (synthRef.current && synthRef.current.speaking) {
          synthRef.current.cancel();
        }
      };
    }, []);

    const readMessage = (text) => {
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
        setSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      synthRef.current.speak(utterance);
    };

    return (
      <div className="message-list" ref={ref}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}

            {message.files && message.files.length > 0 && (
              <div className="message-files">
                {message.files.map((file, i) => (
                  <div key={i} className="file-preview">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="file-image"
                      />
                    ) : (
                      <a
                        href={file.url}
                        download={file.name}
                        className="file-download"
                      >
                        📄 {file.name} ({Math.round(file.size / 1024)} KB)
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {message.sender === "bot" && (
              <button
                className={`read-aloud ${speaking ? "active" : ""}`}
                onClick={() => readMessage(message.text)}
                title="Lire à haute voix"
              >
                <FiVolume2 />
              </button>
            )}
          </div>
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={scrollRef} />
      </div>
    );
  }
);

export default MessageList;
