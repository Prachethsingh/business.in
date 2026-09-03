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
  title: "BUSINESS.IN — Bengaluru Commercial Location Simulator",
  description:
    "Monte Carlo location intelligence for Bengaluru businesses: footfall, feasibility, and probability of viability.",
  authors: [
    {
      name: "BUSINESS.IN Location Intelligence Research Team",
      url: "https://business-in.onrender.com",
    },
  ],
  creator: "BUSINESS.IN Location Intelligence Research Team",
  publisher: "BUSINESS.IN",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://business-in.onrender.com"),
  other: {
    "publish-date": "2026-08-30",
    "article:published_time": "2026-08-30T00:00:00+05:30",
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
    title: "BUSINESS.IN — AI Business Location Decision Simulator",
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
    title: "BUSINESS.IN — AI Business Location Decision Simulator",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BUSINESS.IN",
    description: "AI-powered business location decision simulator for Bengaluru",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://business-in.onrender.com",
    author: {
      "@type": "Organization",
      name: "BUSINESS.IN Location Intelligence Research Team",
      url: "https://business-in.onrender.com",
      logo: "https://business-in.onrender.com/logo.png",
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
    dateModified: "2026-08-30",
  };

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}