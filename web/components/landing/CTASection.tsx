"use client";

import { useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { useRouter } from "next/navigation";
import { UpgradeModal } from "@/components/billing/UpgradeModal";

export function CTASection() {
  const router = useRouter();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="glass rounded-3xl p-12 relative overflow-hidden"
          style={{
            background: "rgba(22, 22, 22, 0.95)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(0,255,133,0.05)",
          }}
        >
          
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "#00FF85" }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ background: "#1E90FF" }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <span
              className="text-xs font-bold uppercase tracking-widest text-[#00FF85] font-mono px-3 py-1 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30 inline-block"
            >
              Start Today
            </span>
            <h2
              className="mt-6 text-white"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Ready to make a{" "}
              <span className="gradient-text-blue">
                data-driven decision
              </span>
              ?
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-base text-white font-sans leading-relaxed"
            >
              Join entrepreneurs, investors, and consultants who use BUSINESS.IN to evaluate
              business locations across Bengaluru. Start free — no credit card required.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <GlowButton variant="primary" size="lg" onClick={() => router.push("/register")}>
                Get Started Free
              </GlowButton>
              <GlowButton variant="gold" size="lg" onClick={() => setUpgradeOpen(true)}>
                Upgrade to Pro — ₹99
              </GlowButton>
            </div>
            <p
              className="mt-6 text-xs text-white font-mono font-medium"
            >
              Free: 10 saved scenarios &nbsp;·&nbsp; Pro: Unlimited exports, sharing & analytics
            </p>
          </div>
        </div>
      </div>

      <UpgradeModal isOpen={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </section>
  );
}
