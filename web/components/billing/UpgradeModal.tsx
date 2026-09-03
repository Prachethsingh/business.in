"use client";

import { useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { FaCrown, FaCheck, FaCopy, FaTimes, FaShieldAlt, FaMobileAlt } from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [copied, setCopied] = useState(false);
  const [utr, setUtr] = useState("");
  const [qrType, setQrType] = useState<"gpay" | "navi">("gpay");
  const [status, setStatus] = useState<"idle" | "verifying" | "success">("idle");
  const upiId = "prachethsingh@okaxis";

  if (!isOpen) return null;

  function handleCopy() {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSubmitUtr(e: React.FormEvent) {
    e.preventDefault();
    if (!utr.trim()) return;
    setStatus("verifying");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg glass rounded-3xl p-5 sm:p-7 bg-[#121212] border border-white/15 shadow-2xl overflow-hidden my-6">
        
        {/* Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#FFD700" }}
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-2 z-10"
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>

        {status === "success" ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#00FF85]/20 border border-[#00FF85]/40 text-[#00FF85] flex items-center justify-center mx-auto text-2xl">
              <FaCheck />
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">Upgrade Submitted!</h2>
            <p className="text-sm text-slate-200 max-w-sm mx-auto">
              Your payment of <strong className="text-white">₹99</strong> is under automated verification. Your account will have unlimited simulations unlocked shortly.
            </p>
            <GlowButton variant="primary" size="md" onClick={onClose} className="mt-4">
              Back to Dashboard
            </GlowButton>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700] text-lg">
                <FaCrown />
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif text-white">Upgrade to Pro</h2>
                <p className="text-xs text-slate-300 font-sans">Instant access to full Bangalore location intelligence</p>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-baseline justify-between mb-4">
              <div>
                <span className="text-2xl font-bold font-mono text-white">₹99</span>
                <span className="text-xs text-slate-300 ml-1">one-time payment</span>
              </div>
              <span className="text-xs font-mono text-[#00FF85] bg-[#00FF85]/10 px-2.5 py-1 rounded-full border border-[#00FF85]/30 font-bold">
                Special Launch Price
              </span>
            </div>

            {/* QR Scanner Display Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 mb-4">
              {/* QR Switcher Tabs */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setQrType("gpay")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    qrType === "gpay"
                      ? "bg-white text-black font-bold shadow-md shadow-white/10"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <SiGooglepay className="text-base" /> Google Pay
                </button>
                <button
                  type="button"
                  onClick={() => setQrType("navi")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    qrType === "navi"
                      ? "bg-[#00FF85] text-black font-bold shadow-md shadow-[#00FF85]/20"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FaMobileAlt /> UPI / Navi QR
                </button>
              </div>

              {/* QR Image Container */}
              <div className="flex flex-col items-center">
                <div className="relative p-2.5 rounded-2xl bg-white shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrType === "gpay" ? "/qr-gpay.jpg" : "/qr-navi.jpg"}
                    alt={qrType === "gpay" ? "Google Pay QR Scanner" : "UPI Payment QR Scanner"}
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-lg"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#00FF85]/40 pointer-events-none" />
                </div>
                <p className="mt-2.5 text-[11px] font-mono text-slate-300 text-center">
                  Scan using Google Pay, PhonePe, Paytm, or any UPI app
                </p>
              </div>
            </div>

            {/* UPI ID & Copy Box */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#181818] border border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono">UPI ID:</span>
                <span className="text-xs font-mono text-[#00FF85] font-semibold">{upiId}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5 transition-all"
              >
                {copied ? <FaCheck className="text-[#00FF85]" /> : <FaCopy />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* UTR input form */}
            <form onSubmit={handleSubmitUtr} className="space-y-3">
              <div>
                <label htmlFor="utr" className="block text-xs font-mono text-slate-200 mb-1 font-medium">
                  Enter 12-digit UTR / Reference Number after payment:
                </label>
                <input
                  id="utr"
                  type="text"
                  required
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="e.g. 423871928371"
                  className="w-full px-3.5 py-2.5 bg-[#181818] border border-white/20 rounded-xl text-white placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <GlowButton
                type="submit"
                variant="gold"
                size="md"
                className="w-full justify-center"
                disabled={status === "verifying"}
              >
                {status === "verifying" ? "Verifying Payment..." : "Confirm Payment"}
              </GlowButton>
            </form>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <FaShieldAlt className="text-[#00FF85]" /> 256-bit Secure UPI Transaction
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
