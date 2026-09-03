import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CTASection } from "@/components/landing/CTASection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — BUSINESS.IN Commercial Location Intelligence",
  description: "Explore the 7 analytical location intelligence features of BUSINESS.IN for Bengaluru commercial real estate.",
  alternates: {
    canonical: "/features",
  },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />
      <main className="py-12">
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
