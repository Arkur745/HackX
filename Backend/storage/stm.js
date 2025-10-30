// backend/storage/stm.js
import Message from "../models/messages.model.js";

const stmCache = new Map();
const MAX_STM_MESSAGES = 10;

export const getSTMContext = async (convId) => {
  let stmMessages = stmCache.get(convId);

  if (!stmMessages) {
    const dbMessages = await Message.find({ conversationId: convId })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    stmMessages = dbMessages.reverse().map((m) => ({
      role: m.sender === "USER" ? "user" : "assistant",
      text: m.content,
    }));

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
  console.log(
    `💾 addToSTM called: convId=${convId}, role=${role}, textLength=${text.length}`
  );

  if (!stmCache.has(convId)) stmCache.set(convId, []);

  const stmMessages = stmCache.get(convId);
  stmMessages.push({ role, text });

  if (stmMessages.length > MAX_STM_MESSAGES) stmMessages.shift();
  stmCache.set(convId, stmMessages);

  // Save to MongoDB - Message model doesn't have userId field
  try {
    const savedMessage = await Message.create({
      conversationId: convId,
      sender: role.toUpperCase() === "USER" ? "USER" : "ASSISTANT",
      content: text,
      type: "TEXT",
      createdAt: new Date(),
    });
    console.log(
      `✅ Message saved to DB: ${savedMessage._id} (${role}) for conversation ${convId}`
    );
  } catch (err) {
    console.error("⚠️ Mongo save error:", err);
    console.error("Failed to save message:", {
      convId,
      role,
      textLength: text.length,
    });
  }
};

export const getRecentContext = (convId, limit = 5) => {
  const stmMessages = stmCache.get(convId) || [];
  return stmMessages.slice(-limit);
};
