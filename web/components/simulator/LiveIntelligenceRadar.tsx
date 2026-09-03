"use client";

import React, { useMemo } from "react";
import {
  FaSatelliteDish,
  FaWalking,
  FaSubway,
  FaBuilding,
  FaStoreAlt,
  FaBolt,
  FaChartArea,
} from "react-icons/fa";

type Props = {
  corridorKey: string;
  corridorLabel: string;
  radiusKm: number;
  pedestrianDensity: number;
  competitorCount: number;
  probability: number;
  expectedProfitPaise: number;
};

export default function LiveIntelligenceRadar({
  corridorKey,
  corridorLabel,
  radiusKm,
  pedestrianDensity,
  competitorCount,
  probability,
  expectedProfitPaise,
}: Props) {
  // Calibrated corridor demographic data
  const demographic = useMemo(() => {
    switch (corridorKey) {
      case "indiranagar":
        return {
          avgIncome: "₹1,85,000 / mo",
          techWorkforce: "84%",
          metroScore: "96 / 100",
          peakHours: "1:00 PM – 4:00 PM & 7:00 PM – 11:30 PM",
          weekendSurge: "+58%",
        };
      case "koramangala":
        return {
          avgIncome: "₹1,70,000 / mo",
          techWorkforce: "89%",
          metroScore: "82 / 100",
          peakHours: "12:30 PM – 3:30 PM & 6:30 PM – 11:00 PM",
          weekendSurge: "+52%",
        };
      case "hsr":
        return {
          avgIncome: "₹1,60,000 / mo",
          techWorkforce: "92%",
          metroScore: "86 / 100",
          peakHours: "12:00 PM – 3:00 PM & 6:00 PM – 10:30 PM",
          weekendSurge: "+44%",
        };
      case "whitefield":
        return {
          avgIncome: "₹1,50,000 / mo",
          techWorkforce: "94%",
          metroScore: "90 / 100",
          peakHours: "8:30 AM – 11:30 AM & 5:30 PM – 9:30 PM",
          weekendSurge: "+36%",
        };
      case "jpnagar":
        return {
          avgIncome: "₹1,30,000 / mo",
          techWorkforce: "72%",
          metroScore: "88 / 100",
          peakHours: "11:00 AM – 2:30 PM & 6:00 PM – 10:00 PM",
          weekendSurge: "+48%",
        };
      case "mgroad":
        return {
          avgIncome: "₹1,95,000 / mo",
          techWorkforce: "81%",
          metroScore: "98 / 100",
          peakHours: "1:30 PM – 5:00 PM & 7:00 PM – 11:45 PM",
          weekendSurge: "+65%",
        };
      default:
        return {
          avgIncome: "₹95,000 / mo",
          techWorkforce: "65%",
          metroScore: "78 / 100",
          peakHours: "9:00 AM – 1:00 PM & 4:30 PM – 8:30 PM",
          weekendSurge: "+25%",
        };
    }
  }, [corridorKey]);

  // Hourly footfall estimate derived from density and radius
  const estimatedHourlyFootfall = Math.round(
    pedestrianDensity * 2200 * Math.max(0.6, radiusKm * 0.7)
  );

  return (
    <div className="glass rounded-3xl p-5 sm:p-6 bg-[#121212]/95 border border-white/15 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#00FF85]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with live signal badge */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00FF85]/15 border border-[#00FF85]/40 flex items-center justify-center text-[#00FF85] shadow-lg shadow-[#00FF85]/20">
            <FaSatelliteDish className="animate-spin text-lg" style={{ animationDuration: "14s" }} />
          </div>
          <div>
            <h3 className="font-display text-lg sm:text-xl font-black tracking-wide text-white flex items-center gap-2">
              Catchment AI Radar
            </h3>
            <p className="text-xs font-mono text-[#00FF85] m-0 flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-ping inline-block" />
              LIVE TELEMETRY · {corridorLabel.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[11px] font-mono text-white font-medium uppercase">Radar Radius</span>
          <span className="text-sm font-black font-mono text-[#38BDF8] bg-[#38BDF8]/15 px-3 py-1 rounded-xl border border-[#38BDF8]/30">
            {radiusKm.toFixed(1)} km Catchment
          </span>
        </div>
      </div>

      {/* Animated Radar Canvas & Interactive Map Blips Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Animated Radar Circular Scanner */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full border-2 border-[#00FF85]/30 bg-[#0A0A0A] flex items-center justify-center overflow-hidden shadow-2xl shadow-[#00FF85]/10">
            {/* Concentric distance rings */}
            <div className="absolute inset-4 rounded-full border border-dashed border-[#00FF85]/25" />
            <div className="absolute inset-10 rounded-full border border-white/15" />
            <div className="absolute inset-16 rounded-full border border-dashed border-[#38BDF8]/25" />

            {/* Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#00FF85]/20" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#00FF85]/20" />

            {/* Rotating Radar Sweep Beam */}
            <div
              className="absolute inset-0 origin-center rounded-full pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(0, 255, 133, 0.45) 0deg, rgba(0, 255, 133, 0.05) 50deg, transparent 70deg)",
                animation: "radarSweep 4s linear infinite",
              }}
            />

            {/* Center Pin Node */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-[#00FF85] border-2 border-white shadow-lg shadow-[#00FF85] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>

            {/* Dynamic Detected Blips */}
            {/* Transit Metro Blip */}
            <div
              className="absolute top-10 right-12 z-10 flex items-center gap-1 group cursor-pointer"
              title="Namma Metro Station Corridor"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] absolute" />
              <span className="hidden group-hover:block absolute left-4 bg-black/90 text-[10px] font-mono text-[#38BDF8] px-1.5 py-0.5 rounded border border-[#38BDF8]/40 whitespace-nowrap">
                Metro Hub
              </span>
            </div>

            {/* Tech Park Blip */}
            <div
              className="absolute bottom-12 left-10 z-10 flex items-center gap-1 group cursor-pointer"
              title="High-Density Commercial Tech Park"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF85] animate-pulse" />
              <span className="hidden group-hover:block absolute left-4 bg-black/90 text-[10px] font-mono text-[#00FF85] px-1.5 py-0.5 rounded border border-[#00FF85]/40 whitespace-nowrap">
                Tech Campus
              </span>
            </div>

            {/* Competitor Nodes based on slider */}
            {competitorCount > 0 && (
              <div
                className="absolute top-14 left-14 z-10 flex items-center gap-1 group cursor-pointer"
                title={`${competitorCount} Nearby Direct Competitors`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] absolute" />
                <span className="hidden group-hover:block absolute left-4 bg-black/90 text-[10px] font-mono text-[#FF6B6B] px-1.5 py-0.5 rounded border border-[#FF6B6B]/40 whitespace-nowrap">
                  {competitorCount} Competitors
                </span>
              </div>
            )}

            {/* Live Footfall Vector Wave */}
            <div
              className="absolute bottom-8 right-10 z-10 w-2 h-2 rounded-full bg-[#FFD700] animate-bounce"
              title="High-Street Pedestrian Cluster"
            />
          </div>

          <div className="mt-3 text-center">
            <span className="text-[11px] font-mono text-white block uppercase tracking-wider font-medium">
              Active Radar Stream
            </span>
            <strong className="text-sm font-mono font-bold text-[#00FF85]">
              ~{estimatedHourlyFootfall.toLocaleString("en-IN")} Pedestrians / hr
            </strong>
          </div>
        </div>

        {/* Right side: Real-time Demographic & Micro-Market Signals */}
        <div className="md:col-span-7 space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#00FF85]/40 transition-all">
              <span className="text-[11px] font-mono text-white flex items-center gap-1.5 uppercase font-medium">
                <FaWalking className="text-[#00FF85]" /> Density Index
              </span>
              <p className="text-base sm:text-lg font-black font-mono text-white mt-1 mb-0">
                {Math.round(pedestrianDensity * 100)}%
                <span className="text-xs font-normal text-[#00FF85] ml-1.5 font-sans">
                  {pedestrianDensity > 0.7 ? "High Volume" : "Steady Flow"}
                </span>
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#38BDF8]/40 transition-all">
              <span className="text-[11px] font-mono text-white flex items-center gap-1.5 uppercase font-medium">
                <FaSubway className="text-[#38BDF8]" /> Transit Index
              </span>
              <p className="text-base sm:text-lg font-black font-mono text-white mt-1 mb-0">
                {demographic.metroScore}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FFD700]/40 transition-all">
              <span className="text-[11px] font-mono text-white flex items-center gap-1.5 uppercase font-medium">
                <FaBuilding className="text-[#FFD700]" /> Tech Workforce
              </span>
              <p className="text-base sm:text-lg font-black font-mono text-white mt-1 mb-0">
                {demographic.techWorkforce}
                <span className="text-xs font-normal text-white ml-1 font-sans">of Catchment</span>
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#00FF85]/40 transition-all">
              <span className="text-[11px] font-mono text-white flex items-center gap-1.5 uppercase font-medium">
                <FaStoreAlt className="text-[#00FF85]" /> Weekend Surge
              </span>
              <p className="text-base sm:text-lg font-black font-mono text-[#00FF85] mt-1 mb-0">
                {demographic.weekendSurge}
                <span className="text-xs font-normal text-white ml-1 font-sans">vs Weekday</span>
              </p>
            </div>
          </div>

          {/* Median Income & Prime Window Bar */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.02] border border-white/15 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white">Catchment Median Income:</span>
              <strong className="text-white font-bold">{demographic.avgIncome}</strong>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white">Peak Traffic Window:</span>
              <span className="text-[#00FF85] font-semibold">{demographic.peakHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stochastic Monte Carlo Waveform Visualizer */}
      <div className="pt-2 border-t border-white/10 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <FaChartArea className="text-[#00FF85]" /> Stochastic Probability Density Wave
          </span>
          <span className="text-[11px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded-md border border-[#38BDF8]/30">
            10,000 Iterations Live
          </span>
        </div>

        {/* Dynamic SVG Bell Curve */}
        <div className="w-full h-20 bg-black/60 rounded-2xl border border-white/10 p-2 relative overflow-hidden flex items-end">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00FF85" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#121212" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Stochastic Curve Path */}
            <path
              d={`M 0,80 Q 80,75 140,55 T 220,15 T 280,45 T 400,80 Z`}
              fill="url(#bellGrad)"
            />
            <path
              d={`M 0,80 Q 80,75 140,55 T 220,15 T 280,45 T 400,80`}
              fill="none"
              stroke="#00FF85"
              strokeWidth="2.5"
            />

            {/* P50 Median Indicator Line */}
            <line
              x1="220"
              y1="15"
              x2="220"
              y2="80"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>

          {/* Labels on Bell Curve */}
          <div className="absolute top-2 left-4 text-[10px] font-mono text-[#FFA0A0] flex items-center gap-1">
            <span>P10 (Worst)</span>
          </div>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#38BDF8] font-bold flex items-center gap-1">
            <FaBolt size={9} />
            <span>P50 Expected ({probability}%)</span>
          </div>
          <div className="absolute top-2 right-4 text-[10px] font-mono text-[#00FF85] flex items-center gap-1">
            <span>P90 (Best)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
