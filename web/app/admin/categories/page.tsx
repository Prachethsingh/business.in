"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaArrowLeft, FaTags, FaPlus, FaLock } from "react-icons/fa";

interface CategoryRow {
  key: string;
  label: string;
  defaultTicket: number;
  defaultHours: number;
  isSystem: boolean;
}

const INITIAL_CATEGORIES: CategoryRow[] = [
  { key: "cafe", label: "Café & Bakery", defaultTicket: 250, defaultHours: 12, isSystem: true },
  { key: "restaurant", label: "Restaurant & Dine-in", defaultTicket: 650, defaultHours: 14, isSystem: true },
  { key: "salon", label: "Salon & Spa", defaultTicket: 500, defaultHours: 10, isSystem: true },
  { key: "retail", label: "Retail & Apparel", defaultTicket: 1200, defaultHours: 11, isSystem: true },
  { key: "clinic", label: "Clinic / Pharmacy", defaultTicket: 400, defaultHours: 10, isSystem: true },
  { key: "warehouse", label: "Dark Store / Warehouse", defaultTicket: 350, defaultHours: 16, isSystem: true },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryRow[]>(INITIAL_CATEGORIES);
  const [newLabel, setNewLabel] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newTicket, setNewTicket] = useState(300);

  function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newLabel || !newKey) return;
    setCategories((prev) => [
      ...prev,
      {
        key: newKey.toLowerCase().replace(/[^a-z0-9_]/g, "_"),
        label: newLabel,
        defaultTicket: Number(newTicket),
        defaultHours: 10,
        isSystem: false,
      },
    ]);
    setNewLabel("");
    setNewKey("");
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
              <FaTags className="text-[#FFA0A0]" /> Business Category Extensibility
            </h1>
            <p className="text-xs text-[#E2E8F0] font-mono">
              Define and tune simulation parameters for emerging retail and commercial formats
            </p>
          </div>
        </div>

        
        <form onSubmit={handleAddCategory} className="glass rounded-3xl p-6 bg-[#121212] border border-white/10 flex flex-wrap items-end gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-[#CBD5E1]">Format Name</label>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="e.g. Specialty Microbrewery"
              className="px-3.5 py-2 bg-[#161616] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF85]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#CBD5E1]">System Key (Immutable)</label>
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="e.g. microbrewery"
              className="px-3.5 py-2 bg-[#161616] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF85]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#CBD5E1]">Default Ticket (₹)</label>
            <input
              type="number"
              value={newTicket}
              onChange={(e) => setNewTicket(Number(e.target.value))}
              className="px-3.5 py-2 bg-[#161616] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF85] w-28"
              required
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 min-h-[38px]"
          >
            <FaPlus /> Add Category
          </button>
        </form>

        
        <div className="glass rounded-3xl overflow-hidden bg-[#121212] border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-[#CBD5E1] uppercase">
                <tr>
                  <th className="p-4">Category</th>
                  <th className="p-4">Key</th>
                  <th className="p-4">Default Ticket</th>
                  <th className="p-4">Default Operating Hours</th>
                  <th className="p-4 text-right">Lock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {categories.map((c) => (
                  <tr key={c.key} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold text-white text-sm">{c.label}</td>
                    <td className="p-4 text-[#38BDF8]">{c.key}</td>
                    <td className="p-4 text-white">₹{c.defaultTicket}</td>
                    <td className="p-4 text-white">{c.defaultHours} hrs / day</td>
                    <td className="p-4 text-right">
                      {c.isSystem ? (
                        <span className="text-[11px] text-[#CBD5E1] flex items-center justify-end gap-1">
                          <FaLock size={10} /> Core Format
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#00FF85] font-bold">Custom Extension</span>
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
