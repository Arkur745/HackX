import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/reports", label: "Reports" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-black/50 border-b border-gray-200/50 dark:border-white/10 transition-colors duration-300 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-md">
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
            <div className="text-xl font-bold">
              <span className="text-foreground">HealX</span>
              <span className="text-muted-foreground">.ai</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-foreground ${
                  isActive(link.path)
                    ? "text-foreground border-b-2 border-foreground pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Clerk Auth Components */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all duration-300 hover:opacity-90 active:scale-95 shadow-md">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 dark:border-white/10 backdrop-blur-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Clerk Auth Components for Mobile */}
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all duration-300 hover:opacity-90">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Account</span>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
