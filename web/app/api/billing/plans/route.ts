import { NextResponse } from "next/server";

export async function GET() {
  const plans = [
    {
      code: "FREE",
      name: "Starter Free Tier",
      amountPaise: 0,
      features: [
        "10 Saved Scenarios in Bengaluru",
        "10,000 Monte Carlo Iterations per run",
        "Interactive OpenStreetMap Catchment Radii",
        "Standard P10/P50/P90 Revenue Distributions",
      ],
    },
    {
      code: "PRO",
      name: "Professional Lifetime License",
      amountPaise: 9900,
      features: [
        "Unlimited Saved Scenarios & Multi-Location Compare",
        "Complete PDF & CSV Investor Report Downloads",
        "Competitor Cannibalization & Traffic Variance Layers",
        "Real-Time Sensitivity & Unit Economics Projections",
        "Priority Customer Support & Model Updates",
      ],
    },
  ];

  return NextResponse.json({ plans });
}
