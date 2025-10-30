import express from "express";
import {
  createReminder,
  getPendingReminders,
  deleteReminder,
  completeReminder,
} from "../controllers/reminderController.js";

// TODO: Import your Clerk middleware
// import { requireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

// @route   POST /api/reminders/create
// Creates a new reminder
router.post("/create", /* requireAuth, */ createReminder);

// @route   GET /api/reminders/user/:userId
// Gets all pending reminders for a user
// NOTE: For testing, pass userId in params.
// In production, your controller will get it from Clerk (req.auth.userId)
router.get("/user/:userId", /* requireAuth, */ getPendingReminders);

// @route   DELETE /api/reminders/delete/:reminderId
// Deletes a specific reminder
router.delete("/delete/:reminderId", /* requireAuth, */ deleteReminder);

// @route   PUT /api/reminders/complete/:reminderId
// Marks a specific reminder as 'DONE'
router.put("/complete/:reminderId", /* requireAuth, */ completeReminder);

export default router;
