"use client";

import { use, useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  findBusinessType,
  findCorridor,
} from "@/lib/simulator/data";
import { runSimulation, type SimulationAssumptions } from "@/lib/simulator/engine";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import {
  FaShareAlt,
  FaPrint,
  FaFileCsv,
  FaCheck,
  FaCompass,
  FaLock,
  FaCrown,
} from "react-icons/fa";

function paiseToRupeeLabel(paise: number): string {
  const rupees = Math.round(paise / 100);
  return `\u20B9${rupees.toLocaleString("en-IN")}`;
}

export default function SharedReportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [copied, setCopied] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [isProUser, setIsProUser] = useState(false);

  
  const assumptions: SimulationAssumptions = useMemo(
    () => ({
      businessType: "cafe",
      corridor: "indiranagar",
      investmentPaise: 15_00_000 * 100,
      ticketSizePaise: 250 * 100,
      operatingHoursPerDay: 12,
      radiusKm: 1.0,
      pedestrianDensity: 0.7,
      competitorCount: 4,
      lat: 12.9719,
      lng: 77.6412,
    }),
    []
  );

  const result = useMemo(() => runSimulation(assumptions), [assumptions]);
  const biz = useMemo(() => findBusinessType(assumptions.businessType), [assumptions]);
  const corridor = useMemo(() => findCorridor(assumptions.corridor), [assumptions]);

  function exportCSV() {
    const rows = [
      ["Metric", "Value"],
      ["Report Token", token],
      ["Business Type", biz.label],
      ["Bengaluru Corridor", corridor.label],
      ["Initial Capex", paiseToRupeeLabel(assumptions.investmentPaise)],
      ["Avg Ticket Size", paiseToRupeeLabel(assumptions.ticketSizePaise)],
      ["Operating Hours", `${assumptions.operatingHoursPerDay} hrs/day`],
      ["Catchment Radius", `${assumptions.radiusKm} km`],
      ["Viability Probability", `${result.probabilityOfViability}%`],
      ["Verdict", result.verdict],
      ["Expected Monthly Revenue", paiseToRupeeLabel(result.expected.monthlyRevenuePaise)],
      ["Expected Monthly Net Profit", paiseToRupeeLabel(result.expected.monthlyProfitPaise)],
      ["Expected Break-even", `${result.expected.breakEvenMonths} months`],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BUSINESS_IN_Shared_Report_${token.substring(0, 8)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        
        <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-[#00FF85] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30">
                Verified Report Snapshot
              </span>
              <span className="text-xs font-mono text-[#CBD5E1] flex items-center gap-1">
                <FaLock size={10} /> PII-Free
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {biz.label} · {corridor.label}
            </h1>
            <p className="text-xs text-[#E2E8F0] font-mono">
              Report Token: <span className="text-white">{token}</span> · Model {result.modelVersion}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                if (!isProUser) {
                  setUpgradeOpen(true);
                  return;
                }
                exportCSV();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white flex items-center gap-2 border border-white/10 transition-all min-h-[40px] cursor-pointer"
            >
              <FaFileCsv className="text-[#00FF85]" /> Export CSV
              {!isProUser && (
                <span className="text-[10px] font-mono bg-[#FFD700]/20 text-[#FFD700] px-1.5 py-0.5 rounded-full border border-[#FFD700]/40 flex items-center gap-0.5 font-bold">
                  <FaLock size={8} /> PRO
                </span>
              )}
            </button>
            <button
              onClick={() => {
                if (!isProUser) {
                  setUpgradeOpen(true);
                  return;
                }
                window.print();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white flex items-center gap-2 border border-white/10 transition-all min-h-[40px] cursor-pointer"
            >
              <FaPrint className="text-[#38BDF8]" /> Print / PDF
              {!isProUser && (
                <span className="text-[10px] font-mono bg-[#FFD700]/20 text-[#FFD700] px-1.5 py-0.5 rounded-full border border-[#FFD700]/40 flex items-center gap-0.5 font-bold">
                  <FaLock size={8} /> PRO
                </span>
              )}
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white flex items-center gap-2 border border-white/10 transition-all min-h-[40px]"
            >
              {copied ? <FaCheck className="text-[#00FF85]" /> : <FaShareAlt />}
              {copied ? "Link Copied" : "Share"}
            </button>
          </div>
        </div>

        
        <div className="glass rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#00FF85]/15 via-[#38BDF8]/10 to-transparent border border-[#00FF85]/30 space-y-4">
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-[#00FF85] tracking-wider block mb-1">
                Probability of Viability
              </span>
              <div className="text-5xl sm:text-6xl font-bold font-mono text-[#00FF85]">
                {result.probabilityOfViability}%
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#CBD5E1] uppercase block mb-1">
                Decision Signal
              </span>
              <p className="text-base font-bold text-white m-0 max-w-sm">{result.verdict}</p>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 bg-[#161616] border border-white/10 border-t-4 border-t-[#FFA0A0] space-y-2">
            <span className="text-xs font-bold font-mono text-[#FFA0A0] uppercase">Worst Case (P10)</span>
            <div className="text-xl font-bold font-mono text-white">
              {paiseToRupeeLabel(result.worst.monthlyRevenuePaise)}/mo
            </div>
            <p className="text-xs text-[#CBD5E1] m-0">
              Net Profit: <strong className="text-white">{paiseToRupeeLabel(result.worst.monthlyProfitPaise)}</strong>
            </p>
          </div>

          <div className="glass rounded-2xl p-5 bg-[#161616] border border-white/10 border-t-4 border-t-[#38BDF8] space-y-2">
            <span className="text-xs font-bold font-mono text-[#38BDF8] uppercase">Expected (P50)</span>
            <div className="text-xl font-bold font-mono text-white">
              {paiseToRupeeLabel(result.expected.monthlyRevenuePaise)}/mo
            </div>
            <p className="text-xs text-[#CBD5E1] m-0">
              Net Profit: <strong className="text-[#00FF85]">{paiseToRupeeLabel(result.expected.monthlyProfitPaise)}</strong>
            </p>
          </div>

          <div className="glass rounded-2xl p-5 bg-[#161616] border border-white/10 border-t-4 border-t-[#00FF85] space-y-2">
            <span className="text-xs font-bold font-mono text-[#00FF85] uppercase">Best Case (P90)</span>
            <div className="text-xl font-bold font-mono text-white">
              {paiseToRupeeLabel(result.best.monthlyRevenuePaise)}/mo
            </div>
            <p className="text-xs text-[#CBD5E1] m-0">
              Net Profit: <strong className="text-[#00FF85]">{paiseToRupeeLabel(result.best.monthlyProfitPaise)}</strong>
            </p>
          </div>
        </div>

        
        <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/10 space-y-4">
          <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <FaCompass className="text-[#00FF85]" /> Modeled Assumptions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[#CBD5E1] block mb-1">Capex:</span>
              <strong className="text-white text-sm">{paiseToRupeeLabel(assumptions.investmentPaise)}</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[#CBD5E1] block mb-1">Ticket Size:</span>
              <strong className="text-white text-sm">{paiseToRupeeLabel(assumptions.ticketSizePaise)}</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[#CBD5E1] block mb-1">Hours/Day:</span>
              <strong className="text-white text-sm">{assumptions.operatingHoursPerDay} hrs</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[#CBD5E1] block mb-1">Competitors:</span>
              <strong className="text-white text-sm">{assumptions.competitorCount} direct</strong>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <UpgradeModal isOpen={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </div>
  );
}
