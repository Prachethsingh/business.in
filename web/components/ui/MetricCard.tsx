"use client";

import { type ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: ReactNode;
  trend?: { value: number; positive: boolean };
  className?: string;
  delay?: number;
  color?: string;
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ label, value, suffix = "", icon, trend, className: _className, delay = 0, color = "#00FF85" }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
        className="glass rounded-2xl p-5 relative overflow-hidden flex flex-col h-full"
        style={{
          background: "rgba(22, 22, 22, 0.95)",
          backdropFilter: "blur(18px) saturate(130%)",
          border: `1px solid rgba(255, 255, 255, 0.15)`,
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        />

        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider font-mono text-white">
            {label}
          </span>
          {icon && <span>{icon}</span>}
        </div>

        <div className="flex items-baseline gap-1">
          <span
            className="font-bold"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "clamp(24px, 4vw, 40px)",
              color,
              lineHeight: 1,
            }}
          >
            {value}
          </span>
          {suffix && (
            <span className="text-sm font-mono font-bold text-white">
              {suffix}
            </span>
          )}
        </div>

        {trend && (
          <div className="mt-3 flex items-center gap-1.5">
            <span
              className="text-xs font-bold font-mono px-1.5 py-0.5 rounded"
              style={{
                color: trend.positive ? "#00FF85" : "#FFA0A0",
                background: trend.positive ? "rgba(0,255,133,0.2)" : "rgba(255,160,160,0.2)",
              }}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs font-sans text-white font-medium">
              vs last period
            </span>
          </div>
        )}
      </motion.div>
    );
  }
);

MetricCard.displayName = "MetricCard";
