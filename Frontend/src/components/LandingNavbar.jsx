import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import { authAPI } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");

  const handleLogout = async () => {
    await authAPI.logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-black/50 border-b border-gray-200/50 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <svg
                className="w-6 h-6 text-white dark:text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-black dark:text-white hidden sm:block">
              HealthAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-black dark:text-white" />
              ) : (
                <Moon className="h-5 w-5 text-black dark:text-white" />
              )}
            </button>

            {/* Auth Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all duration-300 hover:opacity-90 active:scale-95"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all duration-300 hover:opacity-90 active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 dark:border-white/10 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-black dark:text-white transition-all duration-300 flex items-center gap-2 w-full"
              >
                {isDark ? (
                  <>
                    <Sun className="h-5 w-5" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    Dark Mode
                  </>
                )}
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all duration-300 hover:opacity-90"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all duration-300 hover:opacity-90"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavbar;
