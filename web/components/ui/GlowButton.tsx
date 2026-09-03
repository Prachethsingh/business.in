import { type ButtonHTMLAttributes, forwardRef } from "react";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  primary: {
    background: "linear-gradient(135deg, #00FF85 0%, #00E575 100%)",
    color: "#000000",
    boxShadow: "0 0 20px rgba(0, 255, 133, 0.4), 0 0 40px rgba(0, 255, 133, 0.2)",
  },
  gold: {
    background: "linear-gradient(135deg, #FFD700 0%, #E6C200 100%)",
    color: "#000000",
    boxShadow: "0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(230, 194, 0, 0.2)",
  },
  secondary: {
    background: "#1F1F1F",
    color: "#FFFFFF",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
  },
  ghost: {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#FFFFFF",
    boxShadow: "none",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
};

const sizes = {
  sm: "px-4 py-2 text-sm min-h-[44px]",
  md: "px-6 py-3 text-base min-h-[44px]",
  lg: "px-8 py-4 text-lg min-h-[56px]",
};

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center
          rounded-[10px] font-bold
          transition-all duration-200
          hover:scale-[1.02] hover:-translate-y-0.5
          active:scale-[0.98] active:translate-y-0.5
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0
          focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]
          ${sizes[size]}
          ${className}
        `}
        style={{
          background: variants[variant].background,
          color: variants[variant].color,
          boxShadow: disabled ? "none" : variants[variant].boxShadow,
          border: variant === "ghost" ? variants[variant].border : "none",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";
