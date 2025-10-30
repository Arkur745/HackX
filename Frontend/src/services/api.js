import axios from "axios";

// Base API URL - update this to match your backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor to add Clerk auth token
api.interceptors.request.use(
  async (config) => {
    // Try to get Clerk token if available
    try {
      // This will be set by Clerk when user is authenticated
      // You can also use window.Clerk.session.getToken() if needed
      const clerkToken = await window.Clerk?.session?.getToken();
      if (clerkToken) {
        config.headers.Authorization = `Bearer ${clerkToken}`;
      }
    } catch (error) {
      console.log("No Clerk token available:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - Clerk will handle redirect
      console.error("Unauthorized request - please sign in");
    }
    return Promise.reject(error);
  }
);

// ===================
// User/Auth APIs (Legacy - Clerk handles auth now)
// ===================
export const authAPI = {
  // These are kept for backward compatibility but not used
  // Clerk handles all authentication
  getCurrentUser: () => api.get("/users/me"),
};

// ===================
// Chat APIs
// ===================
export const chatAPI = {
  // Get all conversations for current user
  getConversations: () => api.get("/chat/conversations"),

  // Get messages for a specific conversation
  getMessages: (conversationId) =>
    api.get(`/chat/conversations/${conversationId}/messages`),

  // Send a message (text or voice)
  sendMessage: (data) => api.post("/chat/message", data),

  // Create new conversation
  createConversation: () => api.post("/chat/conversations"),

  // Delete conversation
  deleteConversation: (conversationId) =>
    api.delete(`/chat/conversations/${conversationId}`),
};

// ===================
// Appointment APIs
// ===================
export const appointmentAPI = {
  // Get all appointments for current user
  getAppointments: () => api.get("/appointments"),

  // Create new appointment
  createAppointment: (appointmentData) =>
    api.post("/appointments", appointmentData),

  // Update appointment
  updateAppointment: (id, appointmentData) =>
    api.put(`/appointments/${id}`, appointmentData),

  // Delete appointment
  deleteAppointment: (id) => api.delete(`/appointments/${id}`),

  // Get single appointment
  getAppointment: (id) => api.get(`/appointments/${id}`),
};

// ===================
// Report APIs
// ===================
export const reportAPI = {
  // Get all reports for current user
  getReports: () => api.get("/reports"),

  // Upload new report
  uploadReport: (formData) => {
    return api.post("/reports/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Get report explanation in simple language
  explainReport: (reportId, language = "en") => {
    return api.post("/reports/explain", { reportId, language });
  },

  // Get single report
  getReport: (reportId) => api.get(`/reports/${reportId}`),

  // Delete report
  deleteReport: (reportId) => api.delete(`/reports/${reportId}`),
};

// ===================
// Voice/TTS APIs
// ===================
export const voiceAPI = {
  // Convert text to speech (if backend handles this)
  textToSpeech: (text, language = "en") => {
    return api.post("/voice/tts", { text, language });
  },

  // Process voice input (if backend handles transcription)
  processVoiceInput: (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    return api.post("/voice/transcribe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

// Export default api instance for custom requests
export default api;
