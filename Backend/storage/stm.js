// backend/storage/stm.js
import Message from "../models/messages.model.js";

const stmCache = new Map();
const MAX_STM_MESSAGES = 10;

export const getSTMContext = async (convId) => {
  let stmMessages = stmCache.get(convId);

  if (!stmMessages) {
    const dbMessages = await Message.find({ conversationId: convId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    stmMessages = dbMessages
      .reverse()
      .map((m) => ({
        role:
          m.sender === m.sender ? (m.sender ? "user" : "assistant") : m.sender,
        text: m.content,
      }));
    // above line keeps original shape; if you store role in `sender` or `role`, adapt as needed.
    stmCache.set(convId, stmMessages);
    console.log(
      "🧠 STM cache initialized from DB:",
      stmMessages.length,
      "msgs"
    );
  }

  return stmMessages;
};

export const addToSTM = async (convId, userId, role, text) => {
  if (!stmCache.has(convId)) stmCache.set(convId, []);

  const stmMessages = stmCache.get(convId);
  stmMessages.push({ role, text });

  if (stmMessages.length > MAX_STM_MESSAGES) stmMessages.shift();
  stmCache.set(convId, stmMessages);

  await Message.create({
    userId,
    conversationId: convId,
    sender: role.toUpperCase() === "USER" ? "USER" : "ASSISTANT",
    content: text,
    createdAt: new Date(),
  }).catch((err) => console.error("⚠️ Mongo save error:", err));
};

export const getRecentContext = (convId, limit = 5) => {
  const stmMessages = stmCache.get(convId) || [];
  return stmMessages.slice(-limit);
};
