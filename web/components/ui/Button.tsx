"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "gold" | "secondary" | "ghost" | "destructive";

const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  primary: { background: "var(--accent)", color: "#FFFFFF", border: "none" },
  gold: { background: "var(--accent-gold)", color: "#000000", border: "none" },
  secondary: { background: "#1F1F1F", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)" },
  ghost: { background: "transparent", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)" },
  destructive: { background: "rgba(255,107,107,0.2)", color: "#FF6B6B", border: "1px solid #FF6B6B" },
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", style, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      {...rest}
      style={{
        ...VARIANT_STYLES[variant],
        minHeight: 44,
        minWidth: 44,
        padding: "10px 20px",
        fontFamily: "var(--sans)",
        fontWeight: 600,
        fontSize: 14,
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        transition: "background 0.18s ease, transform 0.15s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
});
