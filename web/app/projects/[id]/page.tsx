"use client";

import { use, useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import SimulatorClient from "@/components/SimulatorClient";
import Link from "next/link";
import {
  FaSlidersH,
  FaMapMarkedAlt,
  FaStore,
  FaSubway,
  FaCalculator,
  FaArrowLeft,
  FaBuilding,
  FaCheck,
  FaChartPie,
} from "react-icons/fa";

type SegmentTab =
  | "simulator"
  | "business"
  | "location"
  | "market"
  | "mobility"
  | "land"
  | "financials";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<SegmentTab>("simulator");

  
  const project = useMemo(
    () => ({
      id,
      name: "Indiranagar Flagship Outlet",
      businessType: "Café & Bakery",
      corridor: "Indiranagar 100ft Road",
      city: "Bengaluru",
      createdAt: "August 30, 2026",
    }),
    [id]
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="text-xs font-mono text-[#00FF85] hover:underline inline-flex items-center gap-1.5 mb-1"
            >
              <FaArrowLeft size={10} /> Back to Projects Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">{project.name}</h1>
            <p className="text-xs text-[#E2E8F0] font-mono">
              {project.businessType} · {project.corridor}, {project.city}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#00FF85] bg-[#00FF85]/10 px-3 py-1.5 rounded-xl border border-[#00FF85]/30">
              6-Segment Audit Active
            </span>
          </div>
        </div>

        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { key: "simulator", label: "Simulator Studio", icon: <FaSlidersH /> },
            { key: "business", label: "Business Setup", icon: <FaStore /> },
            { key: "location", label: "Location & Catchment", icon: <FaMapMarkedAlt /> },
            { key: "market", label: "Market & Cannibalization", icon: <FaChartPie /> },
            { key: "mobility", label: "Mobility & Transit", icon: <FaSubway /> },
            { key: "land", label: "Land & Zoning Fit", icon: <FaBuilding /> },
            { key: "financials", label: "Financial Model", icon: <FaCalculator /> },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as SegmentTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 min-h-[40px] ${
                  isActive
                    ? "bg-[#00FF85]/20 text-[#00FF85] border border-[#00FF85]/50 shadow-lg"
                    : "text-white hover:text-white bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>

        
        {activeTab === "simulator" && (
          <div className="space-y-6">
            <SimulatorClient projectId={project.id} />
          </div>
        )}

        {activeTab === "business" && (
          <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <FaStore className="text-[#00FF85]" /> Segment 1: Business Setup & Operations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <span className="text-xs font-bold font-mono text-[#00FF85] uppercase">CapEx Breakdown</span>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-[#E2E8F0]">
                    <span>Storefront Fitout & Interiors:</span>
                    <strong className="text-white">₹8,50,000</strong>
                  </div>
                  <div className="flex justify-between text-[#E2E8F0]">
                    <span>Commercial Kitchen Equipment:</span>
                    <strong className="text-white">₹4,20,000</strong>
                  </div>
                  <div className="flex justify-between text-[#E2E8F0]">
                    <span>POS, CCTV, Licenses & Working Capital:</span>
                    <strong className="text-white">₹2,30,000</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <span className="text-xs font-bold font-mono text-[#38BDF8] uppercase">OpEx Benchmarks</span>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-[#E2E8F0]">
                    <span>Commercial Rent:</span>
                    <strong className="text-white">₹1,40,000/mo (Indiranagar 1.4x)</strong>
                  </div>
                  <div className="flex justify-between text-[#E2E8F0]">
                    <span>Staffing & Labor (4 Staff):</span>
                    <strong className="text-white">₹75,000/mo</strong>
                  </div>
                  <div className="flex justify-between text-[#E2E8F0]">
                    <span>Electricity & High-Tension Utility:</span>
                    <strong className="text-white">₹25,000/mo</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <FaMapMarkedAlt className="text-[#38BDF8]" /> Segment 2: Location & Catchment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[#CBD5E1]">Catchment Radius:</span>
                <p className="text-lg font-bold text-white m-0">1.0 km</p>
                <span className="text-[#00FF85]">3.14 km² primary area</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[#CBD5E1]">Daily Passerby Volume:</span>
                <p className="text-lg font-bold text-white m-0">3,450 / day</p>
                <span className="text-[#00FF85]">Peak: 12:30 PM & 6:30 PM</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[#CBD5E1]">Catchment Population:</span>
                <p className="text-lg font-bold text-white m-0">28,400 residents</p>
                <span className="text-[#00FF85]">High Disposable Income</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "market" && (
          <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <FaChartPie className="text-[#FFD700]" /> Segment 3: Market & Cannibalization Dynamics
            </h2>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white">Competitor Cannibalization Index:</span>
                <span className="text-[#00FF85] font-bold">Moderate (24% overlap)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-[#FFD700] rounded-full" style={{ width: "38%" }} />
              </div>
              <p className="text-xs text-[#E2E8F0] font-sans leading-relaxed">
                4 competing café formats within a 500m walking radius. Unique bakery and specialty brew focus provides healthy differentiation.
              </p>
            </div>
          </div>
        )}

        {activeTab === "mobility" && (
          <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <FaSubway className="text-[#00FF85]" /> Segment 4: Mobility & Transit Intelligence
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[#00FF85] font-bold uppercase">Namma Metro Access</span>
                <p className="text-white m-0">Indiranagar Metro Station (Purple Line) — 450m (6 min walk)</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[#38BDF8] font-bold uppercase">BMTC Feeder & Bus Connectivity</span>
                <p className="text-white m-0">100ft Road BMTC stop located 80m from proposed storefront.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "land" && (
          <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <FaBuilding className="text-[#FFA0A0]" /> Segment 5: Land & Zoning Feasibility
            </h2>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-white">BBMP Commercial Zoning Classification:</span>
                <span className="text-[#00FF85] font-bold flex items-center gap-1">
                  <FaCheck /> Permitted (Commercial Main Road)
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-white">Frontage & Visibility Grade:</span>
                <span className="text-[#00FF85] font-bold">Grade A (28 ft road frontage)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-white">Statutory Fire NOC & Trade License:</span>
                <span className="text-[#FFD700] font-bold">Standard Fast-Track</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "financials" && (
          <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <FaCalculator className="text-[#00FF85]" /> Segment 6: Financial Model & Payback
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[#CBD5E1]">Estimated Monthly Gross:</span>
                <p className="text-xl font-bold text-white m-0">₹4,85,000</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[#CBD5E1]">Estimated Monthly Net:</span>
                <p className="text-xl font-bold text-[#00FF85] m-0">₹1,12,000</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[#CBD5E1]">Payback Horizon:</span>
                <p className="text-xl font-bold text-white m-0">13.4 months</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
