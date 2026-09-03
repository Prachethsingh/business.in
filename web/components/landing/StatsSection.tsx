"use client";

import Link from "next/link";
import { MetricCard } from "@/components/ui/MetricCard";
import { FaArrowRight, FaCheckCircle, FaStore } from "react-icons/fa";

const stats = [
  {
    label: "Success Probability",
    value: "71%",
    suffix: "",
    trend: { value: 5, positive: true },
    color: "#00FF85",
  },
  {
    label: "Expected Revenue",
    value: 245000,
    suffix: "₹/mo",
    trend: { value: 8, positive: true },
    color: "#38BDF8",
  },
  {
    label: "Break-Even",
    value: "21",
    suffix: " months",
    trend: { value: 3, positive: true },
    color: "#FFD700",
  },
  {
    label: "Risk Level",
    value: "Medium",
    suffix: "",
    trend: { value: 2, positive: false },
    color: "#FFA0A0",
  },
];

const monthlyRamp = [
  { month: "M1", rev: "₹1.4L", pct: 45 },
  { month: "M2", rev: "₹1.6L", pct: 52 },
  { month: "M3", rev: "₹1.8L", pct: 58 },
  { month: "M4", rev: "₹2.0L", pct: 65 },
  { month: "M5", rev: "₹2.2L", pct: 72 },
  { month: "M6", rev: "₹2.3L", pct: 76 },
  { month: "M7", rev: "₹2.4L", pct: 80 },
  { month: "M8", rev: "₹2.45L", pct: 82 },
  { month: "M9", rev: "₹2.5L", pct: 84 },
  { month: "M10", rev: "₹2.6L", pct: 88 },
  { month: "M11", rev: "₹2.7L", pct: 92 },
  { month: "M12", rev: "₹2.85L", pct: 98 },
];

export function StatsSection() {
  return (
    <section className="py-20 px-6 sm:px-8 lg:px-12" id="stats">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Mission & 4 Key Feasibility Indices */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00FF85] font-mono px-3 py-1 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30 inline-block">
              Simulated Feasibility
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              See the numbers{" "}
              <span className="gradient-text-cyan">
                come alive
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base font-sans text-white leading-relaxed">
              Every simulation runs 10,000 Monte Carlo iterations to give you an institutional-grade probability distribution — not a single guess. Test rent, footfall, and ticket sizes before investing capital.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3.5">
              {stats.map((stat, i) => (
                <MetricCard
                  key={i}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  trend={stat.trend}
                  color={stat.color}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Real 12-Month Projection & Sample Corridor Dossier */}
          <div className="rounded-2xl bg-[#121212] border border-white/15 p-6 shadow-2xl space-y-5">
            {/* Header with Sample Location Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#00FF85]/10 border border-[#00FF85]/30 flex items-center justify-center text-[#00FF85]">
                  <FaStore size={14} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">
                    Indiranagar 100ft Rd · Sample Audit
                  </div>
                  <div className="text-[11px] text-white font-medium">
                    Specialty Café & Bakery · 10,000 Runs
                  </div>
                </div>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30">
                <FaCheckCircle size={10} /> Viable Signal
              </span>
            </div>

            {/* 12-Month Ramp-up Bar Visualization */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-3">
                <span className="text-white font-bold">12-Month Revenue Growth Ramp</span>
                <span className="text-[#38BDF8] font-bold">Target: ₹2.45L/mo</span>
              </div>

              {/* Bar Chart Container */}
              <div className="h-28 flex items-end justify-between gap-1.5 pt-2 px-2 bg-black/40 rounded-xl border border-white/5">
                {monthlyRamp.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                    <div
                      className="w-full rounded-t-md transition-all duration-300 group-hover:brightness-125"
                      style={{
                        height: `${item.pct}%`,
                        background: idx >= 7 ? "linear-gradient(180deg, #00FF85 0%, #1E90FF 100%)" : "rgba(255,255,255,0.25)",
                      }}
                    />
                    <span className="text-[10px] font-mono text-white group-hover:text-[#00FF85] font-bold">
                      {item.month}
                    </span>
                    {/* Tooltip on hover */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 px-1.5 py-0.5 rounded text-[9px] font-mono text-[#00FF85] pointer-events-none whitespace-nowrap z-20">
                      {item.rev}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Tier Scenario Summary */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#FFA0A0] font-bold">10th % (Worst)</span>
                <p className="text-xs font-bold font-mono text-white m-0">₹1.45L<span className="text-[10px] text-white">/mo</span></p>
                <span className="text-[10px] text-white font-mono font-medium">Break-even: 34m</span>
              </div>
              <div className="p-3 rounded-xl bg-[#00FF85]/[0.06] border border-[#00FF85]/30 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#00FF85] font-bold">50th % (Expected)</span>
                <p className="text-xs font-bold font-mono text-[#00FF85] m-0">₹2.45L<span className="text-[10px] text-white">/mo</span></p>
                <span className="text-[10px] text-white font-mono font-semibold">Break-even: 21m</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#38BDF8] font-bold">90th % (Best)</span>
                <p className="text-xs font-bold font-mono text-white m-0">₹3.60L<span className="text-[10px] text-white">/mo</span></p>
                <span className="text-[10px] text-white font-mono font-medium">Break-even: 14m</span>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-[#00FF85] text-white hover:text-black font-mono text-xs font-bold transition-all duration-200 border border-white/15 hover:border-[#00FF85]"
              >
                <span>Run Simulation for Your Location</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
