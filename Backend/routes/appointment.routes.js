import express from "express";
import {
  bookAppointment,
  getAppointmentsForUser,
  cancelAppointment,
} from "../controllers/appointmentController.js";

// TODO: Import your Clerk middleware
// import { requireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

// @route   POST /api/appointments/book
// This route is for the detailed web form
// We add requireAuth to protect this route
router.post("/book", /* requireAuth, */ bookAppointment);

// @route   GET /api/appointments/user
// Gets all appointments for a user
// NOTE: For testing, you'll need to pass userId in the params.
// In production, your controller will get it from Clerk (req.auth.userId)
router.get("/user/:userId", /* requireAuth, */ getAppointmentsForUser);

// @route   PUT /api/appointments/cancel/:appointmentId
// Cancels a specific appointment
router.put("/cancel/:appointmentId", /* requireAuth, */ cancelAppointment);

export default router;
