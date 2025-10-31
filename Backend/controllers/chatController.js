// backend/controllers/chat.controller.js
import Conversation from "../models/conversations.model.js";
import Message from "../models/messages.model.js";
import MedicalReport from "../models/medicalReports.models.js";
import { getSTMContext, addToSTM, getRecentContext } from "../storage/stm.js";
import { generateResponse } from "../utils/shivaayAPI.js";
// import { textToSpeech } from "../utils/tts.js"; // optional

/**
 * Helper function to clean markdown formatting from text
 * Removes # (headers) and * (bold/italic) markers while preserving spacing and paragraphs
 */
const cleanMarkdown = (text) => {
  if (!text) return text;

  return (
    text
      // Remove header markers (# ## ### etc.) but keep the text on new line
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold markers (**text** or __text__)
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/__(.+?)__/g, "$1")
      // Remove italic markers (*text* or _text_)
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/_(.+?)_/g, "$1")
      // Remove inline code markers (`text`)
      .replace(/`(.+?)`/g, "$1")
      // Remove horizontal rules (--- or ***)
      .replace(/^[-*_]{3,}\s*$/gm, "")
      // Clean up any remaining standalone * or #
      .replace(/[\*#]/g, "")
      // Normalize line breaks - replace multiple newlines with double newline (paragraph)
      .replace(/\n{3,}/g, "\n\n")
      // Clean up spaces at the end of lines
      .replace(/[ \t]+$/gm, "")
      // Clean up multiple spaces on the same line (but preserve single spaces)
      .replace(/[ \t]{2,}/g, " ")
      // Trim whitespace from start and end
      .trim()
  );
};

export const sendMessage = async (req, res) => {
  try {
    // Get userId from Clerk middleware (req.userId is set by requireAuth)
    const userId = req.userId;
    const { conversationId, message, text, isVoice } = req.body;

    // Support both 'message' and 'text' field names
    const messageText = message || text;
    const convId = conversationId;

    if (!userId || !convId || !messageText) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure conversation exists (optional check)
    const conv = await Conversation.findById(convId).lean();
    if (!conv) return res.status(404).json({ error: "Conversation not found" });

    // Ensure STM is loaded
    await getSTMContext(convId);

    // Use recent STM (not including the new user message yet)
    const stmContext = getRecentContext(convId, 6); // adjust count

    // Fetch most recent medical reports for user (limit 3)
    const reports = await MedicalReport.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    const medicalSummary = reports
      .map(
        (r) =>
          `Report: ${r.reportName || "Unnamed"}\nSummary: ${
            r.summary || "No summary available"
          }`
      )
      .join("\n\n");

    // Persist user message (so future context includes it)
    await addToSTM(convId, userId, "user", messageText);

    // Generate LLM reply with context + medical summary
    const rawAssistantText = await generateResponse(
      messageText,
      stmContext,
      medicalSummary
    );

    // Clean markdown formatting from the AI response
    const assistantText = cleanMarkdown(rawAssistantText);

    // Persist assistant reply
    await addToSTM(convId, userId, "assistant", assistantText);

    // Optional: generate TTS (may be null if not configured)
    // const audio = await textToSpeech(assistantText); // returns URL or null

    // Return messages and audio if available
    res.status(200).json({
      messages: [
        { role: "user", text: messageText },
        { role: "assistant", text: assistantText },
      ],
      message: assistantText,
      text: assistantText,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("❌ sendMessage error:", err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const startOrGetConversation = async (req, res) => {
  try {
    // Get userId from Clerk middleware (req.userId is set by requireAuth)
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // ALWAYS create a new conversation when this endpoint is called
    // This allows users to have multiple conversations
    const conversation = new Conversation({
      userId: userId,
    });
    await conversation.save();

    console.log(
      `✅ Created new conversation ${conversation._id} for user ${userId}`
    );

    // Return the conversation's actual _id
    res.status(200).json({
      convId: conversation._id, // This is the ObjectId (e.g., "653f8a...")
      id: conversation._id, // Also provide 'id' for frontend compatibility
      userId: conversation.userId,
      createdAt: conversation.createdAt,
    });
  } catch (err) {
    console.error("❌ startOrGetConversation error:", err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

/**
 * @desc    Get all conversations for the authenticated user
 * @route   GET /api/chat/conversations
 * @access  Private (requires Clerk authentication)
 */
export const getConversations = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const conversations = await Conversation.find({ userId })
      .sort({ updatedAt: -1 })
      .lean();

    console.log(
      `📋 Found ${conversations.length} conversations for user ${userId}`
    );

    // Format conversations with title and lastMessage from their messages
    const formattedConversations = await Promise.all(
      conversations.map(async (conv) => {
        // Get the last message for this conversation
        const lastMessage = await Message.findOne({ conversationId: conv._id })
          .sort({ createdAt: -1 })
          .lean();

        // Get the first message for title
        const firstMessage = await Message.findOne({ conversationId: conv._id })
          .sort({ createdAt: 1 })
          .lean();

        const title = firstMessage
          ? firstMessage.content.slice(0, 50) +
            (firstMessage.content.length > 50 ? "..." : "")
          : "New Conversation";

        return {
          id: conv._id,
          title: title,
          lastMessage: lastMessage ? lastMessage.content.slice(0, 100) : "",
          createdAt: conv.createdAt,
          updatedAt: lastMessage ? lastMessage.createdAt : conv.updatedAt,
        };
      })
    );

    console.log(
      `✅ Returning ${formattedConversations.length} formatted conversations`
    );
    res.status(200).json(formattedConversations);
  } catch (err) {
    console.error("❌ getConversations error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Get all messages for a specific conversation
 * @route   GET /api/chat/messages/:conversationId
 * @access  Private (requires Clerk authentication)
 */
export const getMessages = async (req, res) => {
  try {
    const userId = req.userId;
    const { conversationId } = req.params;

    if (!userId || !conversationId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify conversation belongs to user
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (conversation.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized access to conversation" });
    }

    // Load messages directly from MongoDB (not from cache)
    const dbMessages = await Message.find({ conversationId })
      .sort({ createdAt: 1 }) // Oldest first
      .lean();

    console.log(
      `📨 Loading ${dbMessages.length} messages for conversation ${conversationId}`
    );

    // Format messages for frontend
    const formattedMessages = dbMessages.map((msg, index) => ({
      id: msg._id || `${conversationId}-${index}`,
      text: msg.content,
      sender: msg.sender === "USER" ? "user" : "bot",
      timestamp: msg.createdAt || new Date().toISOString(),
      isVoice: msg.type === "VOICE",
    }));

    res.status(200).json(formattedMessages);
  } catch (err) {
    console.error("❌ getMessages error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Delete a conversation and all its messages
 * @route   DELETE /api/chat/conversations/:conversationId
 * @access  Private (requires Clerk authentication)
 */
export const deleteConversation = async (req, res) => {
  try {
    const userId = req.userId;
    const { conversationId } = req.params;

    if (!userId || !conversationId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify conversation exists and belongs to user
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (conversation.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this conversation" });
    }

    // Delete all messages in the conversation
    const deletedMessages = await Message.deleteMany({ conversationId });
    console.log(
      `🗑️ Deleted ${deletedMessages.deletedCount} messages for conversation ${conversationId}`
    );

    // Delete the conversation itself
    await Conversation.findByIdAndDelete(conversationId);
    console.log(`✅ Deleted conversation ${conversationId} for user ${userId}`);

    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
      deletedMessages: deletedMessages.deletedCount,
    });
  } catch (err) {
    console.error("❌ deleteConversation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
