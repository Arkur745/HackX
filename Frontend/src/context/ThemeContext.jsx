import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({
  children,
  defaultTheme = "dark",
  enableSystem = false,
}) => {
  // Force dark mode only - always return "dark"
  const [theme] = useState("dark");

  // Apply dark theme to document - runs immediately and on every render
  useEffect(() => {
    const root = document.documentElement;

    // Force dark mode
    root.classList.remove("light");
    root.classList.add("dark");
    root.style.colorScheme = "dark";

    // Also force on body for extra security
    document.body.classList.remove("light");
    document.body.classList.add("dark");

    // Create an observer to watch for class changes and force dark mode
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          if (!root.classList.contains("dark")) {
            root.classList.add("dark");
            root.classList.remove("light");
          }
        }
      });
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Disabled toggle function - does nothing
  const toggleTheme = () => {
    // Do nothing - dark mode only
  };

  const setThemeValue = () => {
    // Do nothing - dark mode only
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: "dark",
        setTheme: setThemeValue,
        toggleTheme,
        systemTheme: "dark",
        resolvedTheme: "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(["dark"]),
  enableSystem: PropTypes.bool,
};
