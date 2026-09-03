"use client";

import { HeroScene } from "@/components/3d/HeroScene";
import { StarsCanvas } from "@/components/3d/Stars";
import { GlowButton } from "@/components/ui/GlowButton";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <HeroScene />
        <StarsCanvas count={500} color="#1E90FF" speed={0.4} />
      </div>

      
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.95) 100%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pt-24">

        
        <h1
          className="mb-6 leading-tight text-white font-serif text-[clamp(36px,7vw,80px)] font-bold tracking-tight"
        >
          Should You Open a{" "}
          <span className="gradient-text">
            Business
          </span>
          <br />
          Here?
        </h1>

        
        <p
          className="mb-10 max-w-2xl leading-relaxed text-base sm:text-xl text-[#F1F5F9] font-sans"
        >
          Monte Carlo simulations, traffic intelligence, competitor analysis & financial
          projections — all in one interactive 3D platform. Built for Bengaluru.
        </p>

        
        <div className="flex flex-wrap gap-4 justify-center">
          <GlowButton
            variant="primary"
            size="lg"
            onClick={() => router.push("/register")}
          >
            Create Free Account
          </GlowButton>
          <GlowButton variant="ghost" size="lg" onClick={() => router.push("/login")}>
            Sign In
          </GlowButton>
        </div>

        
        <div
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12 text-center text-white font-sans text-sm"
        >
          {[
            { value: "10K+", label: "Monte Carlo Iterations" },
            { value: "7", label: "Analysis Segments" },
            { value: "₹99", label: "Pro Plan" },
            { value: "36 mo", label: "Prediction Horizon" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className="font-bold font-mono text-2xl text-white"
              >
                {stat.value}
              </span>
              <span className="text-[#E2E8F0] font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5"
        >
          <div
            className="w-1.5 h-1.5 rounded-full bg-[#00FF85] animate-bounce"
          />
        </div>
      </div>
    </section>
  );
}
