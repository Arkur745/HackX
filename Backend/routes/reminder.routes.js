import express from "express";
import {
  createReminder,
  getPendingReminders,
  deleteReminder,
  completeReminder,
} from "../controllers/reminderController.js";
import { requireAuth } from "../middleware/clerk.middleware.js";

const router = express.Router();

// @route   POST /api/reminders/create
// @desc    Creates a new reminder
// @access  Protected
router.post("/create", requireAuth, createReminder);

// @route   GET /api/reminders/user/:userId
// @desc    Gets all pending reminders for a user
// @access  Protected
router.get("/user/:userId", requireAuth, getPendingReminders);

// @route   DELETE /api/reminders/delete/:reminderId
// @desc    Deletes a specific reminder
// @access  Protected
router.delete("/delete/:reminderId", requireAuth, deleteReminder);

// @route   PUT /api/reminders/complete/:reminderId
// @desc    Marks a specific reminder as 'DONE'
// @access  Protected
router.put("/complete/:reminderId", requireAuth, completeReminder);

export default router;
