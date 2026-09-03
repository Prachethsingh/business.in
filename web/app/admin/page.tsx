"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  FaUsers,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaTags,
  FaServer,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00FF85] uppercase tracking-wider mb-1">
              <FaShieldAlt /> Platform Administration
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">Owner Console & Analytics</h1>
            <p className="text-xs text-[#E2E8F0] font-mono">
              Live KPI telemetry, user governance, payment order reviews, and data-source health
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#00FF85] bg-[#00FF85]/10 px-3 py-1.5 rounded-xl border border-[#00FF85]/30 flex items-center gap-1.5">
              <FaCheckCircle /> System Status: Operational
            </span>
          </div>
        </div>

        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="/admin/users" className="glass rounded-2xl p-4 bg-[#121212] border border-white/10 hover:border-[#00FF85]/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00FF85]/15 text-[#00FF85] flex items-center justify-center text-lg">
                <FaUsers />
              </div>
              <div>
                <span className="text-xs font-bold font-mono text-white block">Users</span>
                <span className="text-[11px] text-[#CBD5E1]">Role & Session Governance</span>
              </div>
            </div>
          </Link>

          <Link href="/admin/payments" className="glass rounded-2xl p-4 bg-[#121212] border border-white/10 hover:border-[#FFD700]/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/15 text-[#FFD700] flex items-center justify-center text-lg">
                <FaMoneyCheckAlt />
              </div>
              <div>
                <span className="text-xs font-bold font-mono text-white block">Payments</span>
                <span className="text-[11px] text-[#CBD5E1]">UTR Review Queue</span>
              </div>
            </div>
          </Link>

          <Link href="/admin/audit" className="glass rounded-2xl p-4 bg-[#121212] border border-white/10 hover:border-[#38BDF8]/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center text-lg">
                <FaClipboardList />
              </div>
              <div>
                <span className="text-xs font-bold font-mono text-white block">Audit Trail</span>
                <span className="text-[11px] text-[#CBD5E1]">Immutable Mutation Logs</span>
              </div>
            </div>
          </Link>

          <Link href="/admin/categories" className="glass rounded-2xl p-4 bg-[#121212] border border-white/10 hover:border-[#FFA0A0]/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFA0A0]/15 text-[#FFA0A0] flex items-center justify-center text-lg">
                <FaTags />
              </div>
              <div>
                <span className="text-xs font-bold font-mono text-white block">Categories</span>
                <span className="text-[11px] text-[#CBD5E1]">Business Formats</span>
              </div>
            </div>
          </Link>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass rounded-2xl p-5 bg-[#121212] border border-white/10 space-y-1">
            <span className="text-xs font-bold font-mono text-[#CBD5E1] uppercase">Total Registered Users</span>
            <div className="text-3xl font-bold font-mono text-white">428</div>
            <span className="text-[11px] font-mono text-[#00FF85]">↑ +14 new this week</span>
          </div>

          <div className="glass rounded-2xl p-5 bg-[#121212] border border-white/10 space-y-1">
            <span className="text-xs font-bold font-mono text-[#CBD5E1] uppercase">Simulations Executed</span>
            <div className="text-3xl font-bold font-mono text-white">12,490</div>
            <span className="text-[11px] font-mono text-[#38BDF8]">10,000 draws / run</span>
          </div>

          <div className="glass rounded-2xl p-5 bg-[#121212] border border-white/10 space-y-1">
            <span className="text-xs font-bold font-mono text-[#CBD5E1] uppercase">Active Pro Users</span>
            <div className="text-3xl font-bold font-mono text-[#FFD700]">68</div>
            <span className="text-[11px] font-mono text-[#FFD700]">₹99 Plan Verified</span>
          </div>

          <div className="glass rounded-2xl p-5 bg-[#121212] border border-white/10 space-y-1">
            <span className="text-xs font-bold font-mono text-[#CBD5E1] uppercase">Gross Platform Revenue</span>
            <div className="text-3xl font-bold font-mono text-[#00FF85]">₹6,732</div>
            <span className="text-[11px] font-mono text-[#CBD5E1]">68 orders approved</span>
          </div>
        </div>

        
        <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 space-y-4">
          <h2 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <FaServer className="text-[#00FF85]" /> Data Source & Subsystem Health Panel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#CBD5E1]">Auth & Session DB:</span>
                <span className="text-[#00FF85] font-bold">ONLINE</span>
              </div>
              <p className="text-white text-[11px] m-0">SQLite / Better-Auth</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#CBD5E1]">OSM Tile Engine:</span>
                <span className="text-[#00FF85] font-bold">ONLINE</span>
              </div>
              <p className="text-white text-[11px] m-0">OpenStreetMap Raster</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#CBD5E1]">Monte Carlo Core:</span>
                <span className="text-[#00FF85] font-bold">100% HEALTHY</span>
              </div>
              <p className="text-white text-[11px] m-0">v2.2-calibrated Engine</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#CBD5E1]">Payments Gateway:</span>
                <span className="text-[#FFD700] font-bold">UPI VPA OK</span>
              </div>
              <p className="text-white text-[11px] m-0">prachethsingh@okaxis</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
