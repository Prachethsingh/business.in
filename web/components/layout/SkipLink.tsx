"use client";

import { useEffect, useRef } from "react";

export default function SkipLink() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const handleFocus = () => {
        el.style.left = "16px";
        el.style.top = "16px";
      };

      const handleBlur = () => {
        const el = ref.current;
        if (el) {
          el.style.left = "-9999px";
        }
      };

      el.addEventListener("focus", handleFocus);
      el.addEventListener("blur", handleBlur);

      return () => {
        el.removeEventListener("focus", handleFocus);
        el.removeEventListener("blur", handleBlur);
      };
    }
  }, []);

  return (
    <a
      ref={ref}
      href="#main-content"
      className="skip-link"
      style={{
        position: "absolute",
        left: "-9999px",
        zIndex: 9999,
        padding: "8px 16px",
        background: "#0A0A0A",
        color: "#00FF85",
        border: "2px solid #00FF85",
        borderRadius: "4px",
        textDecoration: "none",
        fontWeight: 600,
      }}
    >
      Skip to main content
    </a>
  );
}