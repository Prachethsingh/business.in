"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaWifi, FaRedo } from "react-icons/fa";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-white/10 text-white flex items-center justify-center text-2xl mx-auto border border-white/15">
          <FaWifi className="opacity-60" />
        </div>
        <h1 className="text-2xl font-bold font-serif text-white">You&apos;re Currently Offline</h1>
        <p className="text-xs text-[#CBD5E1] font-mono leading-relaxed">
          It looks like your internet connection is down. The cached core simulation calculator remains functional.
        </p>

        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold font-mono text-xs rounded-xl flex items-center gap-2 transition-all min-h-[40px]"
          >
            <FaRedo /> Retry Connection
          </button>
          <Link href="/dashboard">
            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-mono text-xs rounded-xl border border-white/10 transition-all min-h-[40px]">
              Open Studio
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
