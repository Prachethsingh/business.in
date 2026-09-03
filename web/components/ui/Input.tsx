"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; id: string };

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, id, style, ...rest },
  ref
) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 500, color: "var(--muted)" }}
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        {...rest}
        style={{
          background: "var(--paper-2)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-sm)",
          color: "var(--text)",
          padding: "10px 14px",
          fontSize: 15,
          minHeight: 44,
          fontFamily: "var(--sans)",
          ...style,
        }}
      />
    </div>
  );
});
