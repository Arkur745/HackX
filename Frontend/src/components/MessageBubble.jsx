import PropTypes from "prop-types";

const MessageBubble = ({ message, sender, timestamp, isVoice }) => {
  const isUser = sender === "user";
  const time = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`group flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 animate-fade-in`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className="shrink-0 mr-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-soft">
            <svg
              className="w-5 h-5 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      )}

      <div
        className={`max-w-[75%] sm:max-w-[70%] ${
          isUser
            ? "bg-foreground text-background rounded-2xl px-4 py-3 shadow-md"
            : "bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 text-foreground rounded-2xl px-4 py-3 shadow-soft"
        } transition-all duration-300 group-hover:shadow-lg`}
      >
        {/* Message Text */}
        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap wrap-break-word">
          {message}
        </p>

        {/* Timestamp and Voice Indicator */}
        <div
          className={`flex items-center gap-2 mt-2 text-xs ${
            isUser ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          <span>{time}</span>
          {isVoice && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
              Voice
            </span>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="shrink-0 ml-3">
          <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shadow-md">
            <span className="text-background text-sm font-semibold">You</span>
          </div>
        </div>
      )}
    </div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.oneOf(["user", "bot"]).isRequired,
  timestamp: PropTypes.string.isRequired,
  isVoice: PropTypes.bool,
};

MessageBubble.defaultProps = {
  isVoice: false,
};

export default MessageBubble;
