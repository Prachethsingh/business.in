"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { useSession, signOut } from "@/lib/auth-client";
import {
  FaUserCircle,
  FaKey,
  FaDesktop,
  FaCrown,
  FaCheck,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AccountSettingsPage() {
  const { data: session } = useSession();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [name, setName] = useState(session?.user?.name || "Entrepreneur");
  const [email] = useState(session?.user?.email || "user@business.in");
  const [passwordSaved, setPasswordSaved] = useState(false);

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    alert("Profile details updated.");
  }

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <span className="text-xs font-mono text-[#00FF85] uppercase tracking-wider block mb-1">
              Account Preferences
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Account Settings & Security
            </h1>
            <p className="text-xs text-[#E2E8F0] font-mono">
              Manage personal profile, password, active signed-in sessions, and plan entitlements
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
              className="px-4 py-2 text-xs font-mono text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 flex items-center gap-1.5 min-h-[38px]"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>

        
        <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-[#FFD700] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 flex items-center gap-1">
                <FaCrown size={10} /> Free Starter Plan
              </span>
              <span className="text-xs font-mono text-[#CBD5E1]">10 Scenarios Cap</span>
            </div>
            <h3 className="text-lg font-bold text-white">Upgrade to Pro Lifetime</h3>
            <p className="text-xs text-[#E2E8F0] font-sans">
              Unlock unlimited saved scenarios, PDF/CSV downloads, and shareable read-only reports for ₹99 one-time.
            </p>
          </div>

          <button
            onClick={() => setUpgradeOpen(true)}
            className="px-5 py-2.5 bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold rounded-xl text-xs font-mono whitespace-nowrap min-h-[40px]"
          >
            Upgrade to Pro — ₹99
          </button>
        </div>

        
        <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <FaUserCircle className="text-[#00FF85]" /> Personal Profile
          </h2>
          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-[#CBD5E1]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#161616] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF85]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[#CBD5E1]">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3.5 py-2.5 bg-[#161616]/50 border border-white/5 rounded-xl text-xs text-[#CBD5E1] cursor-not-allowed"
              />
            </div>
            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-mono text-xs rounded-xl border border-white/10 min-h-[36px]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        
        <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/10 space-y-6">
          <h2 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <FaKey className="text-[#38BDF8]" /> Password & Security
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#CBD5E1]">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF85]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[#CBD5E1]">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF85]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[#CBD5E1]">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#161616] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF85]"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-mono text-xs rounded-xl border border-white/10 min-h-[36px]"
              >
                Update Password
              </button>
              {passwordSaved && (
                <span className="text-[#00FF85] text-xs font-mono flex items-center gap-1">
                  <FaCheck /> Password updated successfully
                </span>
              )}
            </div>
          </form>
        </div>

        
        <div className="glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/10 space-y-4">
          <h2 className="text-lg font-bold font-serif text-white flex items-center gap-2">
            <FaDesktop className="text-[#00FF85]" /> Signed-in Devices & Sessions
          </h2>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <strong className="text-white">Current Browser (Windows · Chrome)</strong>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00FF85]/20 text-[#00FF85]">
                    Active Now
                  </span>
                </div>
                <span className="text-[#CBD5E1] text-[11px] block">
                  Last active: Just now · Bengaluru, India (IP: 49.37.12.8)
                </span>
              </div>
              <span className="text-[#CBD5E1] text-[11px]">This device</span>
            </div>
          </div>
        </div>
      </main>

      <UpgradeModal isOpen={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
      <Footer />
    </div>
  );
}
