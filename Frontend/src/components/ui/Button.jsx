import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default:
        "bg-white dark:bg-white text-black hover:bg-gray-100 dark:hover:bg-gray-100",
      outline:
        "border-2 border-white/20 dark:border-white/20 bg-transparent text-white dark:text-white hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/40 dark:hover:border-white/40",
      ghost:
        "bg-transparent text-white dark:text-white hover:bg-white/10 dark:hover:bg-white/10",
      link: "text-white dark:text-white underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
