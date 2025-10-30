import Reminder from "../models/reminders.models.js"; // Corrected import path

/**
 * @desc    Create a new reminder
 * @route   POST /api/reminders/create
 * @access  Private (Needs Clerk Auth)
 */
export const createReminder = async (req, res) => {
  try {
    // TODO: Get authenticated userId from Clerk (e.g., req.auth.userId)
    // const { userId } = req.auth;

    // For testing, we'll get it from the body.
    // REMOVE THIS IN PRODUCTION:
    const { userId } = req.body;

    const { message, scheduleTime } = req.body;

    // Validation
    if (!userId || !message || !scheduleTime) {
      return res
        .status(400)
        .json({ error: "Missing required fields for reminder" });
    }

    // Basic date validation
    if (new Date(scheduleTime) < new Date()) {
      return res
        .status(400)
        .json({ error: "Reminder time must be in the future" });
    }

    const newReminder = new Reminder({
      userId, // This should come from req.auth
      message,
      scheduleTime: new Date(scheduleTime),
      status: "PENDING",
    });

    await newReminder.save();
    res.status(201).json({
      message: "Reminder set successfully",
      reminder: newReminder,
    });
  } catch (err) {
    console.error("❌ createReminder error:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Get all pending reminders for a user
 * @route   GET /api/reminders/user/:userId
 * @access  Private (Needs Clerk Auth)
 */
export const getPendingReminders = async (req, res) => {
  try {
    // TODO: Get authenticated userId from Clerk
    // const { userId } = req.auth;

    // For testing, we'll get it from params.
    // REMOVE THIS IN PRODUCTION:
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const reminders = await Reminder.find({
      userId: userId,
      status: "PENDING",
    }).sort({ scheduleTime: "asc" }); // Sort by soonest

    res.status(200).json(reminders);
  } catch (err) {
    console.error("❌ getPendingReminders error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Delete a reminder
 * @route   DELETE /api/reminders/delete/:reminderId
 * @access  Private (Needs Clerk Auth)
 */
export const deleteReminder = async (req, res) => {
  try {
    // TODO: Get authenticated userId from Clerk
    // const { userId } = req.auth;
    const { reminderId } = req.params;

    // We should also check that the reminder belongs to the authenticated user
    // const reminder = await Reminder.findById(reminderId);
    // if (reminder.userId.toString() !== userId) {
    //   return res.status(403).json({ error: "Not authorized to delete this reminder" });
    // }

    const deletedReminder = await Reminder.findByIdAndDelete(reminderId);

    if (!deletedReminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.status(200).json({
      message: "Reminder deleted successfully",
    });
  } catch (err) {
    console.error("❌ deleteReminder error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Mark a reminder as "DONE"
 * @route   PUT /api/reminders/complete/:reminderId
 * @access  Private (Needs Clerk Auth)
 */
export const completeReminder = async (req, res) => {
  try {
    // TODO: Get authenticated userId from Clerk
    // const { userId } = req.auth;
    const { reminderId } = req.params;

    // We should also check that the reminder belongs to the authenticated user
    // ... (similar check as in deleteReminder) ...

    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      { status: "DONE" },
      { new: true } // Return the updated document
    );

    if (!updatedReminder) {
      return res.status(404).json({ error: "Reminder not found" }); // Corrected status
    }

    res.status(200).json({
      message: "Reminder marked as complete",
      reminder: updatedReminder,
    });
  } catch (err) {
    console.error("❌ completeReminder error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
