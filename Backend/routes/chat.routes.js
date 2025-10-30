import express from "express";
import { sendMessage, startOrGetConversation } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chat/send
router.post("/send", sendMessage);
router.post("/start", startOrGetConversation)

export default router;
