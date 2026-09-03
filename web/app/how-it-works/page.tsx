import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { CTASection } from "@/components/landing/CTASection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — BUSINESS.IN Location Feasibility Platform",
  description: "Learn how the 10,000-draw Monte Carlo decision engine evaluates footfall, rent, and competitor cannibalization for Bengaluru locations.",
  alternates: {
    canonical: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />
      <main className="py-12 space-y-12">
        <HowItWorksSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
