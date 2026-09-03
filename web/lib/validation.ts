import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1).max(128),
});

export const createProjectSchema = z.object({
  name: z.string().min(1).max(160),
  businessType: z.string().min(1).max(60),
  city: z.string().min(1).max(80).default("Bengaluru"),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(160).optional(),
  status: z.enum(["ACTIVE", "ARCHIVED"]).optional(),
});

export const simulationAssumptionsSchema = z.object({
  businessType: z.string().min(1),
  corridor: z.string().min(1),
  investmentPaise: z.number().int().nonnegative(),
  ticketSizePaise: z.number().int().nonnegative(),
  operatingHoursPerDay: z.number().min(1).max(24),
  radiusKm: z.number().min(0.1).max(10),
  pedestrianDensity: z.number().min(0).max(1),
  competitorCount: z.number().int().min(0).max(200),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  address: z.string().max(255).optional(),
});

export const createSimulationSchema = z.object({
  assumptions: simulationAssumptionsSchema,
});
