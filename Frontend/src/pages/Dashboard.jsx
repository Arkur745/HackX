import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import AppointmentForm from "../components/AppointmentForm";
import { appointmentAPI, reportAPI } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat");
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingReport, setUploadingReport] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load appointments when tab is active
    if (activeTab === "appointments") {
      loadAppointments();
    }

    // Load reports when tab is active
    if (activeTab === "reports") {
      loadReports();
    }
  }, [activeTab]);

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

  const loadReports = async () => {
    setLoading(true);
    try {
      const response = await reportAPI.getReports();
      setReports(response.data || []);
    } catch (err) {
      console.error("Error loading reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type (accept PDF, images, and common medical report formats)
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid file format (PDF, JPG, PNG, DOC, or DOCX)");
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert("File size must be less than 10MB");
      return;
    }

    setUploadingReport(true);

    try {
      const formData = new FormData();
      formData.append("report", file);
      formData.append("fileName", file.name);

      const response = await reportAPI.uploadReport(formData);

      // Add the new report to the list
      setReports((prev) => [response.data, ...prev]);

      alert("Report uploaded successfully!");

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error uploading report:", err);
      alert(
        err.response?.data?.message ||
          "Failed to upload report. Please try again."
      );
    } finally {
      setUploadingReport(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) {
      return;
    }

    try {
      await reportAPI.deleteReport(reportId);
      setReports((prev) => prev.filter((report) => report.id !== reportId));
      alert("Report deleted successfully!");
    } catch (err) {
      console.error("Error deleting report:", err);
      alert("Failed to delete report. Please try again.");
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
    <div className="min-h-screen bg-background pt-20 px-4 pb-8 transition-colors duration-300">
      {/* Gradient Background Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-2">
            Your Health Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your health conversations, reports, and appointments
          </p>
        </div>

        {/* Tabs - Glassmorphism Design */}
        <div className="mb-6 glass-strong rounded-xl p-2 flex gap-2 overflow-x-auto transition-all duration-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium 
                         transition-all duration-300 whitespace-nowrap ${
                           activeTab === tab.id
                             ? "bg-foreground text-background shadow-md"
                             : "bg-transparent text-muted-foreground hover:bg-white/10 dark:hover:bg-white/5"
                         }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {/* Chat Tab - Full Width */}
          {activeTab === "chat" && (
            <div className="animate-fade-in -mx-4 sm:mx-0">
              <ChatBox />
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="animate-fade-in">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                style={{ display: "none" }}
                aria-label="Upload medical report file"
              />

              <div className="glass rounded-xl p-6 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Medical Reports
                  </h2>
                  <button
                    onClick={handleFileSelect}
                    disabled={uploadingReport}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingReport ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      "Upload Report"
                    )}
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin h-10 w-10 border-4 border-foreground border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading reports...</p>
                  </div>
                ) : reports.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-linear-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 shadow-soft">
                      <svg
                        className="w-10 h-10 text-muted-foreground"
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
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No Reports Yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Upload your medical reports to get AI-powered explanations
                    </p>
                    <button
                      onClick={handleFileSelect}
                      disabled={uploadingReport}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Upload Your First Report
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className="bg-white/5 dark:bg-white/5 backdrop-blur-sm shadow-soft rounded-xl p-4 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-foreground"
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
                              <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                  {report.fileName || "Medical Report"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {report.uploadDate
                                    ? new Date(
                                        report.uploadDate
                                      ).toLocaleDateString()
                                    : "Recently uploaded"}
                                </p>
                              </div>
                            </div>
                            {report.summary && (
                              <p className="text-muted-foreground text-sm mt-2">
                                {report.summary}
                              </p>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                /* TODO: View report details */
                              }}
                              className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-2"
                              aria-label="View report"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                  fillRule="evenodd"
                                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteReport(report.id)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
                              aria-label="Delete report"
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="animate-fade-in space-y-6">
              {/* New Appointment Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">
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
                <div className="glass rounded-xl p-6 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Schedule New Appointment
                  </h3>
                  <AppointmentForm
                    onSuccess={handleAppointmentSuccess}
                    onCancel={() => setShowAppointmentForm(false)}
                  />
                </div>
              )}

              {/* Appointments List */}
              <div className="glass rounded-xl p-6 transition-all duration-300">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin h-10 w-10 border-4 border-foreground border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      Loading appointments...
                    </p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-linear-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 shadow-soft">
                      <svg
                        className="w-10 h-10 text-muted-foreground"
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
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No Appointments Yet
                    </h3>
                    <p className="text-muted-foreground">
                      Schedule your first appointment to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white/5 dark:bg-white/5 backdrop-blur-sm shadow-soft rounded-xl p-4 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {appointment.department || "General Consultation"}
                            </h3>
                            {appointment.doctor && (
                              <p className="text-muted-foreground mb-2">
                                Dr. {appointment.doctor}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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
