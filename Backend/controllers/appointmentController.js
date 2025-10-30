import Appointment from "../models/appointments.models.js";

/**
 * @desc    Create a new appointment (from web form)
 * @route   POST /api/appointments/book
 * @access  Private (Needs Clerk Auth)
 */
export const bookAppointment = async (req, res) => {
  try {
    // TODO: Get authenticated userId from Clerk (e.g., req.auth.userId)
    // const { userId } = req.auth;

    // For testing, we'll get it from the body.
    // REMOVE THIS IN PRODUCTION:
    const { userId } = req.body;

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
      userId, // This should come from req.auth
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
    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
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
    // TODO: Get authenticated userId from Clerk
    // const { userId } = req.auth;

    // For testing, we'll get it from params.
    // REMOVE THIS IN PRODUCTION:
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const appointments = await Appointment.find({ userId: userId })
      .populate("userId", "name email") // This 'ref' is to your 'User' model
      .sort({ datetime: "asc" }); // Sort by upcoming

    res.status(200).json(appointments);
  } catch (err) {
    console.error("❌ getAppointmentsForUser error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Cancel an appointment
 * @route   PUT /api/appointments/cancel/:appointmentId
 * @access  Private (Needs Clerk Auth)
 */
export const cancelAppointment = async (req, res) => {
  try {
    // TODO: Get authenticated userId from Clerk
    // const { userId } = req.auth;
    const { appointmentId } = req.params;

    // We should also check that the appointment belongs to the authenticated user
    // const appointment = await Appointment.findById(appointmentId);
    // if (appointment.userId.toString() !== userId) {
    //   return res.status(403).json({ error: "Not authorized to cancel this appointment" });
    // }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "CANCELLED" },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment: updatedAppointment,
    });
  } catch (err) {
    console.error("❌ cancelAppointment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
