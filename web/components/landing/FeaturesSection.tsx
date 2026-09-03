"use client";

import { FeatureCard } from "@/components/ui/FeatureCard";
import {
  FaChartLine,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaBuilding,
  FaCalculator,
  FaFileAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine size={20} style={{ color: "#00FF85" }} />,
    title: "Monte Carlo Simulation",
    description:
      "Run 10,000+ iterations to model demand uncertainty, traffic variance, and break-even probability for any Bengaluru location.",
    gradient: "#00FF85",
  },
  {
    icon: <FaMapMarkedAlt size={20} style={{ color: "#38BDF8" }} />,
    title: "Interactive 3D Map",
    description:
      "Drag pins, set catchment radii, and visualize competitor density on an OpenStreetMap with custom layers.",
    gradient: "#38BDF8",
  },
  {
    icon: <FaCalculator size={20} style={{ color: "#FFD700" }} />,
    title: "Financial Modelling",
    description:
      "Best-case, expected, and worst-case scenarios with revenue, costs, ROI, and break-even month calculated automatically.",
    gradient: "#FFD700",
  },
  {
    icon: <FaShieldAlt size={20} style={{ color: "#FFA0A0" }} />,
    title: "Risk Analysis",
    description:
      "Sensitivity charts show which assumptions most influence your success probability. Know your risks before you invest.",
    gradient: "#FFA0A0",
  },
  {
    icon: <FaBuilding size={20} style={{ color: "#00FF85" }} />,
    title: "Land Feasibility",
    description:
      "Zoning compliance, rent-to-revenue ratio, and land-availability grading — all modelled estimates with confidence scores.",
    gradient: "#00FF85",
  },
  {
    icon: <FaFileAlt size={20} style={{ color: "#38BDF8" }} />,
    title: "Investor Reports",
    description:
      "Generate PDF and CSV reports with shareable read-only links. Exportable for investors, partners, and stakeholders.",
    gradient: "#38BDF8",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12" id="features">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-10 sm:mb-12">
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#00FF85] font-mono px-3 py-1 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30 inline-block"
          >
            Features
          </span>
          <h2
            className="mt-5 text-white font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Everything you need to{" "}
            <span className="gradient-text-cyan">
              decide wisely
            </span>
          </h2>
          <p
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-sans leading-relaxed"
          >
            From traffic intelligence to financial projections — a complete decision
            engine for business location strategy.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
