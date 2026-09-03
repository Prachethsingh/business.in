"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSession } from "@/lib/auth-client";
import {
  FaCheck,
  FaTimes,
  FaCrown,
  FaQrcode,
  FaCopy,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaShieldAlt,
  FaInfoCircle,
  FaSpinner,
  FaArrowRight,
  FaReceipt,
  FaClock,
  FaExclamationTriangle,
  FaLock,
} from "react-icons/fa";

function validateUPIUTR(utr: string): { valid: boolean; reason?: string } {
  const clean = utr.trim();
  if (!/^\d{12}$/.test(clean)) {
    return {
      valid: false,
      reason: `UTR must be exactly 12 numeric digits. You have entered ${clean.length} digit${clean.length === 1 ? "" : "s"}.`,
    };
  }
  if (/^(.)\1{11}$/.test(clean)) {
    return {
      valid: false,
      reason: "Invalid UTR: repetitive dummy numbers (e.g. 000000000000 or 111111111111) are rejected.",
    };
  }
  const dummyPatterns = [
    "123456789012",
    "012345678901",
    "987654321098",
    "123456781234",
    "000123456789",
    "112233445566",
    "121212121212",
    "001122334455",
  ];
  if (dummyPatterns.includes(clean)) {
    return {
      valid: false,
      reason: "Invalid UTR: test or sequential dummy reference numbers are not accepted.",
    };
  }
  return { valid: true };
}

export default function BillingPage() {
  const { data: session, isPending: sessionPending } = useSession();

  const [activeQR, setActiveQR] = useState<"gpay" | "navi">("gpay");
  const [copiedVPA, setCopiedVPA] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [utr, setUtr] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<"NONE" | "PENDING" | "SUBMITTED" | "APPROVED" | "REJECTED">("NONE");
  const [submittedUtr, setSubmittedUtr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProUser, setIsProUser] = useState(false);

  const VPA = "prachethsingh@okaxis";
  const AMOUNT = "99.00";
  const UPI_INTENT_URL = `upi://pay?pa=${VPA}&pn=BUSINESS.IN&am=${AMOUNT}&cu=INR&tn=BUSINESS.IN%20Pro%20Lifetime`;

  // Check user entitlement & order status from database
  async function fetchBillingStatus() {
    try {
      const res = await fetch("/api/billing/status");
      if (res.ok) {
        const data = await res.json();
        if (data.isPro) {
          setIsProUser(true);
          setOrderStatus("APPROVED");
          if (typeof window !== "undefined") {
            localStorage.setItem("business_in_pro_unlocked", "true");
          }
        } else if (data.recentOrder) {
          setOrderId(data.recentOrder.id);
          setOrderStatus(data.recentOrder.status);
          if (data.recentOrder.utr) {
            setSubmittedUtr(data.recentOrder.utr);
          }
        }
      }
    } catch {
      // Ignore network errors
    }
  }

  useEffect(() => {
    fetchBillingStatus();
  }, [session]);

  // Create an order if user is signed in and doesn't have one
  async function initializeOrder() {
    if (orderId || !session?.user) return;
    try {
      const res = await fetch("/api/billing/orders", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        if (data.order?.id) {
          setOrderId(data.order.id);
          setOrderStatus(data.order.status);
        }
      }
    } catch (e) {
      console.warn("Could not create pending order:", e);
    }
  }

  useEffect(() => {
    if (session?.user && !orderId) {
      initializeOrder();
    }
  }, [session, orderId]);

  function handleCopyVPA() {
    navigator.clipboard.writeText(VPA);
    setCopiedVPA(true);
    setTimeout(() => setCopiedVPA(false), 2000);
  }

  function handleCopyAmount() {
    navigator.clipboard.writeText(AMOUNT);
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  }

  async function handleSubmitProof(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!session?.user) {
      setErrorMsg("Please sign in first to attach your Pro license to your account.");
      return;
    }

    const cleanUtr = utr.trim();
    const validation = validateUPIUTR(cleanUtr);
    if (!validation.valid) {
      setErrorMsg(validation.reason ?? "Invalid 12-digit UTR.");
      return;
    }

    setSubmitting(true);

    try {
      let activeId = orderId;

      if (!activeId) {
        const orderRes = await fetch("/api/billing/orders", { method: "POST" });
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          activeId = orderData.order?.id;
          setOrderId(activeId);
        } else {
          setErrorMsg("Could not initiate payment order. Please refresh and try again.");
          setSubmitting(false);
          return;
        }
      }

      const proofRes = await fetch(`/api/billing/orders/${activeId}/proof`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ utr: cleanUtr }),
      });

      const resData = await proofRes.json().catch(() => ({}));

      if (!proofRes.ok) {
        setErrorMsg(resData.message || resData.error || "Submission rejected. Please check your UTR number.");
        setSubmitting(false);
        return;
      }

      setSubmittedUtr(cleanUtr);
      setOrderStatus("SUBMITTED");
      setUtr("");
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Network error submitting proof. Please check your internet connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00FF85] font-mono px-3.5 py-1.5 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30 inline-flex items-center gap-1.5">
            <FaShieldAlt className="text-[#00FF85]" /> Official Bank Reconciled UPI
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-base text-slate-300 max-w-xl mx-auto font-sans">
            Start screening free forever. Upgrade to Pro for unlimited location scenarios, exportable investor reports, and advanced analytics.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Starter Plan */}
          <div className="glass rounded-3xl p-8 bg-[#121212] border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-serif text-white">Starter / Free</h3>
                <span className="text-xs font-mono text-[#CBD5E1] px-2.5 py-1 rounded-full bg-white/5">
                  Current Tier
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-mono text-white">₹0</span>
                <span className="text-xs font-mono text-[#CBD5E1]">/ forever</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Full access to the Monte Carlo simulator with basic scenario saving.
              </p>

              <ul className="space-y-3 text-xs font-sans text-slate-300 pt-4 border-t border-white/10">
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
                <li className="flex items-center gap-2 text-slate-500">
                  <FaTimes className="text-red-400" /> Exportable PDF & CSV Reports
                </li>
                <li className="flex items-center gap-2 text-slate-500">
                  <FaTimes className="text-red-400" /> Shareable Read-Only Links
                </li>
              </ul>
            </div>

            <button
              disabled
              className="w-full py-3 rounded-xl bg-white/5 text-slate-400 font-mono text-xs border border-white/10 cursor-not-allowed min-h-[44px]"
            >
              Active Free Tier
            </button>
          </div>

          {/* Pro Plan */}
          <div className="glass rounded-3xl p-8 bg-[#161616] border-2 border-[#00FF85]/60 relative overflow-hidden flex flex-col justify-between space-y-6 shadow-[0_0_40px_rgba(0,255,133,0.15)]">
            <div className="absolute top-0 right-0 bg-[#00FF85] text-black font-mono text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              Lifetime Access
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                  <FaCrown className="text-[#FFD700]" /> Pro Lifetime
                </h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold font-mono text-[#00FF85]">₹99</span>
                <span className="text-xs font-mono text-slate-400">/ one-time payment</span>
                <span className="text-[11px] font-mono text-slate-500 line-through">₹999</span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                For entrepreneurs, founders, and consultants seeking comprehensive location feasibility.
              </p>

              <ul className="space-y-3 text-xs font-sans text-slate-200 pt-4 border-t border-white/10 font-medium">
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
                  <FaCheck className="text-[#00FF85]" /> Priority Support & Model Updates
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <a href="#payment-section" className="block w-full">
                <button className="w-full py-3.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-sm transition-all shadow-lg hover:shadow-[#00FF85]/20 flex items-center justify-center gap-2 min-h-[44px]">
                  <span>Pay ₹99 & Unlock Pro</span>
                  <FaArrowRight size={13} />
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div id="payment-section" className="glass rounded-3xl p-6 sm:p-10 bg-[#121212] border border-white/15 space-y-8 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00FF85]/15 text-[#00FF85] flex items-center justify-center text-xl border border-[#00FF85]/30">
                <FaQrcode />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  UPI Instant Payment (₹99)
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Scan QR code or click to launch your UPI app directly
                </p>
              </div>
            </div>

            {orderId && (
              <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse"></span>
                <span>Order Ref: <strong className="text-white">{orderId.slice(-8).toUpperCase()}</strong></span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: QR Code & Switcher */}
            <div className="lg:col-span-6 flex flex-col items-center space-y-5 p-6 rounded-2xl bg-[#161616] border border-white/10">
              {/* QR Code Tab Switcher */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 w-full max-w-xs">
                <button
                  type="button"
                  onClick={() => setActiveQR("gpay")}
                  className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
                    activeQR === "gpay"
                      ? "bg-[#00FF85] text-black shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Google Pay QR
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQR("navi")}
                  className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
                    activeQR === "navi"
                      ? "bg-[#00FF85] text-black shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Navi / UPI QR
                </button>
              </div>

              {/* Scannable QR Container */}
              <div className="relative group p-3 bg-white rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-[#00FF85]/40 transition-all hover:border-[#00FF85]">
                <img
                  src={activeQR === "gpay" ? "/qr-gpay.jpg" : "/qr-navi.jpg"}
                  alt={activeQR === "gpay" ? "Google Pay UPI QR Code" : "Navi UPI QR Code"}
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-xl"
                  width={256}
                  height={256}
                />
                <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-xs font-mono text-white bg-black/80 px-3 py-1.5 rounded-lg border border-white/20">
                    Scan with any UPI App
                  </span>
                </div>
              </div>

              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-white font-mono">
                  {activeQR === "gpay" ? "Google Pay Business QR" : "Navi / Universal UPI QR"}
                </p>
                <p className="text-[11px] text-slate-400 font-sans">
                  Accepts GPay, PhonePe, Paytm, Cred, BHIM, Amazon Pay & all bank UPI apps
                </p>
              </div>

              {/* 1-Click Pay on Mobile / UPI App button */}
              <a
                href={UPI_INTENT_URL}
                className="w-full max-w-xs py-3 rounded-xl bg-[#1F2937] hover:bg-[#374151] border border-[#00FF85]/50 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:border-[#00FF85]"
              >
                <FaMobileAlt className="text-[#00FF85]" />
                <span>Open in UPI App (1-Click Pay)</span>
                <FaExternalLinkAlt size={10} className="text-slate-400" />
              </a>
            </div>

            {/* Right Column: Copyable Info & Proof Submission */}
            <div className="lg:col-span-6 space-y-6">
              {/* Payee Info Box */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Payee UPI VPA:</span>
                    <span className="text-[11px] text-[#00FF85]">Verified Merchant</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#181818] border border-white/10">
                    <strong className="text-white font-mono text-sm tracking-wide">{VPA}</strong>
                    <button
                      type="button"
                      onClick={handleCopyVPA}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-[#00FF85] flex items-center gap-1.5 font-mono transition-all"
                    >
                      {copiedVPA ? <FaCheck /> : <FaCopy />}
                      <span>{copiedVPA ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-mono p-3 rounded-xl bg-[#181818] border border-white/10">
                  <span className="text-slate-400">Exact Payable Amount:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[#00FF85]">₹{AMOUNT}</span>
                    <button
                      type="button"
                      onClick={handleCopyAmount}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] text-slate-300 flex items-center gap-1 font-mono transition-all"
                    >
                      {copiedAmount ? <FaCheck /> : <FaCopy />}
                      <span>{copiedAmount ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Already Approved State */}
              {orderStatus === "APPROVED" ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#00FF85]/10 border-2 border-[#00FF85]/40 space-y-5 text-center shadow-[0_0_30px_rgba(0,255,133,0.1)]">
                  <FaCheckCircle className="text-4xl text-[#00FF85] mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold font-serif text-white">
                      Pro Lifetime License Active!
                    </h3>
                    <p className="text-xs text-[#00FF85] font-mono">
                      Your account has full unlimited access to all features.
                    </p>
                  </div>

                  <Link href="/dashboard" className="block w-full">
                    <button className="w-full py-3.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-sm transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px]">
                      <span>Launch Simulator Studio</span>
                      <FaArrowRight size={12} />
                    </button>
                  </Link>
                </div>
              ) : orderStatus === "SUBMITTED" ? (
                /* Submitted - Awaiting Admin Verification */
                <div className="p-6 sm:p-8 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-5 text-center shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                  <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl border border-amber-500/30">
                    <FaClock className="animate-spin" style={{ animationDuration: "8s" }} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold font-serif text-white">
                      Payment Proof Submitted · Pending Verification
                    </h3>
                    <p className="text-xs text-amber-300 font-mono">
                      Our finance desk reconciles incoming UPI bank credits within 15–30 minutes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0F172A] border border-white/10 text-left space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Order Reference:</span>
                      <strong className="text-white">{orderId ?? "ORD-PRO-99"}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Submitted UTR:</span>
                      <strong className="text-amber-400 tracking-wider">{submittedUtr}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Amount Paid:</span>
                      <span className="text-white font-bold">₹99.00</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Verification Status:</span>
                      <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/20">
                        Under Admin Review
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Once verified against our bank statement, your account will be permanently upgraded to Pro. You can refresh this page to check review status.
                  </p>

                  <button
                    type="button"
                    onClick={fetchBillingStatus}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold transition-all border border-white/15 flex items-center justify-center gap-2 min-h-[40px]"
                  >
                    <FaClock size={12} />
                    <span>Check Verification Status</span>
                  </button>
                </div>
              ) : (
                /* Submission Form */
                <form onSubmit={handleSubmitProof} className="space-y-4 p-6 rounded-2xl bg-[#161616] border border-white/10">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                      <FaReceipt className="text-[#00FF85]" /> Step 2: Enter 12-Digit UPI Reference (UTR)
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      After completing the ₹99 payment in GPay / PhonePe / Paytm, enter the <strong>exact 12-digit numeric UTR</strong> from your receipt:
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-mono flex items-start gap-2">
                      <FaExclamationTriangle className="text-red-400 mt-0.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={utr}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 12);
                          setUtr(digitsOnly);
                          setErrorMsg(null);
                        }}
                        placeholder="e.g. 428719823719"
                        maxLength={12}
                        className="w-full px-4 py-3 bg-[#181818] border border-white/20 rounded-xl text-base font-mono text-white focus:outline-none focus:border-[#00FF85] placeholder:text-slate-600 tracking-widest"
                        required
                      />
                      <span className="absolute right-3 top-3.5 text-xs font-mono text-slate-400">
                        {utr.length}/12
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className={utr.length === 12 ? "text-[#00FF85] font-bold" : "text-slate-400"}>
                        {utr.length === 12 ? "✓ 12 of 12 digits entered" : `${12 - utr.length} digit${12 - utr.length === 1 ? "" : "s"} remaining`}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5 text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
                      <FaInfoCircle className="text-slate-400 mt-0.5 shrink-0" />
                      <span>
                        Found in your GPay / PhonePe / Paytm receipt under <strong>"UPI Transaction ID"</strong> or <strong>"Google Transaction ID / UTR"</strong> (strictly 12 numeric digits).
                      </span>
                    </div>
                  </div>

                  {!session?.user ? (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
                        <FaLock /> Sign In Required to Submit Proof
                      </div>
                      <p className="text-slate-300 font-sans leading-relaxed">
                        Please sign in to your account first so our finance desk can attach the Pro Lifetime entitlement directly to your user account.
                      </p>
                      <Link href="/login?next=/billing" className="block pt-1">
                        <button
                          type="button"
                          className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-500/90 text-black font-mono font-bold text-xs transition-all min-h-[38px]"
                        >
                          Sign In to Submit UTR
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting || utr.length !== 12}
                      className="w-full py-3.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-xs transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Submitting for Verification...</span>
                        </>
                      ) : (
                        <>
                          <FaCheck />
                          <span>Submit UTR for Admin Verification</span>
                        </>
                      )}
                    </button>
                  )}
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
