import express from "express";
import {
  bookAppointment,
  getAppointmentsForUser,
  cancelAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import { requireAuth } from "../middleware/clerk.middleware.js";

const router = express.Router();

// @route   GET /api/appointments
// @desc    Gets all appointments for the authenticated user
// @access  Protected
router.get("/", requireAuth, getAppointmentsForUser);

// @route   POST /api/appointments/book
// @desc    Book a new appointment
// @access  Protected
router.post("/book", requireAuth, bookAppointment);

// @route   GET /api/appointments/user/:userId
// @desc    Gets all appointments for a user (deprecated - use GET / instead)
// @access  Protected
router.get("/user/:userId", requireAuth, getAppointmentsForUser);

// @route   PUT /api/appointments/cancel/:appointmentId
// @desc    Cancels a specific appointment
// @access  Protected
router.put("/cancel/:appointmentId", requireAuth, cancelAppointment);

// @route   DELETE /api/appointments/:appointmentId
// @desc    Delete/cancel a specific appointment
// @access  Protected
router.delete("/:appointmentId", requireAuth, deleteAppointment);

export default router;
