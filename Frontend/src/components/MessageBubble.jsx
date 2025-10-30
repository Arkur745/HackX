import PropTypes from "prop-types";

const MessageBubble = ({ message, sender, timestamp, isVoice }) => {
  const isUser = sender === "user";
  const time = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 animate-fade-in`}
    >
      <div
        className={`max-w-[70%] sm:max-w-[60%] rounded-2xl px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg ${
          isUser
            ? "bg-white text-black border border-gray-200"
            : "bg-black text-white"
        }`}
      >
        {/* Message Text */}
        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
          {message}
        </p>

        {/* Timestamp and Voice Indicator */}
        <div
          className={`flex items-center gap-2 mt-2 text-xs ${
            isUser ? "text-gray-500" : "text-gray-400"
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
