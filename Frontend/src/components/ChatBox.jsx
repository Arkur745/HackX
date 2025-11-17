import { useState, useEffect, useRef } from "react";
import { useChatContext } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";
import VoiceInput from "./VoiceInput";
import ChatSidebar from "./ChatSidebar";
import { Menu, X } from "lucide-react";

const ChatBox = () => {
  const {
    messages,
    isTyping,
    error,
    isInitialized,
    loadConversations,
    sendMessage,
    clearError,
  } = useChatContext();

  const [inputText, setInputText] = useState("");
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load conversations when ChatBox mounts (when user actually visits chat tab)
  useEffect(() => {
    if (!isInitialized) {
      console.log("📱 ChatBox mounted - loading conversations now");
      loadConversations();
    }
  }, [isInitialized, loadConversations]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const messageToSend = inputText;
    setInputText("");
    await sendMessage(messageToSend, false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceTranscript = async (transcript) => {
    setInputText(transcript);
    setShowVoiceInput(false);
    // Auto-send voice message
    await sendMessage(transcript, true);
    setInputText("");
  };

  const handleVoiceError = (errorMessage) => {
    alert(errorMessage);
    setShowVoiceInput(false);
  };

  // Text-to-Speech for bot messages
  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = "en-US";

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background/50 rounded-xl overflow-hidden shadow-soft transition-all duration-300">
      {/* Chat Sidebar */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-card/50 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 bg-card/80 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>

            <div>
              <h2 className="text-lg font-semibold text-foreground">
                HealX.ai Assistant
              </h2>
              <p className="text-xs text-muted-foreground">
                Your AI health companion
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Online
            </span>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 flex justify-between items-center">
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            <button
              onClick={clearError}
              className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/50 transition-colors duration-300">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-foreground rounded-full flex items-center justify-center mb-4 shadow-soft">
                <svg
                  className="w-10 h-10 text-background"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Start a conversation
              </h3>
              <p className="text-muted-foreground max-w-md">
                Ask me anything about your health, medical reports, or schedule
                an appointment. You can type or use voice input.
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div key={msg.id || index}>
                  <MessageBubble
                    message={msg.text}
                    sender={msg.sender}
                    timestamp={msg.timestamp}
                    isVoice={msg.isVoice}
                  />
                  {/* TTS Button for bot messages */}
                  {msg.sender === "bot" && (
                    <div className="flex justify-start mb-4">
                      <button
                        onClick={() => speakMessage(msg.text)}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Listen
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-foreground text-background rounded-2xl px-4 py-3 shadow-md">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-background rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-background rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-background rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Voice Input Modal */}
        {showVoiceInput && (
          <div
            className="modal-overlay"
            onClick={() => setShowVoiceInput(false)}
          >
            <div
              className="bg-card shadow-soft rounded-xl p-8 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <VoiceInput
                onTranscript={handleVoiceTranscript}
                onError={handleVoiceError}
                language="en-US"
              />
              <button
                onClick={() => setShowVoiceInput(false)}
                className="mt-4 w-full btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-card/80 backdrop-blur-sm p-4 transition-colors duration-300 shadow-soft border-t border-white/10">
          <div className="flex gap-2 items-end">
            {/* Text Input */}
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or use voice input..."
                rows={1}
                className="input-field resize-none"
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
            </div>

            {/* Voice Button */}
            <button
              onClick={() => setShowVoiceInput(true)}
              className="p-3 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all duration-200 active:scale-95"
              aria-label="Voice input"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Send message"
            >
              {isTyping ? (
                // Loading spinner
                <svg
                  className="w-6 h-6 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                // Send icon
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              )}
            </button>

            {/* Stop Speaking Button (shown when TTS is active) */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 active:scale-95"
                aria-label="Stop speaking"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
