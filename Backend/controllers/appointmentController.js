import Appointment from "../models/appointments.models.js";

/**
 * @desc    Create a new appointment (from web form)
 * @route   POST /api/appointments/book
 * @access  Private (Needs Clerk Auth)
 */
export const bookAppointment = async (req, res) => {
  try {
    // Get userId from Clerk middleware (set by requireAuth)
    const userId = req.userId;

    const {
      fullName,
      email,
      phoneNumber,
      department,
      preferredDoctor,
      datetime,
      additionalNotes,
    } = req.body;

    // Validation
    if (
      !userId ||
      !fullName ||
      !email ||
      !phoneNumber ||
      !department ||
      !datetime
    ) {
      return res
        .status(400)
        .json({ error: "Missing required fields for appointment" });
    }

    const newAppointment = new Appointment({
      userId,
      fullName,
      email,
      phoneNumber,
      department,
      preferredDoctor: preferredDoctor || "Any",
      datetime: new Date(datetime),
      additionalNotes: additionalNotes || "",
      status: "SCHEDULED",
    });

    await newAppointment.save();

    // Format the response to match frontend expectations
    const formattedAppointment = {
      id: newAppointment._id,
      fullName: newAppointment.fullName,
      email: newAppointment.email,
      phoneNumber: newAppointment.phoneNumber,
      department: newAppointment.department,
      doctor: newAppointment.preferredDoctor,
      date: newAppointment.datetime,
      time: new Date(newAppointment.datetime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      datetime: newAppointment.datetime,
      status: newAppointment.status,
      additionalNotes: newAppointment.additionalNotes,
      createdAt: newAppointment.createdAt,
      updatedAt: newAppointment.updatedAt,
    };

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: formattedAppointment,
    });
  } catch (err) {
    console.error("❌ bookAppointment error:", err);
    // Handle validation errors (e.g., date in the past)
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Get all appointments for a specific user
 * @route   GET /api/appointments/user
 * @access  Private (Needs Clerk Auth)
 */
export const getAppointmentsForUser = async (req, res) => {
  try {
    // Get userId from Clerk middleware
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const appointments = await Appointment.find({
      userId: userId,
      status: { $ne: "CANCELLED" }, // Exclude cancelled appointments
    })
      .sort({ datetime: "asc" })
      .lean(); // Sort by upcoming

    // Format the response to match frontend expectations
    const formattedAppointments = appointments.map((appointment) => ({
      id: appointment._id,
      fullName: appointment.fullName,
      email: appointment.email,
      phoneNumber: appointment.phoneNumber,
      department: appointment.department,
      doctor: appointment.preferredDoctor,
      date: appointment.datetime,
      time: new Date(appointment.datetime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      datetime: appointment.datetime,
      status: appointment.status,
      additionalNotes: appointment.additionalNotes,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    }));

    res.status(200).json(formattedAppointments);
  } catch (err) {
    console.error("❌ getAppointmentsForUser error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Cancel an appointment (mark as cancelled)
 * @route   PUT /api/appointments/cancel/:appointmentId
 * @access  Private (Needs Clerk Auth)
 */
export const cancelAppointment = async (req, res) => {
  try {
    // Get userId from Clerk middleware
    const userId = req.userId;
    const { appointmentId } = req.params;

    // Check that the appointment belongs to the authenticated user
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Direct string comparison since userId is now a string
    if (appointment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to cancel this appointment" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "CANCELLED" },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment: updatedAppointment,
    });
  } catch (err) {
    console.error("❌ cancelAppointment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Delete an appointment permanently
 * @route   DELETE /api/appointments/:appointmentId
 * @access  Private (Needs Clerk Auth)
 */
export const deleteAppointment = async (req, res) => {
  try {
    // Get userId from Clerk middleware
    const userId = req.userId;
    const { appointmentId } = req.params;

    console.log(
      `🗑️ Attempting to delete appointment ${appointmentId} for user ${userId}`
    );

    // Check that the appointment belongs to the authenticated user
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Direct string comparison since userId is now a string
    if (appointment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this appointment" });
    }

    // Actually delete the appointment from database
    await Appointment.findByIdAndDelete(appointmentId);

    console.log(`✅ Appointment ${appointmentId} deleted successfully`);

    res.status(200).json({
      message: "Appointment deleted successfully",
      deletedId: appointmentId,
    });
  } catch (err) {
    console.error("❌ deleteAppointment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
