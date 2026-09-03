import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" id="main-content" style={{ background: "#0A0A0A" }}>
      <Navbar />
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,255,133,0.3) 1px, transparent 1px)`,
            backgroundSize: "46px 46px",
          }}
        />
        
        <div className="aurora-blob aurora-blob-1" aria-hidden="true" />
        <div className="aurora-blob aurora-blob-2" aria-hidden="true" />
        <div className="aurora-blob aurora-blob-3" aria-hidden="true" />
        <div className="aurora-blob aurora-blob-4" aria-hidden="true" />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <FAQSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
