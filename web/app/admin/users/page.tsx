"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaArrowLeft, FaUsers, FaSearch, FaUserShield, FaBan } from "react-icons/fa";

interface UserRow {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  isPro: boolean;
  createdAt: string;
}

const INITIAL_USERS: UserRow[] = [
  { id: "u_1", email: "admin@business.in", name: "Lead Admin", role: "ADMIN", status: "ACTIVE", isPro: true, createdAt: "2026-08-01" },
  { id: "u_2", email: "rahul.bengaluru@gmail.com", name: "Rahul S.", role: "USER", status: "ACTIVE", isPro: true, createdAt: "2026-08-12" },
  { id: "u_3", email: "priya.retail@yahoo.com", name: "Priya Rao", role: "USER", status: "ACTIVE", isPro: false, createdAt: "2026-08-18" },
  { id: "u_4", email: "karan.invest@outlook.com", name: "Karan M.", role: "USER", status: "ACTIVE", isPro: true, createdAt: "2026-08-25" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggleRole(id: string) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          if (u.id === "u_1") return u; 
          return { ...u, role: u.role === "ADMIN" ? "USER" : "ADMIN" };
        }
        return u;
      })
    );
  }

  function toggleStatus(id: string) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          if (u.id === "u_1") return u; 
          return { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" };
        }
        return u;
      })
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
              <FaUsers className="text-[#00FF85]" /> User Governance
            </h1>
          </div>

          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3.5 top-3 text-[#CBD5E1]" size={13} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user or email..."
              className="w-full pl-9 pr-3.5 py-2 bg-[#161616] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF85]"
            />
          </div>
        </div>

        
        <div className="glass rounded-3xl overflow-hidden bg-[#121212] border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-[#CBD5E1] uppercase">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{u.name}</div>
                      <div className="text-[11px] text-[#CBD5E1]">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === "ADMIN" ? "bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40" : "bg-white/10 text-white"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.isPro ? "bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40" : "text-white"
                      }`}>
                        {u.isPro ? "PRO (₹99)" : "FREE"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === "ACTIVE" ? "bg-[#00FF85]/20 text-[#00FF85]" : "bg-red-500/20 text-red-400"
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => toggleRole(u.id)}
                        disabled={u.id === "u_1"}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 transition-all"
                        title="Toggle Admin role"
                      >
                        <FaUserShield size={11} className="inline mr-1" />
                        {u.role === "ADMIN" ? "Demote" : "Promote"}
                      </button>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        disabled={u.id === "u_1"}
                        className={`px-2.5 py-1 rounded-lg border transition-all ${
                          u.status === "ACTIVE"
                            ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                            : "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                        } disabled:opacity-30`}
                      >
                        <FaBan size={10} className="inline mr-1" />
                        {u.status === "ACTIVE" ? "Suspend" : "Activate"}
                      </button>
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
