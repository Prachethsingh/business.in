"use client";

import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";
import { FaCompass, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0A0A0A]/95 border-b border-white/15">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2.5 text-decoration-none group min-h-[44px]">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-[#00FF85]/50 group-hover:border-[#00FF85] transition-all shadow-lg bg-[#0F172A] p-0.5">
            <img src="/logo.webp" alt="BUSINESS.IN Logo" className="w-full h-full object-contain" width={40} height={40} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white font-mono text-base">
              BUSINESS<span className="text-[#00FF85]">.IN</span>
            </span>
            <span className="text-[10px] text-[#00FF85] font-bold uppercase tracking-wider -mt-1 font-mono">
              Bengaluru AI
            </span>
          </div>
        </Link>

        
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <Link
            href="/#features"
            className="text-sm font-semibold text-white hover:text-[#00FF85] transition-colors py-2 min-h-[36px] inline-flex items-center"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-semibold text-white hover:text-[#00FF85] transition-colors py-2 min-h-[36px] inline-flex items-center"
          >
            How it Works
          </Link>
          <Link
            href="/#stats"
            className="text-sm font-semibold text-white hover:text-[#00FF85] transition-colors py-2 min-h-[36px] inline-flex items-center"
          >
            Stats
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-semibold text-white hover:text-[#00FF85] transition-colors py-2 min-h-[36px] inline-flex items-center"
          >
            FAQ
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-white hover:text-[#00FF85] transition-colors py-2 min-h-[36px] inline-flex items-center"
          >
            Simulator
          </Link>
        </nav>

        
        <div className="hidden sm:flex items-center gap-3">
          {!isPending && session?.user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm text-white hover:text-[#00FF85] min-h-[40px] px-2 font-medium">
                <FaUserCircle className="text-[#00FF85] text-lg" />
                <span className="font-mono text-xs text-white">{session.user.name || session.user.email}</span>
              </Link>
              <button
                onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
                className="px-3.5 py-2 text-xs font-semibold text-white hover:text-[#00FF85] hover:bg-white/10 rounded-xl transition-all border border-white/20 min-h-[36px]"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 rounded-xl transition-all border border-white/20 min-h-[40px]">
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <GlowButton variant="primary" size="sm">
                  Create Account
                </GlowButton>
              </Link>
            </>
          )}
        </div>

        
        <div className="sm:hidden flex items-center gap-2">
          {!isPending && session?.user ? (
            <Link href="/dashboard">
              <GlowButton variant="primary" size="sm">
                Dashboard
              </GlowButton>
            </Link>
          ) : (
            <Link href="/register">
              <GlowButton variant="primary" size="sm">
                Sign Up
              </GlowButton>
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-white rounded-lg focus:outline-none bg-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-[#121212] border-b border-white/20 space-y-3">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 min-h-[40px]"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 min-h-[40px]"
          >
            How it Works
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 min-h-[40px]"
          >
            FAQ
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 min-h-[40px]"
          >
            Simulator Studio
          </Link>
          <div className="pt-2 border-t border-white/20 flex flex-col gap-2">
            {!isPending && session?.user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });
                }}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-white/10 rounded-xl border border-white/20 min-h-[44px]"
              >
                Sign Out ({session.user.name || session.user.email})
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-3 text-center text-sm font-semibold text-white bg-white/10 rounded-xl border border-white/20 min-h-[44px]">
                    Sign In
                  </button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-3 text-center text-sm font-bold text-black bg-[#00FF85] hover:bg-[#00FF85]/90 rounded-xl min-h-[44px]">
                    Create New Account
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
