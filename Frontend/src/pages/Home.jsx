import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <div
          className={`max-w-6xl mx-auto text-center relative z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your AI Health Assistant
          </h1>
          <p className="text-2xl sm:text-3xl text-gray-300 mb-8">
            Talk, Type, Understand.
          </p>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Get instant explanations of medical reports in simple language.
            Schedule appointments. Chat with an AI assistant using voice or
            text. Available in English and Hindi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-white text-black rounded-2xl font-semibold text-lg 
                       transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                       active:scale-95 w-full sm:w-auto"
            >
              Start Chat
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-2xl 
                       font-semibold text-lg transition-all duration-300 hover:bg-white 
                       hover:text-black hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Understand Reports</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload medical reports and get AI-powered explanations in
                simple, easy-to-understand language.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice & Text Chat</h3>
              <p className="text-gray-600 leading-relaxed">
                Communicate with our AI assistant using voice or text. Get
                instant responses to your health queries.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-xl font-semibold mb-2">Book Appointments</h3>
              <p className="text-gray-600 leading-relaxed">
                Schedule doctor appointments easily. Choose your preferred time,
                department, and doctor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", desc: "Create your free account" },
              {
                step: "2",
                title: "Upload Reports",
                desc: "Share medical documents",
              },
              {
                step: "3",
                title: "Chat or Talk",
                desc: "Ask questions via voice or text",
              },
              {
                step: "4",
                title: "Get Answers",
                desc: "Receive instant explanations",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 bg-white text-black rounded-full flex items-center 
                              justify-center text-2xl font-bold mx-auto mb-4"
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of patients managing their health better with AI
            assistance.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-4 bg-black text-white rounded-2xl font-semibold 
                     text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                     active:scale-95"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black text-gray-400 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 HealthAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
