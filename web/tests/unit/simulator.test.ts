import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { runSimulation, type SimulationAssumptions } from "../../lib/simulator/engine.ts";

describe("Monte Carlo Simulator Engine Tests", () => {
  const sampleAssumptions: SimulationAssumptions = {
    businessType: "cafe",
    corridor: "indiranagar",
    investmentPaise: 15_00_000 * 100, // ₹15,00,000 in paise
    ticketSizePaise: 250 * 100,       // ₹250 in paise
    operatingHoursPerDay: 12,
    radiusKm: 1.0,
    pedestrianDensity: 0.75,
    competitorCount: 4,
    lat: 12.9784,
    lng: 77.6408,
    address: "100ft Road, Indiranagar, Bengaluru",
  };

  it("should run 10,000 iterations and return valid probability and percentiles", () => {
    const result = runSimulation(sampleAssumptions, 42);

    assert.ok(typeof result.probabilityOfViability === "number");
    assert.ok(result.probabilityOfViability >= 0 && result.probabilityOfViability <= 100);
    assert.ok(result.verdict.length > 0);

    // Verify percentiles logic: worst <= expected <= best
    assert.ok(result.worst.monthlyRevenuePaise <= result.expected.monthlyRevenuePaise);
    assert.ok(result.expected.monthlyRevenuePaise <= result.best.monthlyRevenuePaise);

    assert.ok(result.worst.monthlyProfitPaise <= result.expected.monthlyProfitPaise);
    assert.ok(result.expected.monthlyProfitPaise <= result.best.monthlyProfitPaise);
  });

  it("should generate multi-year predictive horizon projections", () => {
    const result = runSimulation(sampleAssumptions, 42);

    assert.ok(result.futurePredictions);
    assert.equal(result.futurePredictions.month3.month, 3);
    assert.equal(result.futurePredictions.month6.month, 6);
    assert.equal(result.futurePredictions.month12.month, 12);
    assert.equal(result.futurePredictions.month24.month, 24);
    assert.equal(result.futurePredictions.month36.month, 36);

    // Revenue should reflect growth over 36 months
    assert.ok(result.futurePredictions.month36.revenuePaise > result.futurePredictions.month3.revenuePaise);
  });

  it("should compute sensitivity factors with realistic impact scores", () => {
    const result = runSimulation(sampleAssumptions, 42);

    assert.ok(Array.isArray(result.sensitivity));
    assert.ok(result.sensitivity.length >= 3);

    const rentSensitivity = result.sensitivity.find((s) => s.parameter.includes("Rent"));
    assert.ok(rentSensitivity);
    assert.ok(rentSensitivity.impactPercent < 0, "Rent increase should negatively impact viability");
  });

  it("should reflect low viability under adverse high-rent and high-competition scenarios", () => {
    const adverseAssumptions: SimulationAssumptions = {
      ...sampleAssumptions,
      pedestrianDensity: 0.1, // very low footfall
      competitorCount: 25,    // extreme competition
      investmentPaise: 50_00_000 * 100, // high capex
    };

    const result = runSimulation(adverseAssumptions, 99);
    assert.ok(result.probabilityOfViability < 40, "Viability should drop drastically in adverse scenario");
  });
});
