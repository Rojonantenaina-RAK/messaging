import { useState, useEffect, useRef } from "react";
import { FiMic, FiSend } from "react-icons/fi";
import "./messageinput.css";
import { useTranslation } from "../../../services/usetranslation";

const MessageInput = ({ onSendMessage, isLoading, currentLanguage }) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const { t } = useTranslation(currentLanguage);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await onSendMessage(message);
      setMessage("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const startVoiceRecording = () => {
    setRecordingError(null);
    setMessage("");

    if (!("webkitSpeechRecognition" in window)) {
      setRecordingError(
        t("voiceNotSupported") || "Voice recognition not supported"
      );
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = currentLanguage === "fr" ? "fr-FR" : "en-US";

    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setMessage(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      setRecordingError(event.error);
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
    setIsRecording(true);
  };

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto";
      const maxHeight = 150;
      input.style.height = Math.min(input.scrollHeight, maxHeight) + "px";
      if (input.scrollHeight > maxHeight) {
        input.scrollTop = input.scrollHeight;
      }
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="message-input-container">
      {recordingError && (
        <div className="recording-error">{recordingError}</div>
      )}

      <div className="input-wrapper">
        <button
          type="button"
          className={`action-button ${isRecording ? "recording" : ""}`}
          onClick={startVoiceRecording}
          title={t("voiceInput")}
          disabled={isRecording}
        >
          <FiMic />
        </button>

        <textarea
          rows="1"
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("writeMessage")}
          className="message-input"
          disabled={isLoading}
        />

        <button
          type="submit"
          className={`send-button ${message.trim() ? "active" : ""}`}
          disabled={!message.trim() || isLoading}
          title={t("send")}
        >
          <FiSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
