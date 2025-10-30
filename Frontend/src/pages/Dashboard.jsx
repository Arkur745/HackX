import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import AppointmentForm from "../components/AppointmentForm";
import { appointmentAPI } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Load appointments when tab is active
    if (activeTab === "appointments") {
      loadAppointments();
    }
  }, [activeTab, navigate]);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const response = await appointmentAPI.getAppointments();
      setAppointments(response.data || []);
    } catch (err) {
      console.error("Error loading appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentSuccess = (newAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    setShowAppointmentForm(false);
    alert("Appointment scheduled successfully!");
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await appointmentAPI.deleteAppointment(id);
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  const tabs = [
    { id: "chat", label: "Chat", icon: "💬" },
    { id: "reports", label: "Reports", icon: "📄" },
    { id: "appointments", label: "Appointments", icon: "📅" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Your Health Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your health conversations, reports, and appointments
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-6 bg-white rounded-2xl shadow-md p-2 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-medium 
                         transition-all duration-300 whitespace-nowrap ${
                           activeTab === tab.id
                             ? "bg-black text-white shadow-md"
                             : "bg-transparent text-gray-600 hover:bg-gray-100"
                         }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="animate-fade-in">
              <ChatBox />
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="animate-fade-in">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Medical Reports
                  </h2>
                  <button className="btn-primary">Upload Report</button>
                </div>

                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Reports Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Upload your medical reports to get AI-powered explanations
                  </p>
                  <button className="btn-secondary">
                    Upload Your First Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="animate-fade-in space-y-6">
              {/* New Appointment Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Appointments
                </h2>
                <button
                  onClick={() => setShowAppointmentForm(!showAppointmentForm)}
                  className="btn-primary"
                >
                  {showAppointmentForm ? "Cancel" : "+ New Appointment"}
                </button>
              </div>

              {/* Appointment Form */}
              {showAppointmentForm && (
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Schedule New Appointment
                  </h3>
                  <AppointmentForm
                    onSuccess={handleAppointmentSuccess}
                    onCancel={() => setShowAppointmentForm(false)}
                  />
                </div>
              )}

              {/* Appointments List */}
              <div className="card">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading appointments...</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No Appointments Yet
                    </h3>
                    <p className="text-gray-600">
                      Schedule your first appointment to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {appointment.department || "General Consultation"}
                            </h3>
                            {appointment.doctor && (
                              <p className="text-gray-600 mb-2">
                                Dr. {appointment.doctor}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {new Date(
                                  appointment.date
                                ).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {appointment.time}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              handleDeleteAppointment(appointment.id)
                            }
                            className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
                            aria-label="Cancel appointment"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
