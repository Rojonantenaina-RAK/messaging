import { useState, useEffect, useRef } from "react";
import { FiPaperclip, FiMic, FiSend, FiX } from "react-icons/fi";
import { FaMicrophoneAlt } from "react-icons/fa";
import "./messageinput.css";

const MessageInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [filesToSend, setFilesToSend] = useState([]);
  const [recordingError, setRecordingError] = useState(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((message.trim() || filesToSend.length > 0) && !isLoading) {
      onSendMessage(message, filesToSend);
      setMessage("");
      setFilesToSend([]);
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

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length > 0) {
      setFilesToSend((prev) => [...prev, ...newFiles]);
      e.target.value = null;
    }
  };

  const removeFile = (index) => {
    setFilesToSend((prev) => prev.filter((_, i) => i !== index));
  };

  const startVoiceRecording = () => {
    setRecordingError(null);
    setMessage("");

    if (!("webkitSpeechRecognition" in window)) {
      setRecordingError("Reconnaissance vocale non supportée");
      return;
    }

    try {
      setIsRecording(true);
      setIsListening(true);

      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "fr-FR";

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        handleRecognitionError(event.error);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        setIsListening(false);
      };

      recognitionRef.current.start();
    } catch (err) {
      handleRecognitionError(err);
    }
  };

  const handleRecognitionError = (error) => {
    let errorMessage = "Erreur d'accès au microphone";

    switch (error) {
      case "NotAllowedError":
      case "PermissionDeniedError":
        errorMessage =
          "Microphone bloqué par le système. Vérifiez les paramètres de votre OS";
        break;
      case "audio-capture":
        errorMessage = "Aucun microphone détecté";
        break;
      case "NotSupportedError":
        errorMessage = "Fonction non supportée dans ce navigateur";
        break;
      default:
        errorMessage = `Erreur: ${error}`;
    }

    setRecordingError(errorMessage);
    setIsRecording(false);
    setIsListening(false);
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIsListening(false);
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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

      {filesToSend.length > 0 && (
        <div className="files-preview-container">
          {filesToSend.map((file, index) => (
            <div key={index} className="file-preview-item">
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="remove-file-button"
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="input-wrapper">
        <div className="input-actions">
          <button
            type="button"
            className={`action-button ${isRecording ? "recording" : ""} ${
              isListening ? "listening" : ""
            }`}
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            title="Saisie vocale"
          >
            {isRecording ? (
              <div className="voice-animation">
                <div className="voice-dot"></div>
                <div className="voice-dot"></div>
                <div className="voice-dot"></div>
              </div>
            ) : (
              <FiMic />
            )}
          </button>
          <button
            type="button"
            className="action-button"
            onClick={() => fileInputRef.current.click()}
            title="Joindre un fichier"
          >
            <FiPaperclip />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: "none" }}
              multiple
            />
          </button>
        </div>

        <textarea
          rows="2"
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écrivez un message..."
          className="message-input"
          disabled={isLoading}
        />

        <button
          type="submit"
          className={`send-button ${
            message.trim() || filesToSend.length > 0 ? "active" : ""
          }`}
          disabled={(!message.trim() && filesToSend.length === 0) || isLoading}
          title="Envoyer"
        >
          <FiSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
