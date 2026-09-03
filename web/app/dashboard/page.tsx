import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth/dal";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { GlowButton } from "@/components/ui/GlowButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import SimulatorClient from "@/components/SimulatorClient";
import {
  FaChartLine,
  FaCompass,
  FaLock,
  FaUserCircle,
  FaBookOpen,
  FaQuestionCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Dashboard — BUSINESS.IN",
  description:
    "Simulate footfall, revenue, rent ratios, and Monte Carlo probability of viability across prime commercial corridors in Bengaluru for retail, cafes, and clinics.",
  alternates: {
    canonical: "/dashboard",
  },
  authors: [
    {
      name: "Pracheth Singh",
      url: "https://business.in",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/dashboard",
    siteName: "BUSINESS.IN",
    title: "Commercial Location Decision Simulator Studio — BUSINESS.IN",
    description:
      "Simulate footfall, revenue, rent ratios, and Monte Carlo probability of viability across prime commercial corridors in Bengaluru for retail, cafes, and clinics.",
    images: [
      {
        url: "https://business.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BUSINESS.IN Location Simulator Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Location Decision Simulator Studio — BUSINESS.IN",
    description:
      "Monte Carlo simulations, traffic intelligence, competitor analysis & financial projections for Bengaluru locations.",
    images: ["https://business.in/og-image.jpg"],
  },
};

export default async function DashboardPage() {
  let user = null;
  try {
    user = await requireUser();
  } catch (err) {
    console.warn("[dashboard] user session check failed:", err);
  }

  let projects: Array<{
    id: string;
    name: string;
    businessType: string;
    city: string;
    updatedAt: Date;
    _count?: { simulations: number };
  }> = [];
  if (user) {
    try {
      projects = await db.project.findMany({
        where: { ownerId: user.id },
        orderBy: { updatedAt: "desc" },
        include: { _count: { select: { simulations: true } } },
      });
    } catch {
      projects = [];
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://business.in/dashboard",
        url: "https://business.in/dashboard",
        name: "Commercial Location Decision Simulator Studio",
        description:
          "Simulate footfall, revenue, rent ratios, and Monte Carlo probability of viability across prime commercial corridors in Bengaluru.",
        inLanguage: "en-IN",
        datePublished: "2026-08-27T00:00:00+05:30",
        dateModified: "2026-08-30T22:15:00+05:30",
        author: {
          "@type": "Person",
          name: "Pracheth Singh",
          url: "https://business.in",
        },
        publisher: {
          "@type": "Organization",
          name: "BUSINESS.IN",
          url: "https://business.in",
          logo: {
            "@type": "ImageObject",
            url: "https://business.in/logo.png",
          },
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "BUSINESS.IN Location Simulator",
        operatingSystem: "Web Browser",
        applicationCategory: "BusinessApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does the Monte Carlo simulator calculate commercial viability?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The engine runs 10,000 stochastic draws sampling pedestrian footfall conversion rates (1.8% to 6.2%), average ticket sizes, and operating expenditure variance based on Bengaluru commercial corridor indices.",
            },
          },
          {
            "@type": "Question",
            name: "What Bengaluru corridors are currently modeled in the studio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The studio includes comprehensive real estate benchmarks for Indiranagar 100ft Rd, Koramangala 80ft Rd, HSR Layout Sector 1, Whitefield ITPL Main Rd, JP Nagar 24th Main, and MG Road Commercial Core.",
            },
          },
          {
            "@type": "Question",
            name: "Can I export investor-ready reports from the simulator?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can generate unforgeable public snapshot links, structured RFC-4180 CSV spreadsheets, and print-ready PDF executive summaries directly from the simulator.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between w-full">
      <Navbar />

      <main id="main-content" className="w-full px-3 sm:px-5 lg:px-6 py-2.5 space-y-3">
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        
        {!user && (
          <aside className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#00FF85]/15 via-[#38BDF8]/10 to-[#121212] border border-[#00FF85]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#00FF85]/20 text-[#00FF85] flex items-center justify-center flex-shrink-0 text-sm">
                <FaUserCircle />
              </div>
              <p className="text-white m-0 font-sans text-xs">
                Simulating in <strong>Autonomous Guest Studio Mode</strong>. Sign in to save scenarios.
              </p>
            </div>
            <Link href="/register" className="flex-shrink-0">
              <span className="text-xs font-mono text-[#00FF85] hover:underline cursor-pointer font-bold">
                Create Free Account →
              </span>
            </Link>
          </aside>
        )}

        
        <section aria-label="Interactive Location Simulator">
          <SimulatorClient />
        </section>

        
        <details className="glass rounded-2xl p-4 bg-[#121212] border border-white/15 space-y-4 group">
          <summary className="flex items-center justify-between cursor-pointer list-none select-none">
            <div className="flex items-center gap-2">
              <FaBookOpen className="text-[#00FF85]" />
              <h2 className="text-sm font-bold font-serif text-white m-0">
                Bengaluru Commercial Feasibility & Monte Carlo Methodology Guide
              </h2>
            </div>
            <span className="text-xs font-mono text-[#00FF85] group-open:rotate-180 transition-transform">▼</span>
          </summary>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white font-sans leading-relaxed pt-2 border-t border-white/10">
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-white font-serif flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-[#00FF85]" /> Corridor Real Estate Dynamics
              </h3>
              <p>
                Commercial rents across Bengaluru vary dramatically by micro-market and catchment density. Prime high-street corridors like Indiranagar 100ft Road and Koramangala 80ft Road command lease rates between ₹160 and ₹220 per sq. ft., whereas emerging tech corridors such as HSR Layout Sector 1 and Whitefield ITPL Main Road offer rent structures between ₹95 and ₹140 per sq. ft.
              </p>
              <p>
                Our model maps base rent curves against format square footage to dynamically establish the critical Rent-to-Revenue ceiling of 15%.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-white font-serif flex items-center gap-1.5">
                <FaChartLine className="text-[#38BDF8]" /> Stochastic Monte Carlo Modeling
              </h3>
              <p>
                Unlike static financial spreadsheets that assume constant footfall, our 10,000-draw Monte Carlo engine accounts for real-world volatility. It models pedestrian conversion rates as a log-normal distribution between 1.8% and 6.2%, and models ticket size variance under varying seasonal and competitor density scenarios.
              </p>
              <p>
                The resulting probability distribution yields precise P10 (worst-case), P50 (expected), and P90 (best-case) revenue projections.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-white font-serif flex items-center gap-1.5">
                <FaCompass className="text-[#FFA0A0]" /> Unit Economics & Payback Horizon
              </h3>
              <p>
                Each business format is calibrated with exact Cost of Goods Sold (COGS) ranges: Specialty Cafés (28%–32%), Fine Dining Restaurants (32%–38%), Retail & Apparel (40%–45%), and Clinics (18%–24%).
              </p>
              <p>
                Operating profit is derived after subtracting variable COGS, fixed commercial lease, staff payroll, utilities, and local municipal taxes, allowing entrepreneurs to compute the exact break-even payback horizon in months.
              </p>
            </div>
          </div>
        </details>

        
        <details className="glass rounded-2xl p-4 bg-[#121212] border border-white/10 space-y-4 group">
          <summary className="flex items-center justify-between cursor-pointer list-none select-none">
            <div className="flex items-center gap-2">
              <FaQuestionCircle className="text-[#00FF85]" />
              <h2 className="text-sm font-bold font-serif text-white m-0">Frequently Asked Questions</h2>
            </div>
            <span className="text-xs font-mono text-[#00FF85] group-open:rotate-180 transition-transform">▼</span>
          </summary>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans pt-2 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <h3 className="text-xs font-bold text-white">How is Viability calculated?</h3>
              <p className="text-white/80 leading-relaxed">
                The score represents the percentage of 10,000 Monte Carlo draws where monthly net operating profit is positive and the capital investment is recovered within 36 months.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <h3 className="text-xs font-bold text-white">Can I customize assumptions?</h3>
              <p className="text-white/80 leading-relaxed">
                Yes! You can adjust initial capital investment, average ticket size, daily operating hours, pedestrian density factor, and nearby competitor counts using the studio sliders.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <h3 className="text-xs font-bold text-white">How do I share simulation results?</h3>
              <p className="text-white/80 leading-relaxed">
                Click &quot;Share&quot; in the studio to generate a shareable URL, or click &quot;CSV&quot; and &quot;PDF&quot; to download structured financial spreadsheets.
              </p>
            </div>
          </div>
        </details>

        
        <section className="pt-4 border-t border-white/10" aria-label="Saved Projects">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold font-serif text-white">My Saved Projects</h2>
            <span className="text-xs font-mono text-white/70">{projects.length} Project(s)</span>
          </div>

          {user ? (
            projects.length === 0 ? (
              <Card style={{ padding: "32px", textAlign: "center", background: "rgba(22, 22, 22, 0.6)" }}>
                <p className="text-sm text-white m-0">
                  No saved project folders yet. You can create a project to group simulations across devices or run simulations directly above!
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p) => (
                  <Link key={p.id} href={`/projects/${p.id}`} className="text-decoration-none">
                    <div className="glass rounded-2xl p-5 hover:border-[#00FF85]/40 transition-all cursor-pointer">
                      <h3 className="text-lg font-bold font-serif m-0 text-white">{p.name}</h3>
                      <p className="text-xs text-white mt-1 mb-3 font-mono">
                        {p.businessType} · {p.city}
                      </p>
                      <div className="text-[11px] font-mono text-[#00FF85]">
                        {p._count?.simulations ?? 0} saved scenario(s)
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <Card style={{ padding: "32px", textAlign: "center", background: "rgba(22, 22, 22, 0.6)" }}>
              <div className="w-10 h-10 rounded-2xl bg-white/5 text-white flex items-center justify-center mx-auto mb-3">
                <FaLock />
              </div>
              <h3 className="text-base font-bold font-serif text-white m-0">Sign in to Save Projects</h3>
              <p className="text-xs text-white mt-1 mb-4 max-w-sm mx-auto font-sans leading-relaxed">
                Create custom project folders to organize your commercial location simulations, export investor reports, and compare multiple spots.
              </p>
              <div className="flex justify-center gap-3">
                <Link href="/login?next=/dashboard">
                  <button className="px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 min-h-[38px]">
                    Sign In
                  </button>
                </Link>
                <Link href="/register">
                  <GlowButton variant="primary" size="sm">
                    Create Account
                  </GlowButton>
                </Link>
              </div>
            </Card>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
