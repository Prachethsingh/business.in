"use client";

import { type ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  gradient?: string;
  delay?: number;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, className = "", gradient, delay = 0 }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.35, delay }}
        whileHover={{ y: -3, boxShadow: "0 14px 28px rgba(0, 0, 0, 0.6)" }}
        className={`
          glass rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between
          transition-all duration-300 border border-white/10
          ${className}
        `}
        style={{
          background: "rgba(18, 18, 18, 0.75)",
          backdropFilter: "blur(12px) saturate(120%)",
          WebkitBackdropFilter: "blur(12px) saturate(120%)",
          boxShadow: gradient
            ? `0 10px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 16px ${gradient}25`
            : "0 10px 24px rgba(0, 0, 0, 0.45)",
        }}
      >
        {gradient && (
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${gradient}, transparent 70%)`,
            }}
          />
        )}

        <div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5"
            style={{
              background: gradient ? `${gradient}15` : "rgba(0, 255, 133, 0.1)",
              border: `1px solid ${gradient ? `${gradient}35` : "rgba(0, 255, 133, 0.2)"}`,
            }}
          >
            {icon}
          </div>

          <h3
            className="text-base sm:text-lg font-bold mb-2 text-white font-serif tracking-tight"
          >
            {title}
          </h3>

          <p
            className="text-xs sm:text-sm leading-relaxed text-slate-100 font-sans m-0"
          >
            {description}
          </p>
        </div>
      </motion.div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";
