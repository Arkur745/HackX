import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const VoiceInput = ({ onTranscript, onError, language = "en-US" }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      onError?.("Speech recognition is not supported in this browser.");
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcriptPart + " ";
        } else {
          interim += transcriptPart;
        }
      }

      setInterimTranscript(interim);

      if (final) {
        const newTranscript = transcript + final;
        setTranscript(newTranscript);
        onTranscript(newTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);

      let errorMessage = "An error occurred during speech recognition.";
      if (event.error === "no-speech") {
        errorMessage = "No speech detected. Please try again.";
      } else if (event.error === "not-allowed") {
        errorMessage =
          "Microphone access denied. Please enable microphone permissions.";
      } else if (event.error === "network") {
        errorMessage = "Network error. Please check your connection.";
      }

      onError?.(errorMessage);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onTranscript, onError, transcript]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      setInterimTranscript("");
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Microphone Button */}
      <button
        onClick={toggleListening}
        className={`relative p-4 rounded-full transition-all duration-300 active:scale-95 ${
          isListening
            ? "bg-black text-white shadow-lg animate-pulse"
            : "bg-white text-black border-2 border-black hover:bg-gray-100"
        }`}
        aria-label={isListening ? "Stop recording" : "Start recording"}
      >
        {/* Glowing effect when listening */}
        {isListening && (
          <div className="absolute inset-0 rounded-full bg-black animate-ping opacity-20"></div>
        )}

        <svg
          className="w-6 h-6 relative z-10"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Real-time Transcript Display */}
      {(transcript || interimTranscript) && (
        <div className="w-full max-w-md p-4 bg-secondary rounded-xl border border-border transition-colors duration-300">
          <p className="text-sm text-foreground">
            <span className="font-medium">{transcript}</span>
            <span className="text-muted-foreground italic">
              {interimTranscript}
            </span>
          </p>
        </div>
      )}

      {/* Status Text */}
      <p className="text-xs text-muted-foreground">
        {isListening ? "Listening..." : "Click to start recording"}
      </p>
    </div>
  );
};

VoiceInput.propTypes = {
  onTranscript: PropTypes.func.isRequired,
  onError: PropTypes.func,
  language: PropTypes.string,
};

export default VoiceInput;
