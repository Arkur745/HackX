import { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { Search, Plus, Trash2, MessageSquare } from "lucide-react";

const ChatSidebar = ({ isOpen, onClose }) => {
  const {
    conversations,
    currentConversation,
    setCurrentConversation,
    createNewConversation,
    deleteConversation,
  } = useChatContext();

  const [searchQuery, setSearchQuery] = useState("");

  const handleNewChat = async () => {
    await createNewConversation();
    if (onClose) onClose(); // Close mobile sidebar after creating
  };

  const handleSelectConversation = (conversationId) => {
    setCurrentConversation(conversationId);
    if (onClose) onClose(); // Close mobile sidebar after selecting
  };

  const handleDeleteConversation = async (e, conversationId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      await deleteConversation(conversationId);
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative inset-y-0 left-0 z-50
          w-80 md:w-80 
          bg-card/95 backdrop-blur-lg
          border-r border-white/10
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-all duration-200 shadow-md active:scale-95 font-medium"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background/50 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "No conversations found"
                  : "No conversations yet"}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Start a new chat to begin
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={`
                  w-full text-left px-3 py-3 rounded-lg
                  transition-all duration-200 group
                  ${
                    currentConversation === conversation.id
                      ? "bg-foreground/10 shadow-soft"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate mb-1">
                      {conversation.title || "New Conversation"}
                    </h3>
                    {conversation.lastMessage && (
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {formatTimestamp(conversation.updatedAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) =>
                      handleDeleteConversation(e, conversation.id)
                    }
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded-md transition-all duration-200"
                    aria-label="Delete conversation"
                  >
                    <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                  </button>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-muted-foreground text-center">
            <p className="mb-1">💬 {conversations.length} conversations</p>
            <p className="text-muted-foreground/70">
              Your chat history is secure
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
