import { useState } from "react";
import { appointmentAPI } from "../services/api";
import VoiceInput from "./VoiceInput";
import PropTypes from "prop-types";

const AppointmentForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    department: "",
    doctor: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const departments = [
    "General Medicine",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "ENT",
    "Ophthalmology",
    "Psychiatry",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Process voice transcript and extract appointment information
  const processVoiceInput = (transcript) => {
    setVoiceTranscript(transcript);
    const lowerTranscript = transcript.toLowerCase();

    // Extract date (looks for patterns like "tomorrow", "next monday", dates, etc.)
    const dateMatch = lowerTranscript.match(
      /(?:on |for )?(?:tomorrow|today|next\s+\w+|(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}|\d{1,2}(?:st|nd|rd|th)?\s+(?:january|february|march|april|may|june|july|august|september|october|november|december))/i
    );

    if (dateMatch) {
      const dateStr = dateMatch[0].replace(/^(?:on |for )/, "");
      const parsedDate = parseDateFromText(dateStr);
      if (parsedDate) {
        setFormData((prev) => ({ ...prev, date: parsedDate }));
      }
    }

    // Extract time (looks for patterns like "10 AM", "2:30 PM", etc.)
    const timeMatch = lowerTranscript.match(
      /(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)/i
    );
    if (timeMatch) {
      let hours = parseInt(timeMatch[1]);
      const minutes = timeMatch[2] || "00";
      const period = timeMatch[3].toLowerCase();

      if (period.includes("pm") && hours !== 12) {
        hours += 12;
      } else if (period.includes("am") && hours === 12) {
        hours = 0;
      }

      const timeStr = `${hours.toString().padStart(2, "0")}:${minutes}`;
      setFormData((prev) => ({ ...prev, time: timeStr }));
    }

    // Extract department
    departments.forEach((dept) => {
      if (lowerTranscript.includes(dept.toLowerCase())) {
        setFormData((prev) => ({ ...prev, department: dept }));
      }
    });

    // Extract doctor name (looks for "Dr." or "Doctor")
    const doctorMatch = transcript.match(
      /(?:dr\.?|doctor)\s+([a-z]+(?:\s+[a-z]+)?)/i
    );
    if (doctorMatch) {
      setFormData((prev) => ({ ...prev, doctor: doctorMatch[0] }));
    }

    // Extract name (looks for "my name is" or "I am")
    const nameMatch = transcript.match(
      /(?:my name is|i am|this is)\s+([a-z]+(?:\s+[a-z]+)?)/i
    );
    if (nameMatch) {
      setFormData((prev) => ({ ...prev, name: nameMatch[1] }));
    }

    // Extract phone (looks for phone number patterns)
    const phoneMatch = transcript.match(
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b\d{10}\b/
    );
    if (phoneMatch) {
      setFormData((prev) => ({ ...prev, phone: phoneMatch[0] }));
    }

    // Extract email
    const emailMatch = transcript.match(
      /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i
    );
    if (emailMatch) {
      setFormData((prev) => ({ ...prev, email: emailMatch[0] }));
    }

    // Add the rest as notes if no specific field was matched
    setFormData((prev) => ({
      ...prev,
      notes: prev.notes ? `${prev.notes}\n${transcript}` : transcript,
    }));
  };

  // Helper function to parse date from natural language
  const parseDateFromText = (dateText) => {
    const today = new Date();
    const lowerDate = dateText.toLowerCase();

    if (lowerDate.includes("today")) {
      return today.toISOString().split("T")[0];
    }

    if (lowerDate.includes("tomorrow")) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    }

    // Handle "next monday", "next tuesday", etc.
    const dayMatch = lowerDate.match(
      /next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/
    );
    if (dayMatch) {
      const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      const targetDay = days.indexOf(dayMatch[1].toLowerCase());
      const currentDay = today.getDay();
      let daysToAdd = targetDay - currentDay;
      if (daysToAdd <= 0) daysToAdd += 7;

      const nextDate = new Date(today);
      nextDate.setDate(nextDate.getDate() + daysToAdd);
      return nextDate.toISOString().split("T")[0];
    }

    return null;
  };

  const handleVoiceTranscript = (transcript) => {
    processVoiceInput(transcript);
  };

  const handleVoiceError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await appointmentAPI.createAppointment(formData);
      console.log("Appointment created:", response.data);
      onSuccess?.(response.data);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        department: "",
        doctor: "",
        notes: "",
      });
    } catch (err) {
      console.error("Error creating appointment:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Voice Input Section */}
      <div className="glass-strong rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-foreground"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-semibold text-foreground">
              Voice Booking
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowVoiceInput(!showVoiceInput)}
            className="text-sm text-primary hover:underline"
          >
            {showVoiceInput ? "Hide" : "Show"}
          </button>
        </div>

        {showVoiceInput && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Speak naturally to book your appointment. For example: "I need an
              appointment with Dr. Smith for Cardiology tomorrow at 2 PM. My
              name is John Doe and my phone number is 555-123-4567."
            </p>
            <VoiceInput
              onTranscript={handleVoiceTranscript}
              onError={handleVoiceError}
              language="en-US"
            />
            {voiceTranscript && (
              <div className="bg-primary/10 rounded-lg p-3 mt-3">
                <p className="text-xs font-medium text-foreground mb-1">
                  Recognized:
                </p>
                <p className="text-sm text-foreground">{voiceTranscript}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="Enter your full name"
        />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Preferred Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            required
            className="input-field"
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Preferred Time *
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      </div>

      {/* Department */}
      <div>
        <label
          htmlFor="department"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Department *
        </label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor */}
      <div>
        <label
          htmlFor="doctor"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Preferred Doctor (Optional)
        </label>
        <input
          type="text"
          id="doctor"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="input-field"
          placeholder="Dr. Smith"
        />
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="input-field resize-none"
          placeholder="Any specific concerns or requirements..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Scheduling...
            </span>
          ) : (
            "Schedule Appointment"
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

AppointmentForm.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AppointmentForm;
