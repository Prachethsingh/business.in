import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — BUSINESS.IN",
  description: "Learn how BUSINESS.IN processes data in accordance with the India DPDP Act 2023 and GDPR.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <header className="space-y-4 text-center sm:text-left border-b border-white/10 pb-8">
          <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#00FF85] bg-[#00FF85]/10 px-3 py-1 rounded-full border border-[#00FF85]/30">
            Compliance & Data Governance
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-slate-300">
            Last updated & Effective Date: August 30, 2026 · Compliant with India DPDP Act 2023
          </p>
        </header>

        <section className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-200">
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-white">1. Executive Summary & Scope</h2>
            <p>
              BUSINESS.IN (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your personal data and upholding your fundamental right to digital privacy. This Privacy Policy governs your use of the BUSINESS.IN platform, location simulation tools, and reporting services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-white">2. No Individual Device Surveillance (Telecom Anonymity)</h2>
            <p>
              BUSINESS.IN does not capture, store, or sell individual device identifiers, phone numbers, IMEI records, or personal mobility trajectories. All mobility and pedestrian footfall indicators utilized in our Monte Carlo algorithms are derived exclusively from aggregated, anonymized, and statistically smoothed public and licensed geospatial datasets.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-white">3. Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong>Account Information:</strong> Name, email address, password hashes (Argon2id/bcrypt), and account creation timestamps.</li>
              <li><strong>Simulation & Financial Assumptions:</strong> User-provided investment estimates, monthly rent inputs, and target break-even parameters.</li>
              <li><strong>Technical Metadata:</strong> Request headers, IP address for rate-limiting, and session authentication tokens stored in secure, HttpOnly cookies.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-white">4. User Rights Under India DPDP Act 2023</h2>
            <p>
              As a Data Principal, you are entitled to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>Right to access summary of your personal data and processing activities.</li>
              <li>Right to correction, completion, and updating of inaccurate data.</li>
              <li>Right to data erasure and permanent deletion of your account and saved simulations.</li>
              <li>Right to grievance redressal by contacting our designated Data Grievance Officer.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-white">5. Contact & Grievance Redressal</h2>
            <p>
              For privacy inquiries, data export requests, or erasure demands, please contact:
              <br />
              <strong className="text-white font-mono">Grievance Officer:</strong> privacy@business.in
              <br />
              <strong className="text-white font-mono">Address:</strong> BUSINESS.IN Intelligence Labs, Indiranagar, Bengaluru, Karnataka 560038
            </p>
          </div>
        </section>

        <div className="pt-8 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
          <Link href="/terms" className="text-[#00FF85] hover:underline font-medium">
            View Terms of Service &rarr;
          </Link>
          <Link href="/" className="text-slate-300 hover:text-white">
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
