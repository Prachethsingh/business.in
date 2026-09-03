"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaArrowLeft, FaMoneyCheckAlt, FaCheck, FaTimes, FaQrcode } from "react-icons/fa";

interface PaymentOrder {
  id: string;
  userEmail: string;
  amountPaise: number;
  utr: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
}

const INITIAL_ORDERS: PaymentOrder[] = [
  { id: "ord_101", userEmail: "rahul.bengaluru@gmail.com", amountPaise: 9900, utr: "428719823719", status: "APPROVED", submittedAt: "2026-08-30 14:12" },
  { id: "ord_102", userEmail: "priya.retail@yahoo.com", amountPaise: 9900, utr: "429981726351", status: "PENDING", submittedAt: "2026-08-30 18:45" },
  { id: "ord_103", userEmail: "karan.invest@outlook.com", amountPaise: 9900, utr: "430192837461", status: "PENDING", submittedAt: "2026-08-30 19:20" },
];

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState<PaymentOrder[]>(INITIAL_ORDERS);

  function handleDecision(id: string, decision: "APPROVED" | "REJECTED") {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: decision } : o))
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
          <div>
            <Link href="/admin" className="text-xs font-mono text-[#00FF85] hover:underline inline-flex items-center gap-1.5 mb-1">
              <FaArrowLeft size={10} /> Back to Admin Console
            </Link>
            <h1 className="text-2xl font-bold font-serif text-white flex items-center gap-2">
              <FaMoneyCheckAlt className="text-[#FFD700]" /> UPI Payment Review Queue
            </h1>
            <p className="text-xs text-[#E2E8F0] font-mono">
              Review incoming UTR reference numbers to activate Pro Lifetime entitlements
            </p>
          </div>

          <div className="text-xs font-mono text-[#FFD700] bg-[#FFD700]/10 px-3 py-1.5 rounded-xl border border-[#FFD700]/30 flex items-center gap-2">
            <FaQrcode /> Payee VPA: prachethsingh@okaxis
          </div>
        </div>

        
        <div className="glass rounded-3xl overflow-hidden bg-[#121212] border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-[#CBD5E1] uppercase">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">UTR Reference</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-white">{o.id}</td>
                    <td className="p-4">{o.userEmail}</td>
                    <td className="p-4 font-bold text-white">₹{Math.round(o.amountPaise / 100)}</td>
                    <td className="p-4 text-[#38BDF8] font-bold">{o.utr}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        o.status === "APPROVED"
                          ? "bg-green-500/20 text-[#00FF85]"
                          : o.status === "REJECTED"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-[#FFD700]/20 text-[#FFD700] animate-pulse"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {o.status === "PENDING" ? (
                        <>
                          <button
                            onClick={() => handleDecision(o.id, "APPROVED")}
                            className="px-3 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-[#00FF85] border border-green-500/40 transition-all font-bold"
                          >
                            <FaCheck size={11} className="inline mr-1" /> Approve
                          </button>
                          <button
                            onClick={() => handleDecision(o.id, "REJECTED")}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 transition-all font-bold"
                          >
                            <FaTimes size={11} className="inline mr-1" /> Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-[#CBD5E1]">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
