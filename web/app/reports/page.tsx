"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import {
  FaFileAlt,
  FaShareAlt,
  FaTrash,
  FaLock,
  FaExternalLinkAlt,
  FaCheck,
} from "react-icons/fa";

interface SavedReport {
  id: string;
  projectName: string;
  corridor: string;
  businessType: string;
  token: string;
  viabilityScore: number;
  createdAt: string;
}

const INITIAL_REPORTS: SavedReport[] = [
  {
    id: "rep_1",
    projectName: "Indiranagar Flagship Outlet",
    corridor: "Indiranagar 100ft Rd",
    businessType: "Café & Bakery",
    token: "demo-token-123",
    viabilityScore: 71,
    createdAt: "Aug 30, 2026",
  },
  {
    id: "rep_2",
    projectName: "Koramangala QSR Hub",
    corridor: "Koramangala 80ft Rd",
    businessType: "Restaurant & Dine-in",
    token: "kora-rep-456",
    viabilityScore: 68,
    createdAt: "Aug 29, 2026",
  },
];

export default function ReportsManagementPage() {
  const [reports, setReports] = useState<SavedReport[]>(INITIAL_REPORTS);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  function handleCopyLink(token: string) {
    const url = `${window.location.origin}/r/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  }

  function handleRevoke(id: string) {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <span className="text-xs font-mono text-[#00FF85] uppercase tracking-wider block mb-1">
              Investor Deliverables
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center gap-2">
              <FaFileAlt className="text-[#00FF85]" /> Saved Reports & Active Share Links
            </h1>
            <p className="text-xs text-[#E2E8F0] font-mono">
              Manage your frozen simulation snapshots, shareable read-only tokens, and export histories
            </p>
          </div>
        </div>

        
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center bg-[#121212] border border-white/10 space-y-3">
              <FaFileAlt className="text-4xl text-[#CBD5E1] mx-auto opacity-50" />
              <h3 className="text-lg font-bold text-white">No Reports Generated Yet</h3>
              <p className="text-xs text-[#CBD5E1] font-mono max-w-sm mx-auto">
                Run a simulation in the studio and click &quot;Share&quot; or &quot;Export&quot; to generate a frozen investor report.
              </p>
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="glass rounded-3xl p-6 bg-[#121212] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-[#00FF85] px-2.5 py-0.5 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30">
                      {report.viabilityScore}% Viability
                    </span>
                    <span className="text-xs font-mono text-[#CBD5E1] flex items-center gap-1">
                      <FaLock size={10} /> Active Public Snapshot
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif">{report.projectName}</h3>
                  <p className="text-xs text-[#CBD5E1] font-mono">
                    {report.businessType} · {report.corridor} · Generated on {report.createdAt}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <Link href={`/r/${report.token}`} target="_blank">
                    <button className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white flex items-center gap-1.5 border border-white/10 transition-all min-h-[38px]">
                      <FaExternalLinkAlt size={11} /> View Snapshot
                    </button>
                  </Link>

                  <button
                    onClick={() => handleCopyLink(report.token)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white flex items-center gap-1.5 border border-white/10 transition-all min-h-[38px]"
                  >
                    {copiedToken === report.token ? <FaCheck className="text-[#00FF85]" /> : <FaShareAlt />}
                    {copiedToken === report.token ? "Link Copied" : "Copy Link"}
                  </button>

                  <button
                    onClick={() => handleRevoke(report.id)}
                    className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono flex items-center gap-1.5 border border-red-500/30 transition-all min-h-[38px]"
                    title="Revoke and invalidate this public share link"
                  >
                    <FaTrash size={11} /> Revoke Link
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
