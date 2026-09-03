"use client";

import { useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { FaCrown, FaQrcode, FaCheck, FaCopy, FaTimes, FaShieldAlt } from "react-icons/fa";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [copied, setCopied] = useState(false);
  const [utr, setUtr] = useState("");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass rounded-3xl p-6 sm:p-8 bg-[#121212] border border-white/15 shadow-2xl overflow-hidden">
        
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#FFD700" }}
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-300 hover:text-white transition-colors p-2"
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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700] text-lg">
                <FaCrown />
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif text-white">Upgrade to Pro</h2>
                <p className="text-xs text-slate-300">Lifetime Bengaluru location intelligence access</p>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-baseline justify-between mb-6">
              <div>
                <span className="text-2xl font-bold font-mono text-white">₹99</span>
                <span className="text-xs text-slate-300 ml-1">one-time payment</span>
              </div>
              <span className="text-xs font-mono text-[#00FF85] bg-[#00FF85]/10 px-2.5 py-1 rounded-full border border-[#00FF85]/30 font-bold">
                Special Launch Price
              </span>
            </div>

            {/* Features list */}
            <ul className="space-y-2 mb-6 text-xs text-slate-200 font-medium">
              <li className="flex items-center gap-2">
                <FaCheck className="text-[#00FF85] flex-shrink-0" />
                Unlimited Monte Carlo iterations & saved scenarios
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-[#00FF85] flex-shrink-0" />
                PDF & CSV Investor Report Export with customized branding
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-[#00FF85] flex-shrink-0" />
                Catchment competitor density & traffic variance layers
              </li>
            </ul>

            {/* UPI Payment Box */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#181818] border border-white/10">
                <div className="flex items-center gap-2.5">
                  <FaQrcode className="text-[#1E90FF]" />
                  <span className="text-xs font-mono text-white">{upiId}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5 transition-all"
                >
                  {copied ? <FaCheck className="text-[#00FF85]" /> : <FaCopy />}
                  {copied ? "Copied" : "Copy UPI"}
                </button>
              </div>

              {/* UTR input */}
              <form onSubmit={handleSubmitUtr} className="space-y-3">
                <div>
                  <label htmlFor="utr" className="block text-xs font-mono text-slate-200 mb-1.5 font-medium">
                    Enter UPI Reference / UTR Number after payment:
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

                <div className="flex gap-3 pt-2">
                  <GlowButton
                    type="submit"
                    variant="gold"
                    size="md"
                    className="w-full justify-center"
                    disabled={status === "verifying"}
                  >
                    {status === "verifying" ? "Verifying Payment..." : "Confirm Payment"}
                  </GlowButton>
                </div>
              </form>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 font-medium">
                <FaShieldAlt /> 256-bit Secure UPI Transaction
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
