import { useNavigate } from "react-router-dom";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import LandingNavbar from "../components/LandingNavbar";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <LandingNavbar />
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            Powerful Features for Better Healthcare
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-white dark:bg-zinc-900 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-zinc-800">
              <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
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
              <h3 className="text-xl font-semibold mb-2">
                Medical Report Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Upload your medical reports and get instant AI-powered
                explanations in simple, easy-to-understand language. No more
                medical jargon confusion.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card bg-white dark:bg-zinc-900 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-zinc-800">
              <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
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
              <h3 className="text-xl font-semibold mb-2">
                AI Health Assistant
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Chat via voice or text with our intelligent AI health assistant.
                Get instant answers to your health questions in English or
                Hindi, 24/7.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card bg-white dark:bg-zinc-900 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-zinc-800">
              <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
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
              <h3 className="text-xl font-semibold mb-2">
                Easy Appointment Booking
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Schedule doctor appointments effortlessly. Choose your preferred
                time, department, and doctor with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                desc: "Create your free account in seconds",
              },
              {
                step: "2",
                title: "Upload Reports",
                desc: "Share your medical documents securely",
              },
              {
                step: "3",
                title: "Ask Questions",
                desc: "Chat via voice or text with AI assistant",
              },
              {
                step: "4",
                title: "Get Insights",
                desc: "Understand your health with AI explanations",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center 
                              justify-center text-2xl font-bold mx-auto mb-4 transition-colors duration-300"
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Your Health Journey Starts Here
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands using AI-powered health assistance to understand
            their medical reports and make informed healthcare decisions.
          </p>

          <SignedIn>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-semibold 
                       text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                       active:scale-95"
            >
              Go to Dashboard
            </button>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal" redirectUrl="/dashboard">
              <button
                className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-semibold 
                         text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                         active:scale-95"
              >
                Get Started Now
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-white dark:bg-zinc-950 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 HealthAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
