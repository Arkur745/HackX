import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { chatAPI } from "../services/api";

const ChatContext = createContext();

// Main provider component
function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Don't auto-load on mount - let ChatBox trigger it
  // This prevents loading before user is authenticated or navigates to chat
  useEffect(() => {
    // Only run if not already initialized
    if (!isInitialized) {
      console.log(
        "🎯 ChatProvider mounted but waiting for ChatBox to trigger load"
      );
    }
  }, [isInitialized]);

  // Wrap loadMessages in useCallback to prevent infinite loops
  const loadMessages = useCallback(async (conversationId) => {
    try {
      setLoading(true);
      console.log("📨 Loading messages for conversation:", conversationId);

      // Clear messages immediately to prevent mixing
      setMessages([]);

      const response = await chatAPI.getMessages(conversationId);
      console.log("📬 Messages received:", response.data?.length, "messages");
      console.log("📬 First message:", response.data?.[0]); // Debug: see what's being loaded

      setMessages(response.data || []);
      setError(null);
    } catch (err) {
      console.error("❌ Error loading messages:", err);
      setError("Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies - conversationId comes as parameter

  // Load messages when conversation changes
  useEffect(() => {
    console.log("🔔 currentConversation changed:", currentConversation);
    if (currentConversation) {
      loadMessages(currentConversation);
    } else {
      console.log("⚠️ No conversation selected, clearing messages");
      setMessages([]);
    }
  }, [currentConversation, loadMessages]);

  const loadConversations = useCallback(async (skipAutoSelect = false) => {
    try {
      setLoading(true);
      setIsInitialized(true); // Mark as initialized
      console.log("🔄 Loading conversations...");
      const response = await chatAPI.getConversations();
      console.log("📥 Conversations response:", response.data);
      const loadedConversations = response.data || [];
      console.log("📋 Loaded conversations count:", loadedConversations.length);
      setConversations(loadedConversations);

      // Auto-select the most recent conversation if none is selected and conversations exist
      // Skip auto-select if explicitly told to (e.g., when reloading after sending message)
      if (!skipAutoSelect) {
        // Use functional update to get latest currentConversation value
        setCurrentConversation((prevConversation) => {
          if (!prevConversation && loadedConversations.length > 0) {
            console.log(
              "✅ Auto-selecting conversation:",
              loadedConversations[0].id
            );
            return loadedConversations[0].id;
          } else {
            console.log("⏭️ Skipping auto-select:", {
              prevConversation,
              conversationsLength: loadedConversations.length,
            });
            return prevConversation; // Keep current selection
          }
        });
      } else {
        console.log("⏭️ Explicitly skipping auto-select (skipAutoSelect=true)");
      }

      setError(null);
    } catch (err) {
      console.error("❌ Error loading conversations:", err);
      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies - uses functional updates

  const createNewConversation = useCallback(async () => {
    try {
      setLoading(true);

      // Call backend API to create conversation
      const response = await chatAPI.createConversation();

      const newConversation = {
        id: response.data.id || response.data.convId,
        title: "New Conversation",
        lastMessage: "",
        createdAt: response.data.createdAt || new Date().toISOString(),
        updatedAt: response.data.updatedAt || new Date().toISOString(),
      };

      setConversations((prev) => [newConversation, ...prev]);
      setCurrentConversation(newConversation.id);
      setMessages([]);
      setError(null);

      return newConversation;
    } catch (err) {
      console.error("Error creating conversation:", err);
      setError("Failed to create conversation");

      // Return null on error
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies

  const sendMessage = useCallback(
    async (messageText, isVoice = false) => {
      try {
        setIsTyping(true);
        setError(null);

        console.log("💬 Sending message to conversation:", currentConversation);

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
          console.log("⚠️ No current conversation, creating new one...");
          const newConv = await createNewConversation();
          conversationId = newConv?.id;
          console.log("✅ Created new conversation:", conversationId);
        }

        console.log(
          "📤 Sending to backend with conversationId:",
          conversationId
        );

        // Send to backend
        const response = await chatAPI.sendMessage({
          conversationId,
          message: messageText,
          isVoice,
        });

        console.log("📥 Backend response received");

        // Add bot response to messages
        const botMessage = {
          id: response.data.id || Date.now() + 1,
          text: response.data.message || response.data.text,
          sender: "bot",
          timestamp: response.data.timestamp || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMessage]);

        // Reload conversations to get updated titles from backend
        // Pass skipAutoSelect=true to avoid changing the current conversation
        await loadConversations(true);

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
    },
    [currentConversation, loadConversations, createNewConversation]
  ); // Dependencies

  const deleteConversation = useCallback(
    async (conversationId) => {
      try {
        console.log("🗑️ Deleting conversation:", conversationId);
        await chatAPI.deleteConversation(conversationId);
        console.log("✅ Conversation deleted successfully");

        setConversations((prev) => prev.filter((c) => c.id !== conversationId));

        if (currentConversation === conversationId) {
          console.log("📝 Clearing current conversation and messages");
          setCurrentConversation(null);
          setMessages([]);
        }

        setError(null);
      } catch (err) {
        console.error("❌ Error deleting conversation:", err);
        console.error("Error details:", err.response?.data || err.message);
        setError("Failed to delete conversation. Please try again.");
      }
    },
    [currentConversation]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    isTyping,
    isInitialized,
    setCurrentConversation,
    loadConversations,
    sendMessage,
    createNewConversation,
    deleteConversation,
    clearMessages,
    clearError,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// Custom hook to use the chat context
function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}

// Export only the provider as default
export default ChatProvider;

// Export the hook as named export
export { useChatContext };
