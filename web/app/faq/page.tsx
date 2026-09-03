import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — BUSINESS.IN",
  description: "Common questions regarding our Bengaluru location intelligence, Monte Carlo methodology, and report generation.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between">
      <Navbar />
      <main className="py-12 space-y-12">
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
