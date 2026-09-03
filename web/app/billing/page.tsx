"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  FaCheck,
  FaTimes,
  FaCrown,
  FaQrcode,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";

export default function BillingPage() {
  const [copiedVPA, setCopiedVPA] = useState(false);
  const [utr, setUtr] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const VPA = "prachethsingh@okaxis";

  function handleCopyVPA() {
    navigator.clipboard.writeText(VPA);
    setCopiedVPA(true);
    setTimeout(() => setCopiedVPA(false), 2000);
  }

  function handleSubmitProof(e: React.FormEvent) {
    e.preventDefault();
    if (!utr || utr.length < 8) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] font-mono px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 inline-block">
            Subscription & Entitlements
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-base text-white max-w-xl mx-auto font-sans">
            Start screening free forever. Upgrade to Pro for unlimited location scenarios, exportable investor reports, and advanced analytics.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          <div className="glass rounded-3xl p-8 bg-[#121212] border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-serif text-white">Starter / Free</h3>
                <span className="text-xs font-mono text-[#CBD5E1] px-2.5 py-1 rounded-full bg-white/5">
                  Current Plan
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono text-white">₹0</span>
                <span className="text-xs font-mono text-[#CBD5E1]">/ forever</span>
              </div>
              <p className="text-xs text-white font-sans">
                Full access to the Monte Carlo simulator with basic scenario saving.
              </p>

              <ul className="space-y-3 text-xs font-sans text-white pt-4 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> 10 Saved Location Scenarios
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> 10,000 Monte Carlo Iterations
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> 7 Bengaluru Commercial Corridors
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> Interactive 3D OpenStreetMap
                </li>
                <li className="flex items-center gap-2 text-[#CBD5E1]">
                  <FaTimes className="text-red-400" /> Exportable PDF & CSV Reports
                </li>
                <li className="flex items-center gap-2 text-[#CBD5E1]">
                  <FaTimes className="text-red-400" /> Shareable Read-Only Links
                </li>
              </ul>
            </div>

            <button
              disabled
              className="w-full py-3 rounded-xl bg-white/5 text-white font-mono text-xs border border-white/10 cursor-not-allowed min-h-[44px]"
            >
              Active Plan
            </button>
          </div>

          
          <div className="glass rounded-3xl p-8 bg-[#161616] border-2 border-[#FFD700]/50 relative overflow-hidden flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="absolute top-0 right-0 bg-[#FFD700] text-black font-mono text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              Lifetime Access
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                  <FaCrown className="text-[#FFD700]" /> Pro Lifetime
                </h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono text-[#FFD700]">₹99</span>
                <span className="text-xs font-mono text-white">/ one-time payment</span>
              </div>
              <p className="text-xs text-white font-sans">
                For entrepreneurs, founders, and consultants seeking comprehensive location feasibility.
              </p>

              <ul className="space-y-3 text-xs font-sans text-white pt-4 border-t border-white/10 font-semibold">
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> Unlimited Saved Location Scenarios
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> Downloadable Investor PDF Reports
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> Structured CSV Data Export
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> Shareable Read-Only Web Links
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> 6-Segment Analytical Due Diligence
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-[#00FF85]" /> Priority Support & Feature Updates
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <a href="#payment-section" className="block w-full">
                <button className="w-full py-3 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-xs transition-all shadow-lg min-h-[44px]">
                  Upgrade to Pro — ₹99
                </button>
              </a>
            </div>
          </div>
        </div>

        
        <div id="payment-section" className="glass rounded-3xl p-8 bg-[#121212] border border-white/15 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/15 text-[#FFD700] flex items-center justify-center text-lg">
              <FaQrcode />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white">Instant UPI Payment (₹99)</h2>
              <p className="text-xs text-white font-mono">Scan QR code or copy the UPI VPA below using GPay, PhonePe, or Paytm</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-center sm:text-left">
              <div className="space-y-1 font-mono text-xs">
                <span className="text-[#CBD5E1] block">Payee UPI VPA:</span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#181818] border border-white/10">
                  <strong className="text-white font-mono text-sm">{VPA}</strong>
                  <button
                    onClick={handleCopyVPA}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-[#00FF85] flex items-center gap-1 font-mono transition-all"
                  >
                    {copiedVPA ? <FaCheck /> : <FaCopy />}
                    {copiedVPA ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-mono p-3 rounded-xl bg-[#181818] border border-white/10">
                <span className="text-[#CBD5E1]">Payable Amount:</span>
                <span className="text-lg font-bold text-[#FFD700]">₹99.00</span>
              </div>
            </div>

            
            <div>
              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#00FF85]/10 border border-[#00FF85]/30 space-y-3 text-center">
                  <FaCheckCircle className="text-3xl text-[#00FF85] mx-auto" />
                  <h3 className="text-base font-bold text-white">Payment Proof Submitted!</h3>
                  <p className="text-xs text-white font-mono leading-relaxed">
                    UTR reference <strong className="text-[#00FF85]">{utr}</strong> is pending review. Pro lifetime access will unlock upon admin verification.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitProof} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white block">
                      Enter 12-digit UPI Reference / UTR Number:
                    </label>
                    <input
                      type="text"
                      value={utr}
                      onChange={(e) => setUtr(e.target.value)}
                      placeholder="e.g. 428719823719"
                      maxLength={16}
                      className="w-full px-4 py-3 bg-[#181818] border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-[#00FF85]"
                      required
                    />
                    <span className="text-[11px] text-[#CBD5E1] block">
                      Located in your payment receipt from GPay / PhonePe / Paytm.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-xs transition-all shadow-lg min-h-[44px]"
                  >
                    Submit Proof for Instant Activation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
