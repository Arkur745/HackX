import { useState } from "react";
import PropTypes from "prop-types";
import { reportAPI } from "../services/api";

const ReportViewer = ({ report, onDownload, showToast }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleExplain = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await reportAPI.explainReport(report.id, language);
      setExplanation(response.data.explanation || response.data.message);
      setShowExplanation(true);
    } catch (err) {
      console.error("Error explaining report:", err);
      setError("Failed to generate explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const speakExplanation = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "hi" ? "hi-IN" : "en-US";

      // Set speaking state
      setIsSpeaking(true);

      // Handle when speech ends
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      if (showToast) {
        showToast(
          "Text-to-speech is not supported in this browser.",
          "warning"
        );
      } else {
        alert("Text-to-speech is not supported in this browser.");
      }
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const closeModal = () => {
    stopSpeaking(); // Stop any ongoing speech
    setShowExplanation(false);
  };

  return (
    <div className="bg-card shadow-soft rounded-xl p-6 transition-all duration-300">
      {/* Report Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-1">
            {report.title || "Medical Report"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {new Date(report.date || report.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
        </div>

        {/* Report Type Badge */}
        {report.type && (
          <span className="px-3 py-1 bg-foreground text-background text-xs rounded-full">
            {report.type}
          </span>
        )}
      </div>

      {/* Report Description */}
      {report.description && (
        <p className="text-foreground mb-4 leading-relaxed">
          {report.description}
        </p>
      )}

      {/* Report Details */}
      {report.details && (
        <div className="bg-secondary/30 rounded-xl p-4 mb-4 transition-colors duration-300">
          <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
            {report.details}
          </pre>
        </div>
      )}

      {/* Language Selector */}
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium text-foreground">Language:</label>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
              language === "en"
                ? "bg-foreground text-background"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("hi")}
            className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
              language === "hi"
                ? "bg-foreground text-background"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleExplain}
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
              Generating...
            </span>
          ) : (
            "Explain in Simple Terms"
          )}
        </button>

        {report.fileUrl && onDownload && (
          <button
            onClick={() => onDownload(report)}
            className="btn-secondary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download Report
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Explanation Modal */}
      {showExplanation && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="bg-card shadow-soft rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Simple Explanation
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-secondary/50 rounded-lg transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Explanation Content */}
            <div className="prose max-w-none mb-6">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {explanation}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              {!isSpeaking ? (
                <button
                  onClick={() => speakExplanation(explanation)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Listen
                </button>
              ) : (
                <button
                  onClick={stopSpeaking}
                  className="btn-secondary flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Stop Listening
                </button>
              )}

              <button onClick={closeModal} className="btn-primary flex-1">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ReportViewer.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    details: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string,
    createdAt: PropTypes.string,
    fileUrl: PropTypes.string,
    reportName: PropTypes.string,
  }).isRequired,
  onDownload: PropTypes.func,
  showToast: PropTypes.func,
};

export default ReportViewer;
