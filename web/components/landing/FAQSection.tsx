"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does the Monte Carlo location simulation work?",
    answer:
      "Our decision engine runs 10,000 stochastic simulations per second, modeling variations in pedestrian footfall, seasonal conversion rates, average customer spend, competitor cannibalization, and Bengaluru-specific rent indices to calculate an empirical probability of business viability.",
  },
  {
    question: "Which commercial corridors in Bengaluru are supported?",
    answer:
      "We currently provide real-time economic data and catchment models for key commercial corridors including Indiranagar (100ft Rd), Koramangala (80ft Rd), HSR Layout (Sector 1 & 27th Main), Whitefield (ITPL Main Rd), JP Nagar, MG Road, and Peenya Industrial/Commercial areas.",
  },
  {
    question: "What financial metrics are calculated in the simulation?",
    answer:
      "Every run computes estimated gross monthly revenue, fixed overheads (commercial rent index, staffing, utilities), Cost of Goods Sold (COGS), net monthly profit/loss, and expected break-even payback horizon in months across P10 (Worst), P50 (Expected), and P90 (Best) percentiles.",
  },
  {
    question: "Can I export investor reports for partners and banks?",
    answer:
      "Yes. You can export complete simulation datasets as structured CSV spreadsheets or generate formatted PDF investor reports directly from the simulator with full assumption parameters and risk indicators.",
  },
  {
    question: "Is there a free tier available?",
    answer:
      "Yes. The core Location Simulator Studio is 100% free to run live simulations in your browser. Creating an account allows you to save scenarios, and Pro plans unlock unlimited scenario storage and advanced exports.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 relative z-10" id="faq">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#00FF85] font-mono inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00FF85]/20 border border-[#00FF85]/50"
          >
            <FaQuestionCircle /> Frequently Asked Questions
          </span>
          <h2
            className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Everything you need to know about{" "}
            <span className="gradient-text-blue">
              BUSINESS.IN
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white max-w-2xl mx-auto font-sans font-normal leading-relaxed">
            Common questions regarding our Bengaluru location intelligence, Monte Carlo methodology, and report generation.
          </p>
        </div>

        
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass rounded-2xl border border-white/20 bg-[#121212] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-white hover:text-[#00FF85] transition-colors focus:outline-none min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-sm text-white">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-white font-normal leading-relaxed border-t border-white/15 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
