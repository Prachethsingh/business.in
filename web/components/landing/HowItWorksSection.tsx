"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Choose Business Type",
    description:
      "Select from cafes, retail stores, clinics, gyms, restaurants, warehouses, and more.",
    icon: "🏢",
  },
  {
    step: "02",
    title: "Pick a Location",
    description:
      "Search any address in Bengaluru or drag a pin on the interactive 3D map.",
    icon: "📍",
  },
  {
    step: "03",
    title: "Set Your Assumptions",
    description:
      "Enter investment, rent, pricing, staffing, and operating hours. Adjust sliders in real time.",
    icon: "⚙️",
  },
  {
    step: "04",
    title: "Run the Simulation",
    description:
      "Monte Carlo engine runs 10,000 iterations across best/expected/worst scenarios.",
    icon: "🎲",
  },
  {
    step: "05",
    title: "Get Your Report",
    description:
      "View probability of success, break-even timeline, risk factors, and export to PDF.",
    icon: "📊",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12" id="how-it-works" style={{ background: "rgba(18,18,18,0.75)" }}>
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#00FF85] font-mono px-3.5 py-1.5 rounded-full bg-[#00FF85]/15 border border-[#00FF85]/40 inline-block"
          >
            How It Works
          </span>
          <h2
            className="mt-6 text-white"
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            From idea to insight in{" "}
            <span className="gradient-text-blue">
              5 steps
            </span>
          </h2>
        </div>

        
        <div className="relative">
          
          <div
            className="absolute left-8 top-0 bottom-0 w-px"
            style={{ background: "rgba(255,255,255,0.15)" }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative flex gap-6 items-start"
              >
                
                <div
                  className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: "rgba(0, 255, 133, 0.15)",
                    border: "1px solid rgba(0, 255, 133, 0.4)",
                  }}
                >
                  {step.icon}
                </div>

                
                <div className="pt-4 flex-1">
                  <span
                    className="text-xs font-mono uppercase tracking-widest font-bold text-[#00FF85]"
                  >
                    Step {step.step}
                  </span>
                  <h3
                    className="mt-1 text-xl font-bold font-serif text-white"
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-sans text-white leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
