"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaArrowLeft, FaClipboardList, FaShieldAlt } from "react-icons/fa";

interface AuditLogRow {
  id: string;
  actor: string;
  action: string;
  entity: string;
  timestamp: string;
  ip: string;
}

const AUDIT_LOGS: AuditLogRow[] = [
  { id: "log_101", actor: "admin@business.in", action: "PAYMENT_APPROVED", entity: "Order #ord_101 (₹99)", timestamp: "2026-08-30 14:13:02", ip: "49.37.12.8" },
  { id: "log_102", actor: "rahul.bengaluru@gmail.com", action: "PROJECT_CREATED", entity: "Project 'Indiranagar Flagship'", timestamp: "2026-08-30 14:20:15", ip: "106.51.77.19" },
  { id: "log_103", actor: "priya.retail@yahoo.com", action: "UTR_SUBMITTED", entity: "Order #ord_102 (UTR: 429981726351)", timestamp: "2026-08-30 18:45:30", ip: "122.171.21.90" },
  { id: "log_104", actor: "admin@business.in", action: "USER_ROLE_PROMOTED", entity: "User 'karan.invest@outlook.com'", timestamp: "2026-08-30 19:05:12", ip: "49.37.12.8" },
];

export default function AdminAuditPage() {
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
              <FaClipboardList className="text-[#38BDF8]" /> Security & Audit Trail
            </h1>
            <p className="text-xs text-[#E2E8F0] font-mono">
              Append-only immutable record of all administrative, financial, and access mutations
            </p>
          </div>

          <div className="text-xs font-mono text-[#00FF85] bg-[#00FF85]/10 px-3 py-1.5 rounded-xl border border-[#00FF85]/30 flex items-center gap-2">
            <FaShieldAlt /> Tamper-Evident Ledger
          </div>
        </div>

        
        <div className="glass rounded-3xl overflow-hidden bg-[#121212] border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-[#CBD5E1] uppercase">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Target Entity</th>
                  <th className="p-4 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {AUDIT_LOGS.map((l) => (
                  <tr key={l.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 text-[#CBD5E1]">{l.timestamp}</td>
                    <td className="p-4 font-bold text-white">{l.actor}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">
                        {l.action}
                      </span>
                    </td>
                    <td className="p-4 text-white">{l.entity}</td>
                    <td className="p-4 text-right text-[#CBD5E1]">{l.ip}</td>
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
