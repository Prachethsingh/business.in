"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { openCookiePreferences } from "@/components/ui/CookiePreferencesModal";
import { FaCookieBite, FaShieldAlt, FaChartBar, FaSlidersH, FaExternalLinkAlt } from "react-icons/fa";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12 w-full">
        <header className="space-y-4 text-center sm:text-left border-b border-white/10 pb-8">
          <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#FFD700] bg-[#FFD700]/10 px-3 py-1 rounded-full border border-[#FFD700]/30">
            Cookie Policy & Governance
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Cookie Preferences & Policy
          </h1>
          <p className="text-sm font-mono text-slate-300">
            Last updated: August 30, 2026 · Compliant with India DPDP Act 2023 & ePrivacy Directive
          </p>
        </header>

        {/* Quick action button to trigger modal */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#00FF85]/10 to-[#38BDF8]/10 border border-[#00FF85]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white font-serif m-0">
              Customize Your Consent
            </h2>
            <p className="text-xs text-slate-200 font-sans m-0">
              You can change your cookie preferences anytime. Only strictly necessary security cookies are enabled by default.
            </p>
          </div>
          <button
            onClick={() => openCookiePreferences()}
            className="px-5 py-2.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-mono text-xs font-bold transition-all shadow-lg whitespace-nowrap flex items-center gap-2"
          >
            <FaSlidersH size={12} />
            <span>Open Cookie Preferences</span>
          </button>
        </div>

        <section className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-200">
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-white">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device by our web server when you visit BUSINESS.IN. They allow us to recognize authenticated sessions, protect against Cross-Site Request Forgery (CSRF), and maintain your location simulation parameters between browser sessions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-white">2. Categories of Cookies We Use</h2>

            <div className="grid gap-4">
              <div className="p-5 rounded-xl bg-[#121212] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <FaShieldAlt className="text-[#00FF85]" />
                  <span>Strictly Necessary Cookies (Always Active)</span>
                </div>
                <p className="text-xs text-slate-300 m-0">
                  These cookies are vital for the core functionality and security of the site. They include the <code className="text-[#00FF85] font-mono">biz_session</code> cookie which stores your encrypted SHA-256 session token to keep you logged in securely, and security tokens preventing brute-force login attempts.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#121212] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <FaChartBar className="text-[#38BDF8]" />
                  <span>Analytics & Diagnostic Cookies (Optional)</span>
                </div>
                <p className="text-xs text-slate-300 m-0">
                  Used exclusively to monitor platform performance, API query durations for Bengaluru location simulations, and page response latency. All telemetry is aggregated and never linked to individual identity.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#121212] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <FaSlidersH className="text-[#FFD700]" />
                  <span>Functional & Preference Cookies (Optional)</span>
                </div>
                <p className="text-xs text-slate-300 m-0">
                  Store client-side preferences such as default commercial corridor selections (Indiranagar, Koramangala, etc.), currency display format (INR), and dark-mode rendering properties.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-white">3. Third-Party Cookies & Tracking</h2>
            <p>
              BUSINESS.IN does <strong>NOT</strong> embed third-party behavioral advertising trackers, data brokers, or ad networks. We do not sell your navigation history to external ad exchanges.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-white">4. How to Manage Cookies in Your Browser</h2>
            <p>
              In addition to using our interactive Cookie Preferences tool above, you can configure your browser (Chrome, Firefox, Safari, Edge) to block or delete cookies entirely. Note that disabling strictly necessary cookies will prevent you from signing in to your BUSINESS.IN account.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
