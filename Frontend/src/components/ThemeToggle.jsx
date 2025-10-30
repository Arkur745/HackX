import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-secondary hover:bg-muted transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {/* Sun Icon (Light Mode) */}
      <Sun
        className={`w-5 h-5 text-foreground transition-all duration-300 absolute inset-0 m-auto ${
          resolvedTheme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />

      {/* Moon Icon (Dark Mode) */}
      <Moon
        className={`w-5 h-5 text-foreground transition-all duration-300 absolute inset-0 m-auto ${
          resolvedTheme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />

      {/* Spacer for button size */}
      <span className="invisible w-5 h-5 block" />
    </button>
  );
}

export default ThemeToggle;
