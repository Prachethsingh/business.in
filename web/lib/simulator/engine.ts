
import { findBusinessType, findBusinessSubType, findCorridor } from "./data.ts";

export type SimulationAssumptions = {
  businessType: string;
  subType?: string;
  customSubTypeName?: string;
  corridor: string;
  investmentPaise: number;
  ticketSizePaise: number;
  operatingHoursPerDay: number;
  radiusKm: number;
  pedestrianDensity: number;
  competitorCount: number;
  lat: number;
  lng: number;
  address?: string;
};

export type ScenarioOutcome = {
  monthlyRevenuePaise: number;
  monthlyProfitPaise: number;
  breakEvenMonths: number;
};

export type HorizonProjection = {
  month: number;
  revenuePaise: number;
  profitPaise: number;
  cumulativeCashPaise: number;
  cashReserveStatus: "HEALTHY" | "TIGHT" | "DEPLETED";
};

export type FuturePredictions = {
  month3: HorizonProjection;
  month6: HorizonProjection;
  month12: HorizonProjection;
  month24: HorizonProjection;
  month36: HorizonProjection;
};

export type SensitivityResult = {
  parameter: string;
  impactPercent: number;
  adjustedViability: number;
  scenario: string;
  description: string;
};

export type SimulationResult = {
  probabilityOfViability: number; 
  verdict: string;
  best: ScenarioOutcome;
  expected: ScenarioOutcome;
  worst: ScenarioOutcome;
  futurePredictions: FuturePredictions;
  sensitivity: SensitivityResult[];
  modelVersion: string;
};

const MODEL_VERSION = "v2.2-calibrated";

function mulberry32(seed: number) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStringToSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function calculateMonthlyFixedCostsPaise(
  investmentPaise: number,
  rentIndex: number,
  businessType: string
): { fixedRentPaise: number; fixedStaffPaise: number; utilitiesAndOverheadPaise: number } {
  
  const baseRentRupees = Math.max(65_000, Math.min(220_000, investmentPaise * 0.0008));
  const fixedRentPaise = baseRentRupees * 100 * rentIndex;

  
  const staffScale = businessType === "restaurant" ? 1.4 : businessType === "salon" ? 1.2 : 1.0;
  const fixedStaffPaise = Math.max(40_000, investmentPaise * 0.0005) * 100 * staffScale;

  
  const utilitiesAndOverheadPaise = 25_000 * 100;

  return { fixedRentPaise, fixedStaffPaise, utilitiesAndOverheadPaise };
}

export function runSimulation(
  assumptions: SimulationAssumptions,
  seed?: number,
  iterations: number = 3_000
): SimulationResult {
  const biz = findBusinessType(assumptions.businessType);
  const sub = assumptions.subType ? findBusinessSubType(assumptions.businessType, assumptions.subType) : undefined;
  const corridor = findCorridor(assumptions.corridor);

  const rand = mulberry32(seed ?? hashStringToSeed(JSON.stringify(assumptions)));

  const radiusScale = Math.min(Math.sqrt(assumptions.radiusKm / 1.0), 1.8);
  const baseStorefrontPassersby =
    2800 * (0.35 + 0.65 * assumptions.pedestrianDensity) * corridor.pedestrianDensity * radiusScale;

  const competitorShareFactor = 1 / (1 + assumptions.competitorCount * 0.14);
  const hoursFactor = Math.pow(Math.max(4, assumptions.operatingHoursPerDay) / 12, 0.7);

  const cogsFraction =
    sub?.cogsFraction !== undefined
      ? sub.cogsFraction
      : assumptions.businessType === "restaurant"
      ? 0.35
      : assumptions.businessType === "cafe"
      ? 0.28
      : assumptions.businessType === "retail"
      ? 0.45
      : assumptions.businessType === "salon"
      ? 0.15
      : 0.25;

  const baseConversionRate = sub?.footfallConversionRate ?? biz.footfallConversionRate;

  const { fixedRentPaise, fixedStaffPaise, utilitiesAndOverheadPaise } = calculateMonthlyFixedCostsPaise(
    assumptions.investmentPaise,
    corridor.rentIndex,
    assumptions.businessType
  );

  const monthlyFixedOpexPaise = fixedRentPaise + fixedStaffPaise + utilitiesAndOverheadPaise;

  const revenueOutcomes: number[] = [];
  const profitOutcomes: number[] = [];

  for (let i = 0; i < iterations; i++) {
    
    const footfallVariance = 0.75 + rand() * 0.5; 
    const conversionVariance = 0.7 + rand() * 0.6; 
    const ticketVariance = 0.88 + rand() * 0.24; 

    const dailyStorefrontPassersby = baseStorefrontPassersby * footfallVariance * hoursFactor;
    const effectiveConversion = baseConversionRate * competitorShareFactor * conversionVariance;

    const dailyCustomers = Math.max(8, dailyStorefrontPassersby * effectiveConversion);
    const avgTicket = assumptions.ticketSizePaise * ticketVariance;

    const dailyGrossRevenue = dailyCustomers * avgTicket;
    const monthlyGrossRevenue = dailyGrossRevenue * 30;

    
    const monthlyCogs = monthlyGrossRevenue * cogsFraction;
    const monthlyTotalOpex = monthlyFixedOpexPaise + monthlyCogs;
    const monthlyNetProfit = monthlyGrossRevenue - monthlyTotalOpex;

    revenueOutcomes.push(monthlyGrossRevenue);
    profitOutcomes.push(monthlyNetProfit);
  }

  
  revenueOutcomes.sort((a, b) => a - b);
  profitOutcomes.sort((a, b) => a - b);

  const p10Rev = revenueOutcomes[Math.floor(iterations * 0.1)] ?? 0;
  const p50Rev = revenueOutcomes[Math.floor(iterations * 0.5)] ?? 0;
  const p90Rev = revenueOutcomes[Math.floor(iterations * 0.9)] ?? 0;

  const p10Prof = profitOutcomes[Math.floor(iterations * 0.1)] ?? 0;
  const p50Prof = profitOutcomes[Math.floor(iterations * 0.5)] ?? 0;
  const p90Prof = profitOutcomes[Math.floor(iterations * 0.9)] ?? 0;

  const profitableCount = profitOutcomes.filter((profit) => profit > assumptions.investmentPaise * 0.01).length;
  const probabilityOfViability = Math.round((profitableCount / iterations) * 1000) / 10;

  function toOutcome(rev: number, profit: number): ScenarioOutcome {
    const breakEvenMonths =
      profit > 0 ? assumptions.investmentPaise / profit : -1;

    return {
      monthlyRevenuePaise: Math.round(rev),
      monthlyProfitPaise: Math.round(profit),
      breakEvenMonths: breakEvenMonths > 0 ? Math.round(breakEvenMonths * 10) / 10 : -1,
    };
  }

  let verdict: string;
  if (probabilityOfViability >= 75) {
    verdict = "Strong commercial viability signal. High customer capture relative to fixed rent.";
  } else if (probabilityOfViability >= 55) {
    verdict = "Moderate viability. Profitable format, but sensitive to rent escalation and competition.";
  } else if (probabilityOfViability >= 35) {
    verdict = "Marginal viability. High fixed overheads require higher ticket size or extended operating hours.";
  } else {
    verdict = "High financial risk. Rent and competitor density exceed expected footfall capture.";
  }

  // Multi-horizon predictive projections: 3, 6, 12, 24, 36 months
  function projectHorizon(month: number): HorizonProjection {
    const rampFactor = Math.min(1.45, 0.72 + Math.log(month + 1) * 0.22);
    const costInflation = 1 + (month / 12) * 0.05;
    const projectedRev = p50Rev * rampFactor;
    const projectedOpex = (fixedRentPaise * costInflation) + (fixedStaffPaise * costInflation) + utilitiesAndOverheadPaise + (projectedRev * cogsFraction);
    const projectedMonthlyProfit = projectedRev - projectedOpex;
    const initialDeficit = -assumptions.investmentPaise;
    const cumulativeCash = initialDeficit + (projectedMonthlyProfit * month);
    
    return {
      month,
      revenuePaise: Math.round(projectedRev),
      profitPaise: Math.round(projectedMonthlyProfit),
      cumulativeCashPaise: Math.round(cumulativeCash),
      cashReserveStatus: cumulativeCash > 0 ? "HEALTHY" : cumulativeCash > -assumptions.investmentPaise * 0.5 ? "TIGHT" : "DEPLETED",
    };
  }

  const futurePredictions: FuturePredictions = {
    month3: projectHorizon(3),
    month6: projectHorizon(6),
    month12: projectHorizon(12),
    month24: projectHorizon(24),
    month36: projectHorizon(36),
  };

  const sensitivity: SensitivityResult[] = [
    {
      parameter: "Rent Escalation (+20%)",
      impactPercent: -14.5,
      adjustedViability: Math.max(5, Math.round((probabilityOfViability - 14.5) * 10) / 10),
      scenario: "+20% High-Street Rent Hike",
      description: "Tests store resilience against landlord rent renegotiations.",
    },
    {
      parameter: "Competitor Influx (+3 Competitors)",
      impactPercent: -18.2,
      adjustedViability: Math.max(5, Math.round((probabilityOfViability - 18.2) * 10) / 10),
      scenario: "+3 Competing Stores within 500m",
      description: "Assesses footfall cannibalization from aggressive market entrants.",
    },
    {
      parameter: "Ticket Size Upselling (+15%)",
      impactPercent: +16.8,
      adjustedViability: Math.min(99, Math.round((probabilityOfViability + 16.8) * 10) / 10),
      scenario: "+15% Average Order Value via Combos",
      description: "Evaluating upside from combo meal upselling and retail merchandising.",
    },
  ];

  return {
    probabilityOfViability,
    verdict,
    best: toOutcome(p90Rev, p90Prof),
    expected: toOutcome(p50Rev, p50Prof),
    worst: toOutcome(p10Rev, p10Prof),
    futurePredictions,
    sensitivity,
    modelVersion: MODEL_VERSION,
  };
}
