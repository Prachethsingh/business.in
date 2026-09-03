import Link from "next/link";
import { FaCompass } from "react-icons/fa";

export function Footer() {
  return (
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
                <img src="/logo.png" alt="BUSINESS.IN Logo" className="w-full h-full object-contain" width={32} height={32} />
              </div>
              <span className="text-2xl font-bold font-serif text-white tracking-tight flex items-center gap-1.5">
                BUSINESS<span className="text-[#00FF85]">.IN</span>
              </span>
            </Link>
            <p className="text-sm text-slate-100 font-sans max-w-sm font-normal">
              Monte Carlo location intelligence & commercial real estate simulator for Bengaluru.
            </p>
            <p className="text-xs text-slate-200 font-sans font-normal">
              Authored by <strong className="text-white underline decoration-[#00FF85]">BUSINESS.IN Location Intelligence Research Team</strong>
            </p>
          </div>

          
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Footer navigation">
            {[
              { label: "Features", href: "/#features" },
              { label: "How It Works", href: "/#how-it-works" },
              { label: "FAQ", href: "/#faq" },
              { label: "Simulator Studio", href: "/dashboard" },
              { label: "Create Account", href: "/register" },
              { label: "Sign In", href: "/login" },
              { label: "llms.txt", href: "/llms.txt" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white hover:text-[#00FF85] transition-colors py-1.5 min-h-[32px] inline-flex items-center font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-200 font-mono font-medium">
          <div>
            &copy; {new Date().getFullYear()} BUSINESS.IN · Bengaluru Commercial Real Estate Intelligence.
          </div>
          <div className="flex items-center gap-4">
            <time dateTime="2026-08-30" className="text-white font-bold">
              Publication Date: August 30, 2026
            </time>
            <span>·</span>
            <span className="text-[#00FF85] font-bold">Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
