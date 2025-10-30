// backend/controllers/chat.controller.js
import  Conversation  from "../models/conversations.model.js";
import  MedicalReport from "../models/medicalReports.models.js";
import { getSTMContext, addToSTM, getRecentContext } from "../storage/stm.js";
import { generateResponse } from "../utils/shivaayAPI.js";
// import { textToSpeech } from "../utils/tts.js"; // optional

export const sendMessage = async (req, res) => {
  try {
    const { userId, convId, text } = req.body;
    if (!userId || !convId || !text)
      return res.status(400).json({ error: "Missing required fields" });

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
    await addToSTM(convId, userId, "user", text);

    // Generate LLM reply with context + medical summary
    const assistantText = await generateResponse(
      text,
      stmContext,
      medicalSummary
    );

    // Persist assistant reply
    await addToSTM(convId, userId, "assistant", assistantText);

    // Optional: generate TTS (may be null if not configured)
    // const audio = await textToSpeech(assistantText); // returns URL or null

    // Return messages and audio if available
    res.status(200).json({
      messages: [
        { role: "user", text },
        { role: "assistant", text: assistantText },
      ],
    });
  } catch (err) {
    console.error("❌ sendMessage error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const startOrGetConversation = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Find a conversation that already belongs to this user
    // This works with your temporary "Mixed" type for userId
    let conversation = await Conversation.findOne({ userId: userId });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = new Conversation({
        userId: userId,
      });
      await conversation.save();
    }

    // Return the conversation's actual _id
    res.status(200).json({
      convId: conversation._id, // This is the ObjectId (e.g., "653f8a...")
      userId: conversation.userId,
      createdAt: conversation.createdAt,
    });
  } catch (err) {
    console.error("❌ startOrGetConversation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

