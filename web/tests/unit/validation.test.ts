import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { registerSchema, createProjectSchema, simulationAssumptionsSchema } from "../../lib/validation.ts";

describe("Validation Schemas Tests", () => {
  describe("Registration Schema", () => {
    it("should accept valid registration inputs", () => {
      const valid = {
        name: "Priya Rao",
        email: "priya.rao@example.com",
        password: "SuperSecretPassword123!",
      };
      const parsed = registerSchema.safeParse(valid);
      assert.ok(parsed.success);
    });

    it("should reject invalid email addresses", () => {
      const invalid = {
        email: "not-an-email",
        password: "ValidPassword123!",
      };
      const parsed = registerSchema.safeParse(invalid);
      assert.ok(!parsed.success);
    });

    it("should reject passwords shorter than 8 characters", () => {
      const invalid = {
        email: "user@example.com",
        password: "short",
      };
      const parsed = registerSchema.safeParse(invalid);
      assert.ok(!parsed.success);
    });
  });

  describe("Project Creation Schema", () => {
    it("should accept valid project creation payload with default city", () => {
      const valid = {
        name: "Indiranagar Coffee Lab",
        businessType: "CAFE",
      };
      const parsed = createProjectSchema.safeParse(valid);
      assert.ok(parsed.success);
      if (parsed.success) {
        assert.equal(parsed.data.city, "Bengaluru");
      }
    });

    it("should reject project creation with empty name", () => {
      const invalid = {
        name: "",
        businessType: "CAFE",
      };
      const parsed = createProjectSchema.safeParse(invalid);
      assert.ok(!parsed.success);
    });
  });

  describe("Simulation Assumptions Schema", () => {
    it("should enforce numerical constraints on coordinate and financial bounds", () => {
      const valid = {
        businessType: "cafe",
        corridor: "koramangala",
        investmentPaise: 1000000,
        ticketSizePaise: 25000,
        operatingHoursPerDay: 12,
        radiusKm: 2.0,
        pedestrianDensity: 0.8,
        competitorCount: 5,
        lat: 12.9352,
        lng: 77.6245,
        address: "80ft Road, Koramangala",
      };
      const parsed = simulationAssumptionsSchema.safeParse(valid);
      assert.ok(parsed.success);
    });

    it("should reject out-of-bounds latitude/longitude", () => {
      const invalid = {
        businessType: "cafe",
        corridor: "koramangala",
        investmentPaise: 1000000,
        ticketSizePaise: 25000,
        operatingHoursPerDay: 12,
        radiusKm: 2.0,
        pedestrianDensity: 0.8,
        competitorCount: 5,
        lat: 195.0, // Invalid lat
        lng: 77.6245,
      };
      const parsed = simulationAssumptionsSchema.safeParse(invalid);
      assert.ok(!parsed.success);
    });
  });
});
