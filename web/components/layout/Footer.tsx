"use client";

import Link from "next/link";
import { CookiePreferencesModal, openCookiePreferences } from "@/components/ui/CookiePreferencesModal";

export function Footer() {
  return (
    <>
      <footer

      className="py-14 px-6 sm:px-8 lg:px-12 border-t"
      style={{
        borderColor: "rgba(255,255,255,0.15)",
        background: "rgba(10,10,10,0.98)",
      }}
    >
      <div className="w-full space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-[#00FF85]/50 shadow-md bg-[#0F172A] p-0.5">
                <img src="/logo.webp" alt="BUSINESS.IN Logo" className="w-full h-full object-contain" width={32} height={32} />
              </div>
              <span className="text-2xl font-bold font-serif text-white tracking-tight flex items-center gap-1.5">
                BUSINESS<span className="text-[#00FF85]">.IN</span>
              </span>
            </Link>
            <p className="text-sm text-white font-sans max-w-sm font-normal">
              Monte Carlo location intelligence & commercial real estate simulator for Bengaluru.
            </p>
            <p className="text-xs text-white font-sans font-normal">
              Authored by <strong className="text-white underline decoration-[#00FF85]">BUSINESS.IN Location Intelligence Research Team</strong>
            </p>
          </div>

          
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm items-center" aria-label="Footer navigation">
            <Link
              href="/#features"
              className="text-white hover:text-[#00FF85] transition-colors py-1.5 min-h-[32px] inline-flex items-center font-semibold"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-white hover:text-[#00FF85] transition-colors py-1.5 min-h-[32px] inline-flex items-center font-semibold"
            >
              How It Works
            </Link>
            <Link
              href="/#faq"
              className="text-white hover:text-[#00FF85] transition-colors py-1.5 min-h-[32px] inline-flex items-center font-semibold"
            >
              FAQ
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-[#00FF85] transition-colors py-1.5 min-h-[32px] inline-flex items-center font-semibold"
            >
              Simulator Studio
            </Link>
            <Link
              href="/privacy"
              className="text-white hover:text-[#00FF85] transition-colors py-1.5 min-h-[32px] inline-flex items-center font-semibold"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-white hover:text-[#00FF85] transition-colors py-1.5 min-h-[32px] inline-flex items-center font-semibold"
            >
              Site terms
            </Link>
            <button
              type="button"
              onClick={() => openCookiePreferences()}
              className="text-white hover:text-[#00FF85] transition-colors py-1.5 min-h-[32px] inline-flex items-center font-semibold cursor-pointer text-left bg-transparent border-none p-0"
            >
              Cookie Preferences
            </button>
          </nav>
        </div>

        
        <div className="pt-6 border-t border-white/20 text-xs text-white font-mono font-medium flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            &copy; {new Date().getFullYear()} BUSINESS.IN · Bengaluru Commercial Real Estate Intelligence.
          </div>
          <div>
            Published: <time dateTime="2026-08-30" itemProp="datePublished" className="text-white font-semibold">August 30, 2026</time>
          </div>
        </div>
      </div>
    </footer>
    <CookiePreferencesModal />
  </>
);
}
