import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";

/**
 * LOGIN COMPONENT - DEMO MODE
 *
 * TEMPORARY: Authentication is currently bypassed for development.
 * Any email and password combination will be accepted.
 *
 * TODO: Re-enable proper authentication by uncommenting the API calls
 * in the handleSubmit function and removing the bypass logic.
 */

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // TEMPORARY: Bypass authentication - accept any credentials
    try {
      if (isLogin) {
        // Login - accept any credentials
        if (!formData.email || !formData.password) {
          setError("Please enter email and password");
          setLoading(false);
          return;
        }

        // Store a mock auth token
        localStorage.setItem("authToken", "demo-token-" + Date.now());
        localStorage.setItem("userEmail", formData.email);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        // Register - accept any credentials
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        if (!formData.email || !formData.password || !formData.name) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        // Store a mock auth token
        localStorage.setItem("authToken", "demo-token-" + Date.now());
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userName", formData.name);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-20 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-strong rounded-3xl p-8 shadow-hard border border-border/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Sign in to access your health dashboard"
                : "Join us to start managing your health better"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/10 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (Register only) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </span>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-foreground font-semibold hover:underline transition-all duration-200"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Demo Credentials (for testing) */}
        <div className="mt-6 p-4 glass rounded-xl border border-border/20 shadow-soft">
          <p className="text-xs text-muted-foreground text-center">
            <strong className="text-foreground">Demo Mode:</strong> Enter any
            email and password to access the app
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
