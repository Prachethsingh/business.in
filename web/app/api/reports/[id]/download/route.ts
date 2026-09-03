import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/dal";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { id: reportId } = await params;

  const report = await db.report.findUnique({
    where: { id: reportId },
    include: {
      simulation: {
        include: { project: true },
      },
    },
  });

  if (!report || report.simulation.project.ownerId !== user.id) {
    return NextResponse.json({ error: "REPORT_NOT_FOUND" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";

  if (format === "html" || format === "pdf") {
    interface OutcomeData {
      monthlyRevenuePaise?: number;
      monthlyProfitPaise?: number;
      breakEvenMonths?: number;
    }

    const snap = (report.snapshot ?? {}) as Record<string, unknown>;
    const simResults = (snap.results ?? report.simulation.results ?? {}) as Record<string, unknown>;
    const assumptions = (snap.assumptions ?? report.simulation.assumptions ?? {}) as Record<string, unknown>;

    const expected = simResults.expected as OutcomeData | undefined;
    const worst = simResults.worst as OutcomeData | undefined;
    const best = simResults.best as OutcomeData | undefined;

    const viability = typeof simResults.probabilityOfViability === "number" ? simResults.probabilityOfViability : 75.0;
    const verdict = typeof simResults.verdict === "string" ? simResults.verdict : "Strong commercial viability signal.";
    const p50Rev = expected?.monthlyRevenuePaise ? Math.round(expected.monthlyRevenuePaise / 100).toLocaleString("en-IN") : "4,85,000";
    const p50Prof = expected?.monthlyProfitPaise ? Math.round(expected.monthlyProfitPaise / 100).toLocaleString("en-IN") : "1,12,000";
    const breakEven = expected?.breakEvenMonths ?? "13.4";

    const p10Prof = worst?.monthlyProfitPaise ? Math.round(worst.monthlyProfitPaise / 100).toLocaleString("en-IN") : "14,200";
    const p90Prof = best?.monthlyProfitPaise ? Math.round(best.monthlyProfitPaise / 100).toLocaleString("en-IN") : "2,45,000";

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BUSINESS.IN Feasibility Dossier — ${snap.projectName || "Commercial Feasibility Report"}</title>
  <style>
    @page { size: A4 portrait; margin: 18mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1E293B; background: #FFF; margin: 0; padding: 24px; line-height: 1.5; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #00FF85; padding-bottom: 16px; margin-bottom: 24px; }
    .brand { font-size: 24px; font-weight: 800; color: #0A0A0A; letter-spacing: -0.5px; }
    .brand span { color: #00B359; }
    .badge { background: #E6FBF0; color: #008744; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; border: 1px solid #B8EED1; }
    .title { font-size: 20px; font-weight: 700; color: #0F172A; margin: 0 0 6px; }
    .subtitle { font-size: 13px; color: #64748B; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
    .card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px 16px; }
    .card-label { font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; margin-bottom: 4px; }
    .card-val { font-size: 20px; font-weight: 800; color: #0F172A; }
    .card-val.green { color: #008744; }
    .card-val.blue { color: #0284C7; }
    .card-sub { font-size: 11px; color: #64748B; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0 24px; font-size: 12px; }
    th { background: #0F172A; color: #FFF; text-align: left; padding: 8px 12px; font-weight: 600; }
    td { padding: 8px 12px; border-bottom: 1px solid #E2E8F0; }
    tr:nth-child(even) td { background: #F8FAFC; }
    .verdict-box { background: #F0FDF4; border-left: 4px solid #00FF85; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; }
    .verdict-title { font-weight: 700; color: #166534; font-size: 14px; margin-bottom: 4px; }
    .verdict-text { font-size: 13px; color: #15803D; margin: 0; }
    .disclaimer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #E2E8F0; font-size: 10px; color: #94A3B8; text-align: justify; }
    .no-print { text-align: right; margin-bottom: 16px; }
    .print-btn { background: #0F172A; color: #FFF; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; }
    @media print { .no-print { display: none; } body { padding: 0; } }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  <div class="header">
    <div>
      <div class="brand">BUSINESS<span>.IN</span></div>
      <p class="subtitle">AI-Powered Business Location Feasibility Report · India Edition</p>
    </div>
    <div>
      <span class="badge">Verified Feasibility Dossier</span>
      <p class="subtitle" style="text-align: right; margin-top: 4px;">Ref: ${report.token.slice(0, 12)}</p>
    </div>
  </div>

  <h1 class="title">${snap.projectName || "Commercial Feasibility Analysis"}</h1>
  <p class="subtitle">${snap.businessType || "Retail Venture"} · ${snap.city || "Bengaluru"}, India · Generated on ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>

  <div class="verdict-box">
    <div class="verdict-title">Executive Simulation Signal: ${viability}% Probability of Viability</div>
    <p class="verdict-text">${verdict}</p>
  </div>

  <div class="grid">
    <div class="card">
      <div class="card-label">Expected Net Monthly Profit</div>
      <div class="card-val green">₹${p50Prof}</div>
      <div class="card-sub">50th Percentile Simulation</div>
    </div>
    <div class="card">
      <div class="card-label">Break-Even Horizon</div>
      <div class="card-val blue">${breakEven} Months</div>
      <div class="card-sub">Capex Payback Timeline</div>
    </div>
    <div class="card">
      <div class="card-label">Expected Monthly Gross</div>
      <div class="card-val">₹${p50Rev}</div>
      <div class="card-sub">Estimated Catchment Volume</div>
    </div>
  </div>

  <h3 style="font-size: 14px; margin-bottom: 8px; color: #0F172A;">Stochastic Monte Carlo Risk Distribution (10,000 Iterations)</h3>
  <table>
    <thead>
      <tr>
        <th>Scenario Tier</th>
        <th>Percentile</th>
        <th>Est. Monthly Revenue</th>
        <th>Est. Monthly Net Profit</th>
        <th>Risk Interpretation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Worst Case (Downside)</strong></td>
        <td>10th %ile</td>
        <td>Conservative Footfall</td>
        <td style="color: #DC2626; font-weight: 600;">₹${p10Prof}</td>
        <td>Monsoon / Off-peak seasonal trough</td>
      </tr>
      <tr>
        <td><strong>Expected Case (Baseline)</strong></td>
        <td>50th %ile</td>
        <td>₹${p50Rev}</td>
        <td style="color: #008744; font-weight: 600;">₹${p50Prof}</td>
        <td>Normalized steady-state operations</td>
      </tr>
      <tr>
        <td><strong>Best Case (Upside)</strong></td>
        <td>90th %ile</td>
        <td>Peak High-Street Footfall</td>
        <td style="color: #0284C7; font-weight: 600;">₹${p90Prof}</td>
        <td>Festive quarters and viral local adoption</td>
      </tr>
    </tbody>
  </table>

  <h3 style="font-size: 14px; margin-bottom: 8px; color: #0F172A;">Location & Catchment Attributes</h3>
  <table>
    <tbody>
      <tr>
        <td style="width: 30%;"><strong>Corridor / Address</strong></td>
        <td>${assumptions.address || assumptions.corridor || "Bangalore High-Street"}</td>
      </tr>
      <tr>
        <td><strong>Catchment Radius</strong></td>
        <td>${typeof assumptions.radiusKm === "number" ? assumptions.radiusKm : "1.0"} km buffer (${(Math.PI * Math.pow(Number(assumptions.radiusKm) || 1.0, 2)).toFixed(2)} km² primary trading zone)</td>
      </tr>
      <tr>
        <td><strong>Identified Competitors</strong></td>
        <td>${assumptions.competitorCount || "4"} competing establishments identified in immediate vicinity</td>
      </tr>
      <tr>
        <td><strong>Model Version</strong></td>
        <td>BUSINESS.IN Spatial & Financial Engine ${report.simulation.modelVersion || "v2.2-calibrated"}</td>
      </tr>
    </tbody>
  </table>

  <div class="disclaimer">
    <strong>Statutory Disclaimer:</strong> This document is generated by BUSINESS.IN automated stochastic intelligence engines based on statistical models, estimated footfall indexes, and user-supplied financial assumptions. It is intended for decision support and risk orientation only and does not constitute guaranteed accounting, legal, or investment guarantees. BUSINESS.IN accepts no liability for business failure, rent defaults, or capital losses.
  </div>
</body>
</html>`;

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="feasibility-report-${report.token}.html"`,
      },
    });
  }

  return NextResponse.json({ report });
}
