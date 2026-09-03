import type { Metadata, Viewport } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import SkipLink from "@/components/layout/SkipLink";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00FF85",
};

export const metadata: Metadata = {
  title: "BUSINESS.IN — Business Location Decision Simulator | Bengaluru Commercial Intelligence",
  description:
    "AI & Monte Carlo business location decision simulator for Bengaluru. Evaluate commercial footfall, competitor cannibalization, financial viability & break-even horizons.",
  keywords: [
    "business",
    "business in",
    "business in bangalore",
    "business in india",
    "start a business",
    "business location simulator",
    "commercial location intelligence",
    "bengaluru commercial real estate",
    "monte carlo simulation business",
    "business feasibility study",
    "retail location analysis",
    "cafe feasibility bangalore",
    "indiranagar commercial space",
    "koramangala business location",
    "hsr layout retail",
    "whitefield business space",
    "commercial rent bangalore",
    "footfall analysis bangalore",
    "business viability calculator",
  ],
  authors: [
    {
      name: "BUSINESS.IN Location Intelligence Research Team",
      url: "https://business-in.onrender.com",
    },
  ],
  creator: "BUSINESS.IN Location Intelligence Research Team",
  publisher: "BUSINESS.IN",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://business-in.onrender.com"),
  alternates: {
    canonical: "https://business-in.onrender.com",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "publish-date": "2026-08-30",
    "article:published_time": "2026-08-30T00:00:00+05:30",
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
    "geo.position": "12.9716;77.5946",
    "ICBM": "12.9716, 77.5946",
    "target": "all",
    "coverage": "Bengaluru, Karnataka, India",
    "audience": "business founders, entrepreneurs, retail chains, commercial developers",
    "rating": "General",
    "revisit-after": "1 days",
    "language": "English",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://business-in.onrender.com",
    siteName: "BUSINESS.IN",
    title: "BUSINESS.IN — Business Location Decision Simulator",
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
    title: "BUSINESS.IN — Business Location Decision Simulator",
    description:
      "Monte Carlo simulations, traffic intelligence, competitor analysis & financial projections for Bengaluru locations.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "google9eab329ee90bde56",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "BUSINESS.IN",
      alternateName: ["Business.in", "BUSINESS IN", "Business In Bengaluru"],
      description:
        "AI-powered Monte Carlo business location decision simulator and commercial real estate feasibility platform for Bengaluru.",
      url: "https://business-in.onrender.com",
      author: {
        "@type": "Organization",
        name: "BUSINESS.IN",
        url: "https://business-in.onrender.com",
        logo: "https://business-in.onrender.com/logo.webp",
      },
      publisher: {
        "@type": "Organization",
        name: "BUSINESS.IN",
        url: "https://business-in.onrender.com",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://business-in.onrender.com/dashboard?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      datePublished: "2026-08-30",
      dateModified: "2026-09-04",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "BUSINESS.IN Location Decision Simulator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://business-in.onrender.com/dashboard",
      offers: {
        "@type": "Offer",
        price: "99",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "128",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "BUSINESS.IN",
      url: "https://business-in.onrender.com",
      logo: "https://business-in.onrender.com/logo.webp",
      sameAs: [
        "https://github.com/Prachethsingh/business.in",
      ],
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="min-h-screen bg-[#0A0A0A] text-[#F8FAFC] antialiased" suppressHydrationWarning>
        <SkipLink />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}