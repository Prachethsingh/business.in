"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import SimulatorClient from "@/components/SimulatorClient";
import Link from "next/link";
import {
  FaSlidersH,
  FaStore,
  FaMapMarkedAlt,
  FaChartPie,
  FaSubway,
  FaBuilding,
  FaCalculator,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

const STEPS = [
  { id: 1, key: "business", title: "Business Setup", icon: <FaStore /> },
  { id: 2, key: "location", title: "Location & Catchment", icon: <FaMapMarkedAlt /> },
  { id: 3, key: "competitors", title: "Competitors & Cannibalization", icon: <FaChartPie /> },
  { id: 4, key: "mobility", title: "Mobility & Transit", icon: <FaSubway /> },
  { id: 5, key: "feasibility", title: "Land & Zoning Fit", icon: <FaBuilding /> },
  { id: 6, key: "financials", title: "Financial Model", icon: <FaCalculator /> },
  { id: 7, key: "simulation", title: "Monte Carlo Simulation", icon: <FaSlidersH /> },
];

export default function AnalysisWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <span className="text-xs font-mono text-[#00FF85] uppercase tracking-wider block mb-1">
              Location Feasibility Due Diligence
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              7-Step Analytical Feasibility Wizard
            </h1>
            <p className="text-xs text-[#E2E8F0] font-mono">
              Step-by-step commercial location screening for Bengaluru micro-markets
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#00FF85] bg-[#00FF85]/10 px-3 py-1.5 rounded-xl border border-[#00FF85]/30">
              Step {currentStep} of {STEPS.length}
            </span>
          </div>
        </div>

        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {STEPS.map((step) => {
            const isPassed = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 min-h-[38px] ${
                  isCurrent
                    ? "bg-[#00FF85] text-black font-bold shadow-lg"
                    : isPassed
                    ? "bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/40"
                    : "bg-white/5 text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {isPassed ? <FaCheck /> : step.icon}
                <span>{step.id}. {step.title}</span>
              </button>
            );
          })}
        </div>

        
        <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 min-h-[420px] flex flex-col justify-between space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <FaStore className="text-[#00FF85]" /> Step 1: Business Setup & Operating Model
              </h2>
              <p className="text-sm text-white leading-relaxed font-sans">
                Define the core capital expenditure (fitout, kitchen/interior setup, equipment) and baseline operating hours for your format.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#CBD5E1] block mb-1">Target Format:</span>
                  <strong className="text-white text-sm">Specialty Café / Bakery</strong>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#CBD5E1] block mb-1">Initial CapEx:</span>
                  <strong className="text-[#00FF85] text-sm">₹15,00,000</strong>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#CBD5E1] block mb-1">Operating Hours:</span>
                  <strong className="text-white text-sm">12 Hours / Day</strong>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <FaMapMarkedAlt className="text-[#38BDF8]" /> Step 2: Location & Catchment Radius
              </h2>
              <p className="text-sm text-white leading-relaxed font-sans">
                Analyze the primary pedestrian catchment radius and demographic density surrounding the target storefront.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#CBD5E1] block mb-1">Corridor:</span>
                  <strong className="text-white text-sm">Indiranagar 100ft Rd</strong>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#CBD5E1] block mb-1">Catchment Radius:</span>
                  <strong className="text-[#38BDF8] text-sm">1.0 km (3.14 km²)</strong>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#CBD5E1] block mb-1">Passerby Volume:</span>
                  <strong className="text-white text-sm">3,450 people / day</strong>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <FaChartPie className="text-[#FFD700]" /> Step 3: Competitor Density & Cannibalization
              </h2>
              <p className="text-sm text-white leading-relaxed font-sans">
                Quantify the competitor density in the immediate 500m radius and estimate potential revenue cannibalization.
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span>Direct Competing Outlets:</span>
                  <strong className="text-white">4 Cafés</strong>
                </div>
                <div className="flex justify-between">
                  <span>Cannibalization Overlap:</span>
                  <strong className="text-[#FFD700]">24% (Moderate)</strong>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <FaSubway className="text-[#00FF85]" /> Step 4: Transit & Mobility Elasticity
              </h2>
              <p className="text-sm text-white leading-relaxed font-sans">
                Proximity to high-density transit corridors including Namma Metro Purple/Green lines and BMTC arterial stops.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#00FF85] font-bold block mb-1">Namma Metro:</span>
                  <p className="text-white m-0">Indiranagar Station — 450m (6 min walk)</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#38BDF8] font-bold block mb-1">BMTC Stop:</span>
                  <p className="text-white m-0">100ft Road Feeder Stop — 80m</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <FaBuilding className="text-[#FFA0A0]" /> Step 5: BBMP Zoning & Statutory Due Diligence
              </h2>
              <p className="text-sm text-white leading-relaxed font-sans">
                Review BBMP commercial zoning status, road frontage clearance, and statutory trade license pre-requisites.
              </p>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                  <span>Zoning Status:</span>
                  <strong className="text-[#00FF85]">Permitted Commercial Corridor</strong>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                  <span>Road Frontage:</span>
                  <strong className="text-white">28 ft Wide Frontage</strong>
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <FaCalculator className="text-[#00FF85]" /> Step 6: Unit Economics & Payback Horizon
              </h2>
              <p className="text-sm text-white leading-relaxed font-sans">
                Calibrated financial model forecasting expected monthly revenue, COGS (28%), labor, rent, and break-even timeline.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#CBD5E1] block mb-1">Expected Monthly Gross:</span>
                  <strong className="text-xl text-white">₹4,85,000</strong>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#CBD5E1] block mb-1">Expected Monthly Net:</span>
                  <strong className="text-xl text-[#00FF85]">₹1,12,000</strong>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[#CBD5E1] block mb-1">Break-Even Horizon:</span>
                  <strong className="text-xl text-white">13.4 Months</strong>
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <FaSlidersH className="text-[#00FF85]" /> Step 7: Live Monte Carlo Simulation Studio
              </h2>
              <SimulatorClient projectId="wizard_sim_1" />
            </div>
          )}

          
          <div className="flex justify-between items-center pt-6 border-t border-white/10">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-mono text-xs rounded-xl border border-white/10 disabled:opacity-30 transition-all flex items-center gap-1.5 min-h-[38px]"
            >
              <FaArrowLeft size={10} /> Previous Step
            </button>

            {currentStep < STEPS.length ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))}
                className="px-5 py-2 bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-xs rounded-xl transition-all flex items-center gap-1.5 min-h-[38px]"
              >
                Next Step <FaArrowRight size={10} />
              </button>
            ) : (
              <Link href="/dashboard">
                <button className="px-5 py-2 bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-xs rounded-xl transition-all shadow-lg min-h-[38px]">
                  Finish & Save to Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
