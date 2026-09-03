import BillingPage from "@/app/billing/page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — BUSINESS.IN Commercial Feasibility SaaS",
  description: "Start free with 10 saved scenarios or upgrade to Pro Lifetime for ₹99.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return <BillingPage />;
}
