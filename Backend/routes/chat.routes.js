import express from "express";
import {
  sendMessage,
  startOrGetConversation,
  getConversations,
  getMessages,
  deleteConversation,
} from "../controllers/chatController.js";
import { requireAuth } from "../middleware/clerk.middleware.js";

const router = express.Router();

// GET /api/chat/conversations - Get all conversations for user
router.get("/conversations", requireAuth, getConversations);

// GET /api/chat/messages/:conversationId - Get messages for a conversation
router.get("/messages/:conversationId", requireAuth, getMessages);

// DELETE /api/chat/conversations/:conversationId - Delete a conversation
router.delete(
  "/conversations/:conversationId",
  requireAuth,
  deleteConversation
);

// POST /api/chat/send - Send a message
router.post("/send", requireAuth, sendMessage);

// POST /api/chat/start - Start or get a conversation
router.post("/start", requireAuth, startOrGetConversation);

export default router;
