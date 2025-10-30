import { createContext, useContext, useState, useEffect } from "react";
import { chatAPI } from "../services/api";

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  // Load messages when conversation changes
  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation);
    }
  }, [currentConversation]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await chatAPI.getConversations();
      setConversations(response.data);
      setError(null);
    } catch (err) {
      console.error("Error loading conversations:", err);
      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      setLoading(true);
      const response = await chatAPI.getMessages(conversationId);
      setMessages(response.data);
      setError(null);
    } catch (err) {
      console.error("Error loading messages:", err);
      setError("Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (messageText, isVoice = false) => {
    try {
      setIsTyping(true);
      setError(null);

      // Add user message to UI immediately
      const userMessage = {
        id: Date.now(),
        text: messageText,
        sender: "user",
        timestamp: new Date().toISOString(),
        isVoice,
      };
      setMessages((prev) => [...prev, userMessage]);

      // If no conversation exists, create one
      let conversationId = currentConversation;
      if (!conversationId) {
        const newConv = await createNewConversation();
        conversationId = newConv?.id;
      }

      // Send to backend
      const response = await chatAPI.sendMessage({
        conversationId,
        message: messageText,
        isVoice,
      });

      // Add bot response to messages
      const botMessage = {
        id: response.data.id || Date.now() + 1,
        text: response.data.message || response.data.text,
        sender: "bot",
        timestamp: response.data.timestamp || new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);

      // Update conversation title if it's the first message
      if (messages.length === 0) {
        const title =
          messageText.slice(0, 50) + (messageText.length > 50 ? "..." : "");
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  title,
                  lastMessage: messageText,
                  updatedAt: new Date().toISOString(),
                }
              : conv
          )
        );
      } else {
        // Update last message and timestamp
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  lastMessage: messageText,
                  updatedAt: new Date().toISOString(),
                }
              : conv
          )
        );
      }

      return botMessage;
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const createNewConversation = async () => {
    try {
      setLoading(true);

      // For demo purposes, create a local conversation
      const newConversation = {
        id: `conv-${Date.now()}`,
        title: "New Conversation",
        lastMessage: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setConversations((prev) => [newConversation, ...prev]);
      setCurrentConversation(newConversation.id);
      setMessages([]);
      setError(null);

      return newConversation;
    } catch (err) {
      console.error("Error creating conversation:", err);
      setError("Failed to create conversation");
    } finally {
      setLoading(false);
    }
  };

  const deleteConversation = async (conversationId) => {
    try {
      await chatAPI.deleteConversation(conversationId);
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));
      if (currentConversation === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
      setError(null);
    } catch (err) {
      console.error("Error deleting conversation:", err);
      setError("Failed to delete conversation");
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    isTyping,
    setCurrentConversation,
    loadConversations,
    sendMessage,
    createNewConversation,
    deleteConversation,
    clearMessages,
    clearError,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Don't export the context as default - export the provider instead
// This ensures React Fast Refresh works properly
export default ChatProvider;
