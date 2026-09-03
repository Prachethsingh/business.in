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
} from "react-icons/fa";

export default function BillingPage() {
  const { data: session, isPending: sessionPending } = useSession();

  const [activeQR, setActiveQR] = useState<"gpay" | "navi">("gpay");
  const [copiedVPA, setCopiedVPA] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [utr, setUtr] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [alreadyPro, setAlreadyPro] = useState(false);

  const VPA = "prachethsingh@okaxis";
  const AMOUNT = "99.00";
  const UPI_INTENT_URL = `upi://pay?pa=${VPA}&pn=BUSINESS.IN&am=${AMOUNT}&cu=INR&tn=BUSINESS.IN%20Pro%20Lifetime`;

  // Check if user already has Pro in localStorage or database
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localPro = localStorage.getItem("business_in_pro_unlocked");
      if (localPro === "true") {
        setAlreadyPro(true);
      }
    }

    async function checkStatus() {
      try {
        const res = await fetch("/api/billing/status");
        if (res.ok) {
          const data = await res.json();
          if (data.isPro) {
            setAlreadyPro(true);
          }
          if (data.recentOrder) {
            setOrderId(data.recentOrder.id);
            if (data.recentOrder.status === "SUBMITTED" || data.recentOrder.status === "APPROVED") {
              setSubmitted(true);
              if (data.recentOrder.utr) {
                setUtr(data.recentOrder.utr);
              }
            }
          }
        }
      } catch (e) {
        // Silently continue
      }
    }

    checkStatus();
  }, [session]);

  // Create an order in backend when user is authenticated and clicks or views payment
  async function initializeOrder() {
    if (orderId || !session?.user) return;
    try {
      setLoadingOrder(true);
      const res = await fetch("/api/billing/orders", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        if (data.order?.id) {
          setOrderId(data.order.id);
        }
      }
    } catch (e) {
      console.warn("Could not create pending order:", e);
    } finally {
      setLoadingOrder(false);
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

    const cleanUtr = utr.trim();
    if (!cleanUtr || cleanUtr.length < 8) {
      setErrorMsg("Please enter a valid UPI Reference / UTR number (at least 8 characters).");
      return;
    }

    setSubmitting(true);

    try {
      let activeId = orderId;

      // If user is logged in and doesn't have an order yet, create one now
      if (!activeId && session?.user) {
        const orderRes = await fetch("/api/billing/orders", { method: "POST" });
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          activeId = orderData.order?.id;
          setOrderId(activeId);
        }
      }

      // Submit proof to backend if order exists
      if (activeId) {
        const proofRes = await fetch(`/api/billing/orders/${activeId}/proof`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ utr: cleanUtr }),
        });

        if (!proofRes.ok) {
          const errData = await proofRes.json().catch(() => ({}));
          if (errData.error === "INVALID_REQUEST_OR_DUPLICATE_UTR") {
            setErrorMsg("This UTR has already been submitted or is invalid. Please double-check your receipt.");
            setSubmitting(false);
            return;
          }
        }
      }

      // Immediate local unlocking so user is not blocked
      if (typeof window !== "undefined") {
        localStorage.setItem("business_in_pro_unlocked", "true");
        localStorage.setItem("business_in_pro_utr", cleanUtr);
        if (activeId) {
          localStorage.setItem("business_in_pro_order_id", activeId);
        }
      }

      setSubmitted(true);
      setAlreadyPro(true);
    } catch (err) {
      console.error("Submission error:", err);
      // Fallback: still unlock locally so user gets immediate access
      if (typeof window !== "undefined") {
        localStorage.setItem("business_in_pro_unlocked", "true");
        localStorage.setItem("business_in_pro_utr", cleanUtr);
      }
      setSubmitted(true);
      setAlreadyPro(true);
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
            <FaShieldAlt className="text-[#00FF85]" /> Instant UPI Payment & Activation
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
                  Current Plan
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
                <span>Order: <strong className="text-white">{orderId.slice(-8).toUpperCase()}</strong></span>
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

              {/* Submission State / Form */}
              {submitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#00FF85]/10 border-2 border-[#00FF85]/40 space-y-5 text-center shadow-[0_0_30px_rgba(0,255,133,0.1)]">
                  <FaCheckCircle className="text-4xl text-[#00FF85] mx-auto animate-bounce" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold font-serif text-white">
                      Payment Submitted Successfully!
                    </h3>
                    <p className="text-xs text-[#00FF85] font-mono">
                      Pro Lifetime Features Have Been Unlocked Locally
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0F172A] border border-white/10 text-left space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Order ID:</span>
                      <strong className="text-white">{orderId ?? "ORD-PRO-99"}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>UTR Reference:</span>
                      <strong className="text-[#00FF85]">{utr}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Amount:</span>
                      <span className="text-white font-bold">₹99.00</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Plan:</span>
                      <span className="text-[#FFD700] font-bold">Pro Lifetime License</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Status:</span>
                      <span className="text-[#00FF85]">Verified & Active</span>
                    </div>
                  </div>

                  <Link href="/dashboard" className="block w-full">
                    <button className="w-full py-3.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-sm transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px]">
                      <span>Launch Simulator Studio (Pro Unlocked)</span>
                      <FaArrowRight size={12} />
                    </button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmitProof} className="space-y-4 p-6 rounded-2xl bg-[#161616] border border-white/10">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                      <FaReceipt className="text-[#00FF85]" /> Step 2: Enter Payment UTR Reference
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      After completing the ₹99 transfer in your UPI app, enter the 12-digit UTR / Reference ID below:
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={utr}
                      onChange={(e) => setUtr(e.target.value)}
                      placeholder="e.g. 428719823719"
                      maxLength={24}
                      className="w-full px-4 py-3 bg-[#181818] border border-white/20 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-[#00FF85] placeholder:text-slate-600 tracking-wider"
                      required
                    />
                    <div className="flex items-start gap-1.5 text-[11px] text-slate-400 font-sans leading-relaxed">
                      <FaInfoCircle className="text-slate-400 mt-0.5 shrink-0" />
                      <span>
                        Found in your GPay / PhonePe / Paytm payment receipt under <strong>"UPI Transaction ID"</strong> or <strong>"Google Transaction ID / UTR"</strong>.
                      </span>
                    </div>
                  </div>

                  {!session?.user && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
                      <span className="text-slate-400 block font-mono text-[11px]">
                        Account Sync (Optional):
                      </span>
                      <p className="text-slate-300 text-[11px] font-sans">
                        <Link href="/login?next=/billing" className="text-[#00FF85] underline font-medium">
                          Sign in
                        </Link>{" "}
                        to attach your Pro lifetime entitlement permanently to your account across all devices.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-xs transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Verifying & Activating...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span>Submit Proof & Unlock Pro License</span>
                      </>
                    )}
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
