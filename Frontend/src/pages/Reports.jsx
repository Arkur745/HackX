import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReportViewer from "../components/ReportViewer";
import { reportAPI } from "../services/api";

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await reportAPI.getReports();
      setReports(response.data || []);
    } catch (err) {
      console.error("Error loading reports:", err);
      setError("Failed to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (PDF, images)
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid file (PDF or Image)");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("report", selectedFile);
      formData.append("title", selectedFile.name);

      const response = await reportAPI.uploadReport(formData);

      // Add new report to list
      setReports((prev) => [response.data, ...prev]);

      // Reset
      setSelectedFile(null);
      document.getElementById("fileInput").value = "";

      alert("Report uploaded successfully!");
    } catch (err) {
      console.error("Error uploading report:", err);
      setError(
        err.response?.data?.message ||
          "Failed to upload report. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) {
      return;
    }

    try {
      await reportAPI.deleteReport(reportId);
      setReports((prev) => prev.filter((r) => r.id !== reportId));
    } catch (err) {
      console.error("Error deleting report:", err);
      alert("Failed to delete report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-2">
            Medical Reports
          </h1>
          <p className="text-muted-foreground">
            Upload and manage your medical reports. Get AI-powered explanations
            in simple language.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-card shadow-soft rounded-xl p-6 mb-8 transition-all duration-300">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Upload New Report
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* File Input */}
            <div className="flex-1">
              <input
                type="file"
                id="fileInput"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="input-field"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected: {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
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
                  Uploading...
                </span>
              ) : (
                "Upload"
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* File Format Info */}
          <div className="mt-4 p-3 bg-secondary/30 rounded-lg transition-colors duration-300">
            <p className="text-xs text-muted-foreground">
              <strong>Supported formats:</strong> PDF, JPG, JPEG, PNG (Max 10MB)
            </p>
          </div>
        </div>

        {/* Reports List */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Your Reports
          </h2>

          {loading ? (
            <div className="bg-card shadow-soft rounded-xl p-6 text-center py-12 transition-all duration-300">
              <div className="animate-spin h-10 w-10 border-4 border-foreground border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="bg-card shadow-soft rounded-xl p-6 text-center py-12 transition-all duration-300">
              <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
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
              <p className="text-muted-foreground">
                Upload your first medical report to get started
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reports.map((report) => (
                <div key={report.id} className="relative">
                  <ReportViewer report={report} />

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 
                             hover:bg-red-50 rounded-lg transition-all duration-200"
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
