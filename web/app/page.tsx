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
  title: "BUSINESS.IN — Bengaluru Commercial Location Simulator",
  description:
    "Evaluate business locations in Bengaluru with Monte Carlo simulations, traffic intelligence, competitor analysis, and financial projections.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/` : "https://business-in.onrender.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://business-in.onrender.com",
    siteName: "BUSINESS.IN",
    title: "BUSINESS.IN — Bengaluru Commercial Location Simulator",
    description:
      "Evaluate business locations in Bengaluru with Monte Carlo simulations, traffic intelligence, competitor analysis, and financial projections.",
    images: [
      {
        url: "https://business-in.onrender.com/og-image.png",
        secureUrl: "https://business-in.onrender.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "BUSINESS.IN Logo",
        type: "image/png",
      },
      {
        url: "https://business-in.onrender.com/logo-preview.png",
        secureUrl: "https://business-in.onrender.com/logo-preview.png",
        width: 512,
        height: 512,
        alt: "BUSINESS.IN Circular Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BUSINESS.IN — Bengaluru Commercial Location Simulator",
    description:
      "Evaluate business locations in Bengaluru with Monte Carlo simulations, traffic intelligence, competitor analysis, and financial projections.",
    images: ["/og-image.png"],
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
