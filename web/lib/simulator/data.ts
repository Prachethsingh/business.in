export type BusinessTypeKey =
  | "cafe"
  | "restaurant"
  | "salon"
  | "retail"
  | "clinic"
  | "warehouse";

export type BusinessSubType = {
  key: string;
  label: string;
  defaultTicketSizePaise: number;
  defaultInvestmentPaise: number;
  defaultOperatingHours: number;
  footfallConversionRate: number;
  rentToRevenueBenchmark: number;
  cogsFraction?: number;
  description: string;
};

export type BusinessTypeDefaults = {
  key: BusinessTypeKey;
  label: string;
  defaultTicketSizePaise: number;
  defaultInvestmentPaise: number;
  defaultOperatingHours: number;
  footfallConversionRate: number;
  rentToRevenueBenchmark: number;
  subTypes: BusinessSubType[];
};

export const BUSINESS_TYPES: BusinessTypeDefaults[] = [
  {
    key: "cafe",
    label: "Café",
    defaultTicketSizePaise: 25000,
    defaultInvestmentPaise: 150_00000,
    defaultOperatingHours: 12,
    footfallConversionRate: 0.03,
    rentToRevenueBenchmark: 0.12,
    subTypes: [
      {
        key: "cafe-qsr-kiosk",
        label: "Quick-Service / Coffee Kiosk",
        defaultTicketSizePaise: 14000,
        defaultInvestmentPaise: 60_0000,
        defaultOperatingHours: 14,
        footfallConversionRate: 0.045,
        rentToRevenueBenchmark: 0.14,
        cogsFraction: 0.25,
        description: "High-throughput grab-and-go espresso kiosk near tech parks or metro stations",
      },
      {
        key: "cafe-specialty-artisan",
        label: "Specialty Artisan Café",
        defaultTicketSizePaise: 38000,
        defaultInvestmentPaise: 220_0000,
        defaultOperatingHours: 12,
        footfallConversionRate: 0.028,
        rentToRevenueBenchmark: 0.12,
        cogsFraction: 0.28,
        description: "Pour-overs, single-origin roasts, third-wave aesthetic & work-friendly space",
      },
      {
        key: "cafe-bakery-dessert",
        label: "Bakery & Dessert Café",
        defaultTicketSizePaise: 28000,
        defaultInvestmentPaise: 180_0000,
        defaultOperatingHours: 12,
        footfallConversionRate: 0.032,
        rentToRevenueBenchmark: 0.12,
        cogsFraction: 0.3,
        description: "Fresh viennoiserie, artisanal breads, specialty cakes & beverage pairings",
      },
      {
        key: "cafe-book-boardgame",
        label: "Book & Board Game Café",
        defaultTicketSizePaise: 26000,
        defaultInvestmentPaise: 150_0000,
        defaultOperatingHours: 12,
        footfallConversionRate: 0.02,
        rentToRevenueBenchmark: 0.11,
        cogsFraction: 0.25,
        description: "Long-dwell seating, community gaming shelves, specialty tea & coffee",
      },
      {
        key: "custom",
        label: "Custom / Manual Format",
        defaultTicketSizePaise: 25000,
        defaultInvestmentPaise: 150_0000,
        defaultOperatingHours: 12,
        footfallConversionRate: 0.03,
        rentToRevenueBenchmark: 0.12,
        description: "Manual custom format specification with user-defined parameters",
      },
    ],
  },
  {
    key: "restaurant",
    label: "Restaurant",
    defaultTicketSizePaise: 60000,
    defaultInvestmentPaise: 350_00000,
    defaultOperatingHours: 11,
    footfallConversionRate: 0.02,
    rentToRevenueBenchmark: 0.1,
    subTypes: [
      {
        key: "rest-casual-dining",
        label: "Casual Dining & Bistro",
        defaultTicketSizePaise: 65000,
        defaultInvestmentPaise: 350_0000,
        defaultOperatingHours: 12,
        footfallConversionRate: 0.022,
        rentToRevenueBenchmark: 0.1,
        cogsFraction: 0.34,
        description: "Full-service multi-cuisine or regional casual dining with air-conditioned seating",
      },
      {
        key: "rest-fine-dining",
        label: "Fine Dining & Experiential",
        defaultTicketSizePaise: 160000,
        defaultInvestmentPaise: 750_0000,
        defaultOperatingHours: 9,
        footfallConversionRate: 0.01,
        rentToRevenueBenchmark: 0.08,
        cogsFraction: 0.32,
        description: "Luxury chef-driven culinary experience, curated tasting menus, reservation-led",
      },
      {
        key: "rest-qsr-fastfood",
        label: "Quick Service / Fast Food (QSR)",
        defaultTicketSizePaise: 22000,
        defaultInvestmentPaise: 180_0000,
        defaultOperatingHours: 15,
        footfallConversionRate: 0.045,
        rentToRevenueBenchmark: 0.13,
        cogsFraction: 0.38,
        description: "High-volume counter ordering, rapid prep times, wraps, burgers or tiffin",
      },
      {
        key: "rest-cloud-kitchen",
        label: "Cloud Kitchen / Delivery Only",
        defaultTicketSizePaise: 38000,
        defaultInvestmentPaise: 120_0000,
        defaultOperatingHours: 16,
        footfallConversionRate: 0.005,
        rentToRevenueBenchmark: 0.05,
        cogsFraction: 0.35,
        description: "Commercial kitchen focused 100% on online delivery platforms (Zomato/Swiggy)",
      },
      {
        key: "rest-microbrewery",
        label: "Microbrewery & Gastropub",
        defaultTicketSizePaise: 120000,
        defaultInvestmentPaise: 1200_0000,
        defaultOperatingHours: 13,
        footfallConversionRate: 0.018,
        rentToRevenueBenchmark: 0.09,
        cogsFraction: 0.28,
        description: "Fresh craft beer on tap, high-capacity seating, live music & vibrant evening footfall",
      },
      {
        key: "custom",
        label: "Custom / Manual Format",
        defaultTicketSizePaise: 60000,
        defaultInvestmentPaise: 350_0000,
        defaultOperatingHours: 11,
        footfallConversionRate: 0.02,
        rentToRevenueBenchmark: 0.1,
        description: "Manual custom restaurant specification with user-defined parameters",
      },
    ],
  },
  {
    key: "salon",
    label: "Salon",
    defaultTicketSizePaise: 80000,
    defaultInvestmentPaise: 120_00000,
    defaultOperatingHours: 10,
    footfallConversionRate: 0.015,
    rentToRevenueBenchmark: 0.14,
    subTypes: [
      {
        key: "salon-unisex",
        label: "Unisex Hair & Beauty Salon",
        defaultTicketSizePaise: 75000,
        defaultInvestmentPaise: 150_0000,
        defaultOperatingHours: 11,
        footfallConversionRate: 0.018,
        rentToRevenueBenchmark: 0.13,
        cogsFraction: 0.15,
        description: "Hair styling, coloring, facial treatments, grooming packages & memberships",
      },
      {
        key: "salon-luxury-spa",
        label: "Luxury Day Spa & Wellness",
        defaultTicketSizePaise: 220000,
        defaultInvestmentPaise: 320_0000,
        defaultOperatingHours: 10,
        footfallConversionRate: 0.009,
        rentToRevenueBenchmark: 0.12,
        cogsFraction: 0.12,
        description: "Ayurvedic & modern body therapies, massage suites, hydrotherapy & premium oils",
      },
      {
        key: "salon-barbershop",
        label: "Men's Grooming Barbershop",
        defaultTicketSizePaise: 35000,
        defaultInvestmentPaise: 80_0000,
        defaultOperatingHours: 12,
        footfallConversionRate: 0.025,
        rentToRevenueBenchmark: 0.14,
        cogsFraction: 0.14,
        description: "Classic straight-razor shaves, fade cuts, beard design, high-frequency visits",
      },
      {
        key: "salon-nail-brow",
        label: "Nail & Lash Extension Studio",
        defaultTicketSizePaise: 110000,
        defaultInvestmentPaise: 110_0000,
        defaultOperatingHours: 10,
        footfallConversionRate: 0.014,
        rentToRevenueBenchmark: 0.15,
        cogsFraction: 0.18,
        description: "Custom acrylic nail art, gel overlays, lash extensions & eyebrow microblading",
      },
      {
        key: "custom",
        label: "Custom / Manual Format",
        defaultTicketSizePaise: 80000,
        defaultInvestmentPaise: 120_0000,
        defaultOperatingHours: 10,
        footfallConversionRate: 0.015,
        rentToRevenueBenchmark: 0.14,
        description: "Manual custom salon & spa format with user-defined parameters",
      },
    ],
  },
  {
    key: "retail",
    label: "Retail",
    defaultTicketSizePaise: 150000,
    defaultInvestmentPaise: 200_00000,
    defaultOperatingHours: 12,
    footfallConversionRate: 0.025,
    rentToRevenueBenchmark: 0.11,
    subTypes: [
      {
        key: "retail-apparel",
        label: "Apparel & Fashion Boutique",
        defaultTicketSizePaise: 180000,
        defaultInvestmentPaise: 250_0000,
        defaultOperatingHours: 11,
        footfallConversionRate: 0.022,
        rentToRevenueBenchmark: 0.12,
        cogsFraction: 0.45,
        description: "Designer streetwear, ethnic wear, athleisure & trend-driven apparel racks",
      },
      {
        key: "retail-supermarket",
        label: "Gourmet Grocery & Supermarket",
        defaultTicketSizePaise: 85000,
        defaultInvestmentPaise: 450_0000,
        defaultOperatingHours: 14,
        footfallConversionRate: 0.055,
        rentToRevenueBenchmark: 0.08,
        cogsFraction: 0.65,
        description: "Daily fresh organic produce, imported pantry staples, high basket frequency",
      },
      {
        key: "retail-pharmacy",
        label: "Pharmacy & Wellness Chemist",
        defaultTicketSizePaise: 48000,
        defaultInvestmentPaise: 140_0000,
        defaultOperatingHours: 15,
        footfallConversionRate: 0.048,
        rentToRevenueBenchmark: 0.09,
        cogsFraction: 0.6,
        description: "Prescription medications, OTC wellness, surgicals & emergency healthcare goods",
      },
      {
        key: "retail-electronics",
        label: "Electronics & Smart Gadgets",
        defaultTicketSizePaise: 450000,
        defaultInvestmentPaise: 380_0000,
        defaultOperatingHours: 11,
        footfallConversionRate: 0.014,
        rentToRevenueBenchmark: 0.08,
        cogsFraction: 0.72,
        description: "Smartphones, wearables, premium audio & smart home consumer electronics",
      },
      {
        key: "retail-optical",
        label: "Optical & Eyewear Studio",
        defaultTicketSizePaise: 240000,
        defaultInvestmentPaise: 200_0000,
        defaultOperatingHours: 11,
        footfallConversionRate: 0.018,
        rentToRevenueBenchmark: 0.11,
        cogsFraction: 0.38,
        description: "Prescription frames, contact lenses, in-house optometrist eye checkups",
      },
      {
        key: "custom",
        label: "Custom / Manual Format",
        defaultTicketSizePaise: 150000,
        defaultInvestmentPaise: 200_0000,
        defaultOperatingHours: 12,
        footfallConversionRate: 0.025,
        rentToRevenueBenchmark: 0.11,
        description: "Manual custom retail format with user-defined parameters",
      },
    ],
  },
  {
    key: "clinic",
    label: "Clinic",
    defaultTicketSizePaise: 50000,
    defaultInvestmentPaise: 250_00000,
    defaultOperatingHours: 9,
    footfallConversionRate: 0.01,
    rentToRevenueBenchmark: 0.08,
    subTypes: [
      {
        key: "clinic-dental",
        label: "Dental Care & Orthodontics",
        defaultTicketSizePaise: 140000,
        defaultInvestmentPaise: 240_0000,
        defaultOperatingHours: 9,
        footfallConversionRate: 0.011,
        rentToRevenueBenchmark: 0.08,
        cogsFraction: 0.18,
        description: "Operatory chairs, digital RVG X-ray, clear aligners, implants & root canals",
      },
      {
        key: "clinic-dermatology",
        label: "Dermatology & Aesthetic Clinic",
        defaultTicketSizePaise: 250000,
        defaultInvestmentPaise: 380_0000,
        defaultOperatingHours: 9,
        footfallConversionRate: 0.008,
        rentToRevenueBenchmark: 0.09,
        cogsFraction: 0.2,
        description: "Cosmetic dermatology, laser hair reduction, medi-facials & clinical skincare",
      },
      {
        key: "clinic-general-opd",
        label: "General OPD & Polyclinic",
        defaultTicketSizePaise: 50000,
        defaultInvestmentPaise: 160_0000,
        defaultOperatingHours: 11,
        footfallConversionRate: 0.022,
        rentToRevenueBenchmark: 0.07,
        cogsFraction: 0.15,
        description: "Multi-specialty doctor consultation chambers, basic diagnostics & health checks",
      },
      {
        key: "clinic-pediatric",
        label: "Pediatric & Child Health Care",
        defaultTicketSizePaise: 70000,
        defaultInvestmentPaise: 180_0000,
        defaultOperatingHours: 8,
        footfallConversionRate: 0.013,
        rentToRevenueBenchmark: 0.08,
        cogsFraction: 0.16,
        description: "Child wellness, infant vaccinations, growth tracking in child-friendly layout",
      },
      {
        key: "clinic-physiotherapy",
        label: "Physiotherapy & Sports Rehab",
        defaultTicketSizePaise: 85000,
        defaultInvestmentPaise: 150_0000,
        defaultOperatingHours: 10,
        footfallConversionRate: 0.012,
        rentToRevenueBenchmark: 0.08,
        cogsFraction: 0.12,
        description: "Electrotherapy machines, therapeutic exercise floor, post-op mobility recovery",
      },
      {
        key: "custom",
        label: "Custom / Manual Format",
        defaultTicketSizePaise: 50000,
        defaultInvestmentPaise: 250_0000,
        defaultOperatingHours: 9,
        footfallConversionRate: 0.01,
        rentToRevenueBenchmark: 0.08,
        description: "Manual custom clinic format with user-defined parameters",
      },
    ],
  },
  {
    key: "warehouse",
    label: "Warehouse",
    defaultTicketSizePaise: 0,
    defaultInvestmentPaise: 500_00000,
    defaultOperatingHours: 24,
    footfallConversionRate: 0,
    rentToRevenueBenchmark: 0.06,
    subTypes: [
      {
        key: "wh-darkstore",
        label: "Quick-Commerce Dark Store",
        defaultTicketSizePaise: 0,
        defaultInvestmentPaise: 250_0000,
        defaultOperatingHours: 24,
        footfallConversionRate: 0,
        rentToRevenueBenchmark: 0.06,
        cogsFraction: 0.15,
        description: "High-density micro-fulfillment node for 10-minute grocery dispatches in 2km radius",
      },
      {
        key: "wh-coldstorage",
        label: "Temperature-Controlled Cold Storage",
        defaultTicketSizePaise: 0,
        defaultInvestmentPaise: 850_0000,
        defaultOperatingHours: 24,
        footfallConversionRate: 0,
        rentToRevenueBenchmark: 0.05,
        cogsFraction: 0.22,
        description: "Multi-chamber refrigeration (-20°C to +4°C) for pharma, dairy and fresh logistics",
      },
      {
        key: "wh-ecommerce-3pl",
        label: "3PL E-commerce Sorting Hub",
        defaultTicketSizePaise: 0,
        defaultInvestmentPaise: 550_0000,
        defaultOperatingHours: 24,
        footfallConversionRate: 0,
        rentToRevenueBenchmark: 0.05,
        cogsFraction: 0.18,
        description: "Conveyor sortation, parcel bagging, last-mile intra-city delivery fleet base",
      },
      {
        key: "wh-industrial",
        label: "Light Industrial & Bulk Storage",
        defaultTicketSizePaise: 0,
        defaultInvestmentPaise: 400_0000,
        defaultOperatingHours: 24,
        footfallConversionRate: 0,
        rentToRevenueBenchmark: 0.04,
        cogsFraction: 0.12,
        description: "Pallet racking, heavy equipment storage, raw materials depot near ring roads",
      },
      {
        key: "custom",
        label: "Custom / Manual Format",
        defaultTicketSizePaise: 0,
        defaultInvestmentPaise: 500_0000,
        defaultOperatingHours: 24,
        footfallConversionRate: 0,
        rentToRevenueBenchmark: 0.06,
        description: "Manual custom logistics facility with user-defined parameters",
      },
    ],
  },
];

export type Corridor = {
  key: string;
  label: string;
  lat: number;
  lng: number;
  pedestrianDensity: number; 
  rentIndex: number; 
};

export const BENGALURU_CORRIDORS: Corridor[] = [
  { key: "koramangala", label: "Koramangala", lat: 12.9352, lng: 77.6146, pedestrianDensity: 0.82, rentIndex: 1.35 },
  { key: "indiranagar", label: "Indiranagar", lat: 12.9719, lng: 77.6412, pedestrianDensity: 0.85, rentIndex: 1.4 },
  { key: "jp-nagar", label: "JP Nagar", lat: 12.9077, lng: 77.585, pedestrianDensity: 0.65, rentIndex: 1.05 },
  { key: "whitefield", label: "Whitefield", lat: 12.9698, lng: 77.75, pedestrianDensity: 0.55, rentIndex: 0.95 },
  { key: "peenya", label: "Peenya", lat: 13.029, lng: 77.52, pedestrianDensity: 0.3, rentIndex: 0.6 },
  { key: "hsr-layout", label: "HSR Layout", lat: 12.9116, lng: 77.6412, pedestrianDensity: 0.75, rentIndex: 1.2 },
  { key: "mg-road", label: "MG Road", lat: 12.9756, lng: 77.6066, pedestrianDensity: 0.92, rentIndex: 1.5 },
];

export function findBusinessType(key: string): BusinessTypeDefaults {
  const found = BUSINESS_TYPES.find((b) => b.key === key);
  if (!found) return BUSINESS_TYPES[0]!;
  return found;
}

export function findBusinessSubType(businessKey: string, subTypeKey: string): BusinessSubType | undefined {
  const biz = findBusinessType(businessKey);
  return biz.subTypes.find((s) => s.key === subTypeKey);
}

export function findCorridor(key: string): Corridor {
  const normalizedKey = key.toLowerCase().replace(/[\s_]+/g, "-");
  const aliasMap: Record<string, string> = {
    hsr: "hsr-layout",
    "hsr-layout": "hsr-layout",
    jpnagar: "jp-nagar",
    "jp-nagar": "jp-nagar",
    mgroad: "mg-road",
    "mg-road": "mg-road",
    peenya: "peenya",
    whitefield: "whitefield",
    indiranagar: "indiranagar",
    koramangala: "koramangala",
  };
  const resolvedKey = aliasMap[normalizedKey] || normalizedKey;
  const found = BENGALURU_CORRIDORS.find((c) => c.key === resolvedKey || c.key === key);
  if (!found) return BENGALURU_CORRIDORS[0]!;
  return found;
}
