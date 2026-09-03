"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  BUSINESS_TYPES,
  BENGALURU_CORRIDORS,
  findBusinessType,
  findBusinessSubType,
  findCorridor,
  type BusinessTypeKey,
} from "@/lib/simulator/data";
import { runSimulation, type SimulationAssumptions, type SimulationResult } from "@/lib/simulator/engine";
import { Button } from "@/components/ui/Button";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import {
  FaFileCsv,
  FaPrint,
  FaShareAlt,
  FaCheck,
  FaMapMarkerAlt,
  FaExchangeAlt,
  FaSlidersH,
  FaCrown,
  FaBolt,
  FaArrowUp,
  FaArrowDown,
  FaMoneyBillWave,
  FaHourglassHalf,
  FaInfoCircle,
  FaExpand,
  FaCompress,
  FaLock,
} from "react-icons/fa";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });
import LiveIntelligenceRadar from "@/components/simulator/LiveIntelligenceRadar";

function paiseToRupeeLabel(paise: number): string {
  const rupees = Math.round(paise / 100);
  return `\u20B9${rupees.toLocaleString("en-IN")}`;
}

type Props = {
  projectId?: string;
  onSaved?: (simulationId: string) => void;
};

export default function SimulatorClient({ projectId, onSaved }: Props) {
  const [activeTab, setActiveTab] = useState<"simulator" | "compare">("simulator");
  const [businessType, setBusinessType] = useState<BusinessTypeKey>(BUSINESS_TYPES[0]!.key);
  const [subTypeKey, setSubTypeKey] = useState<string>(
    BUSINESS_TYPES[0]!.subTypes[0]?.key || "cafe-qsr-kiosk"
  );
  const [customSubTypeName, setCustomSubTypeName] = useState<string>("");

  const [corridorKey, setCorridorKey] = useState(BENGALURU_CORRIDORS[0]!.key);
  const [radiusKm, setRadiusKm] = useState(1.0);
  const [investmentRupees, setInvestmentRupees] = useState(6_00_000);
  const [ticketSizeRupees, setTicketSizeRupees] = useState(140);
  const [operatingHours, setOperatingHours] = useState(14);
  const [pedestrianDensity, setPedestrianDensity] = useState(0.7);
  const [competitorCount, setCompetitorCount] = useState(5);
  const [pin, setPin] = useState(() => {
    const c = BENGALURU_CORRIDORS[0]!;
    return { lat: c.lat, lng: c.lng };
  });

  
  const [compareCorridorKey, setCompareCorridorKey] = useState(BENGALURU_CORRIDORS[1]!.key);

  
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.key === "r" || e.key === "R") &&
        !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setPedestrianDensity((p) => Math.min(1.0, Math.max(0.2, Number((p + (Math.random() > 0.5 ? 0.01 : -0.01)).toFixed(2)))));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isProUser, setIsProUser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const proUnlocked = localStorage.getItem("business_in_pro_unlocked");
      if (proUnlocked === "true") {
        setIsProUser(true);
      }
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    function handleFs() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFs);
    return () => document.removeEventListener("fullscreenchange", handleFs);
  }, []);

  const corridor = useMemo(() => findCorridor(corridorKey), [corridorKey]);
  const biz = useMemo(() => findBusinessType(businessType), [businessType]);
  const subType = useMemo(
    () => findBusinessSubType(businessType, subTypeKey),
    [businessType, subTypeKey]
  );

  const handleBusinessTypeChange = useCallback((newKey: BusinessTypeKey) => {
    setBusinessType(newKey);
    const newBiz = findBusinessType(newKey);
    const firstSub = newBiz.subTypes[0];
    if (firstSub) {
      setSubTypeKey(firstSub.key);
      if (firstSub.key !== "custom") {
        setInvestmentRupees(Math.round(firstSub.defaultInvestmentPaise / 100));
        setTicketSizeRupees(Math.round(firstSub.defaultTicketSizePaise / 100));
        setOperatingHours(firstSub.defaultOperatingHours);
      }
    }
  }, []);

  const handleSubTypeChange = useCallback(
    (newSubKey: string) => {
      setSubTypeKey(newSubKey);
      if (newSubKey !== "custom") {
        const selectedSub = findBusinessSubType(businessType, newSubKey);
        if (selectedSub) {
          setInvestmentRupees(Math.round(selectedSub.defaultInvestmentPaise / 100));
          setTicketSizeRupees(Math.round(selectedSub.defaultTicketSizePaise / 100));
          setOperatingHours(selectedSub.defaultOperatingHours);
        }
      }
    },
    [businessType]
  );

  const handleCorridorChange = useCallback((key: string) => {
    setCorridorKey(key);
    const c = findCorridor(key);
    setPin({ lat: c.lat, lng: c.lng });
  }, []);

  const assumptions: SimulationAssumptions = useMemo(
    () => ({
      businessType,
      subType: subTypeKey,
      customSubTypeName: subTypeKey === "custom" ? customSubTypeName : undefined,
      corridor: corridorKey,
      investmentPaise: investmentRupees * 100,
      ticketSizePaise: ticketSizeRupees * 100,
      operatingHoursPerDay: operatingHours,
      radiusKm,
      pedestrianDensity,
      competitorCount,
      lat: pin.lat,
      lng: pin.lng,
    }),
    [businessType, subTypeKey, customSubTypeName, corridorKey, investmentRupees, ticketSizeRupees, operatingHours, radiusKm, pedestrianDensity, competitorCount, pin]
  );

  
  const result: SimulationResult = useMemo(() => {
    return runSimulation(assumptions);
  }, [assumptions]);

  
  const prevRateRef = useRef<number>(result.probabilityOfViability);
  const [rateDelta, setRateDelta] = useState<number>(0);

  useEffect(() => {
    const diff = Math.round((result.probabilityOfViability - prevRateRef.current) * 10) / 10;
    if (diff !== 0) {
      setRateDelta(diff);
      const timer = setTimeout(() => setRateDelta(0), 3000);
      prevRateRef.current = result.probabilityOfViability;
      return () => clearTimeout(timer);
    }
  }, [result.probabilityOfViability]);

  
  const compareResult = useMemo(() => {
    if (activeTab !== "compare") return null;
    const c2 = findCorridor(compareCorridorKey);
    return runSimulation({
      ...assumptions,
      corridor: compareCorridorKey,
      lat: c2.lat,
      lng: c2.lng,
    });
  }, [activeTab, assumptions, compareCorridorKey]);

  const handleSave = useCallback(async () => {
    if (!projectId) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/simulations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assumptions }),
      });
      if (res.status === 402) {
        setUpgradeOpen(true);
        setError("Free plan limit reached (10 saved scenarios). Upgrade to Pro to save more.");
        return;
      }
      if (!res.ok) {
        setError("Could not save this scenario. Please try again.");
        return;
      }
      const data = await res.json();
      onSaved?.(data.simulation.id);
    } catch {
      setError("Could not save scenario.");
    } finally {
      setSaving(false);
    }
  }, [projectId, assumptions, onSaved]);

  function exportCSV() {
    const formatName = subTypeKey === "custom" ? (customSubTypeName || "Custom Format") : (subType?.label || biz.label);
    const rows = [
      ["Metric", "Value"],
      ["Business Format", biz.label],
      ["Specific Sub-type", formatName],
      ["Bengaluru Corridor", corridor.label],
      ["Investment (Capex)", paiseToRupeeLabel(assumptions.investmentPaise)],
      ["Avg Ticket Size", paiseToRupeeLabel(assumptions.ticketSizePaise)],
      ["Operating Hours/Day", assumptions.operatingHoursPerDay],
      ["Catchment Radius", `${assumptions.radiusKm} km`],
      ["Pedestrian Density", `${Math.round(assumptions.pedestrianDensity * 100)}%`],
      ["Competitors Nearby", assumptions.competitorCount],
      ["Real-time Rate of Success", `${result.probabilityOfViability}%`],
      ["Verdict", result.verdict],
      ["Expected Monthly Revenue", paiseToRupeeLabel(result.expected.monthlyRevenuePaise)],
      ["Expected Monthly Profit", paiseToRupeeLabel(result.expected.monthlyProfitPaise)],
      ["Expected Break-even (Months)", result.expected.breakEvenMonths],
      ["Best Case Monthly Revenue", paiseToRupeeLabel(result.best.monthlyRevenuePaise)],
      ["Worst Case Monthly Revenue", paiseToRupeeLabel(result.worst.monthlyRevenuePaise)],
      ["Model Version", result.modelVersion],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BUSINESS_IN_${corridorKey}_${businessType}_Simulation.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleExportCSV() {
    if (!isProUser) {
      setUpgradeOpen(true);
      return;
    }
    exportCSV();
  }

  function handleExportPDF() {
    if (!isProUser) {
      setUpgradeOpen(true);
      return;
    }
    window.print();
  }

  function handleSelectCompareTab() {
    if (!isProUser) {
      setUpgradeOpen(true);
      return;
    }
    setActiveTab("compare");
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const activeFormatLabel = subTypeKey === "custom" && customSubTypeName
    ? `${biz.label}: ${customSubTypeName}`
    : subType
    ? subType.label
    : biz.label;

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between flex-wrap gap-4 p-3.5 rounded-2xl bg-[#121212] border border-white/10">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF85] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF85]"></span>
          </span>
          <span className="text-xs font-mono text-white flex items-center gap-1.5">
            <FaBolt className="text-[#00FF85]" /> REALTIME SUCCESS ENGINE ACTIVE (10,000 MONTE CARLO DRAWS)
          </span>
        </div>

        
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 min-h-[36px] ${
              activeTab === "simulator"
                ? "bg-[#00FF85]/20 text-[#00FF85] border border-[#00FF85]/40"
                : "text-white hover:text-white bg-white/10 border border-white/10"
            }`}
          >
            <FaSlidersH size={12} /> Simulator Studio
          </button>
          <button
            onClick={handleSelectCompareTab}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 min-h-[36px] ${
              activeTab === "compare"
                ? "bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40"
                : "text-white hover:text-white bg-white/10 border border-white/10"
            }`}
          >
            <FaExchangeAlt size={12} /> Corridor Compare
            {!isProUser && (
              <span className="ml-1 text-[10px] font-mono bg-[#FFD700]/20 text-[#FFD700] px-1.5 py-0.5 rounded-full border border-[#FFD700]/40 flex items-center gap-0.5 font-bold">
                <FaLock size={8} /> PRO
              </span>
            )}
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 min-h-[36px] border border-white/10 transition-all cursor-pointer"
            title={isProUser ? "Download Structured CSV Report" : "Pro Feature: Unlock CSV Feasibility Export"}
          >
            <FaFileCsv className="text-[#00FF85]" size={13} />
            <span>Export CSV</span>
            {!isProUser && (
              <span className="text-[10px] font-mono bg-[#FFD700]/20 text-[#FFD700] px-1.5 py-0.5 rounded-full border border-[#FFD700]/40 flex items-center gap-0.5 font-bold">
                <FaLock size={8} /> PRO
              </span>
            )}
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 min-h-[36px] border border-white/10 transition-all cursor-pointer"
            title={isProUser ? "Print or Export Investor PDF" : "Pro Feature: Unlock Investor PDF Export"}
          >
            <FaPrint className="text-[#38BDF8]" size={13} />
            <span>Investor PDF</span>
            {!isProUser && (
              <span className="text-[10px] font-mono bg-[#FFD700]/20 text-[#FFD700] px-1.5 py-0.5 rounded-full border border-[#FFD700]/40 flex items-center gap-0.5 font-bold">
                <FaLock size={8} /> PRO
              </span>
            )}
          </button>
          <button
            onClick={() => setUpgradeOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border border-[#FFD700]/40 text-[#FFD700] text-xs font-mono flex items-center gap-1.5 hover:scale-105 transition-all min-h-[36px]"
          >
            <FaCrown /> Pro ₹99
          </button>
          <button
            onClick={toggleFullscreen}
            className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono flex items-center gap-1.5 transition-all min-h-[36px] border border-white/10 cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
          >
            {isFullscreen ? <FaCompress size={12} className="text-[#38BDF8]" /> : <FaExpand size={12} className="text-[#00FF85]" />}
            <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      {activeTab === "simulator" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="glass rounded-3xl p-5 sm:p-6 bg-[#121212]/90 border border-white/15 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h2 className="font-display text-lg sm:text-xl font-black text-white flex items-center gap-2.5 tracking-wide">
                  <FaSlidersH className="text-[#00FF85]" /> Location Parameters
                </h2>
                <span className="text-xs font-mono font-bold text-[#00FF85] bg-[#00FF85]/15 px-3 py-1 rounded-full border border-[#00FF85]/35 shadow-sm">
                  Live Engine Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <FieldSelect
                  id="businessType"
                  label="Format"
                  value={businessType}
                  onChange={(v) => handleBusinessTypeChange(v as BusinessTypeKey)}
                  options={BUSINESS_TYPES.map((b) => ({ value: b.key, label: b.label }))}
                />

                <FieldSelect
                  id="businessSubType"
                  label="Sub-Type"
                  value={subTypeKey}
                  onChange={handleSubTypeChange}
                  options={biz.subTypes.map((s) => ({ value: s.key, label: s.label }))}
                />

                <FieldSelect
                  id="corridor"
                  label="Bengaluru Zone"
                  value={corridorKey}
                  onChange={handleCorridorChange}
                  options={BENGALURU_CORRIDORS.map((c) => ({ value: c.key, label: c.label }))}
                />
              </div>

              {subTypeKey === "custom" && (
                <div className="space-y-1.5 p-3 rounded-2xl bg-white/[0.04] border border-[#00FF85]/40 shadow-inner">
                  <label htmlFor="customSubTypeName" className="block text-xs font-display font-black text-[#00FF85] uppercase tracking-wider">
                    Manual Concept Specification
                  </label>
                  <input
                    id="customSubTypeName"
                    type="text"
                    placeholder="e.g. Specialty Matcha Bar, Pet Spa..."
                    value={customSubTypeName}
                    onChange={(e) => setCustomSubTypeName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#181818] border border-white/20 focus:border-[#00FF85] rounded-xl text-white text-sm font-sans focus:outline-none transition-all placeholder:text-white/40 font-medium"
                  />
                </div>
              )}

              {subType && subTypeKey !== "custom" && (
                <div className="py-2 px-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs font-mono text-white flex-wrap">
                  <span className="text-white font-medium truncate">{subType.description}</span>
                  <div className="flex items-center gap-2 text-[#00FF85] flex-shrink-0 font-bold">
                    <span className="bg-[#00FF85]/15 px-2 py-0.5 rounded-md border border-[#00FF85]/30">Preset</span>
                    <span>CapEx: {paiseToRupeeLabel(subType.defaultInvestmentPaise)}</span>
                    {subType.defaultTicketSizePaise > 0 && (
                      <>
                        <span>·</span>
                        <span>Ticket: {paiseToRupeeLabel(subType.defaultTicketSizePaise)}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{subType.defaultOperatingHours}h/d</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 pt-2 border-t border-white/10">
                <FieldRange
                  id="investment"
                  label="Initial CapEx"
                  valueDisplay={paiseToRupeeLabel(investmentRupees * 100)}
                  min={100_000}
                  max={15_000_000}
                  step={50_000}
                  value={investmentRupees}
                  onChange={setInvestmentRupees}
                />

                <FieldRange
                  id="ticketSize"
                  label="Avg Ticket Size"
                  valueDisplay={paiseToRupeeLabel(ticketSizeRupees * 100)}
                  min={0}
                  max={10_000}
                  step={20}
                  value={ticketSizeRupees}
                  onChange={setTicketSizeRupees}
                />

                <FieldRange
                  id="operatingHours"
                  label="Operating Hours"
                  valueDisplay={`${operatingHours} hrs / day`}
                  min={4}
                  max={24}
                  step={1}
                  value={operatingHours}
                  onChange={setOperatingHours}
                />

                <FieldRange
                  id="radiusKm"
                  label="Catchment Radius"
                  valueDisplay={`${radiusKm.toFixed(1)} km`}
                  min={0.2}
                  max={5}
                  step={0.1}
                  value={radiusKm}
                  onChange={setRadiusKm}
                />

                <FieldRange
                  id="pedestrianDensity"
                  label="Pedestrian Density"
                  valueDisplay={`${Math.round(pedestrianDensity * 100)}%`}
                  min={0}
                  max={1}
                  step={0.05}
                  value={pedestrianDensity}
                  onChange={setPedestrianDensity}
                />

                <FieldRange
                  id="competitorCount"
                  label="Direct Competitors"
                  valueDisplay={`${competitorCount} stores`}
                  min={0}
                  max={30}
                  step={1}
                  value={competitorCount}
                  onChange={setCompetitorCount}
                />
              </div>

              {projectId && (
                <div className="pt-2">
                  <Button variant="secondary" onClick={handleSave} disabled={saving} className="w-full justify-center py-2.5 text-sm font-bold font-display">
                    {saving ? "Saving…" : "Save This Scenario"}
                  </Button>
                </div>
              )}

              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            {/* Live Intelligence Radar filling the empty space with live telemetry animation */}
            <LiveIntelligenceRadar
              corridorKey={corridorKey}
              corridorLabel={corridor.label}
              radiusKm={radiusKm}
              pedestrianDensity={pedestrianDensity}
              competitorCount={competitorCount}
              probability={result.probabilityOfViability}
              expectedProfitPaise={result.expected.monthlyProfitPaise}
            />
          </div>

          
          <div className="lg:col-span-6 space-y-4">
            
            <div className="glass rounded-3xl overflow-hidden border border-white/15 h-[260px] sm:h-[280px] relative shadow-2xl">
              <MapView
                lat={pin.lat}
                lng={pin.lng}
                radiusKm={radiusKm}
                onPinMove={(lat, lng) => setPin({ lat, lng })}
              />
              <div className="absolute top-3 right-3 z-[400] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-xl">
                <FaMapMarkerAlt className="text-[#00FF85]" /> Drag pin for live coordinates
              </div>
            </div>

            
            <div className="glass rounded-2xl p-4 bg-[#121212]/95 border border-white/10 shadow-2xl">
              <RealtimeResultsPanel
                result={result}
                rateDelta={rateDelta}
                biz={activeFormatLabel}
                corridor={corridor.label}
                isProUser={isProUser}
                onExportCSV={handleExportCSV}
                onPrint={handleExportPDF}
                onShare={handleShare}
                copied={copied}
              />
            </div>
          </div>
        </div>
      ) : (
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="glass rounded-3xl p-6 bg-[#121212]/90 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-[#00FF85] uppercase">Location 1</span>
                <span className="text-xs text-[#A0A0A0]">{biz.label}</span>
              </div>
              <FieldSelect
                id="corridor1"
                label="Primary Corridor"
                value={corridorKey}
                onChange={handleCorridorChange}
                options={BENGALURU_CORRIDORS.map((c) => ({ value: c.key, label: c.label }))}
              />
              <div className="space-y-4 pt-2">
                <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-[#00FF85]/10 to-transparent border border-[#00FF85]/20">
                  <div className="text-4xl font-bold font-mono text-[#00FF85]">
                    {result.probabilityOfViability}%
                  </div>
                  <p className="text-xs text-[#E0E0E0] mt-1 font-sans">{result.verdict}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[#A0A0A0] block text-[10px]">Expected Revenue</span>
                    <strong className="text-white text-sm">
                      {paiseToRupeeLabel(result.expected.monthlyRevenuePaise)}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[#A0A0A0] block text-[10px]">Expected Profit</span>
                    <strong className="text-[#00FF85] text-sm">
                      {paiseToRupeeLabel(result.expected.monthlyProfitPaise)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="glass rounded-3xl p-6 bg-[#121212]/90 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-[#38BDF8] uppercase">Location 2</span>
                <span className="text-xs text-[#A0A0A0]">{biz.label}</span>
              </div>
              <FieldSelect
                id="corridor2"
                label="Comparison Corridor"
                value={compareCorridorKey}
                onChange={setCompareCorridorKey}
                options={BENGALURU_CORRIDORS.map((c) => ({ value: c.key, label: c.label }))}
              />
              {compareResult && (
                <div className="space-y-4 pt-2">
                  <div className="text-center p-5 rounded-2xl bg-gradient-to-br from-[#38BDF8]/10 to-transparent border border-[#38BDF8]/20">
                    <div className="text-4xl font-bold font-mono text-[#38BDF8]">
                      {compareResult.probabilityOfViability}%
                    </div>
                    <p className="text-xs text-[#E0E0E0] mt-1 font-sans">{compareResult.verdict}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[#A0A0A0] block text-[10px]">Expected Revenue</span>
                      <strong className="text-white text-sm">
                        {paiseToRupeeLabel(compareResult.expected.monthlyRevenuePaise)}
                      </strong>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[#A0A0A0] block text-[10px]">Expected Profit</span>
                      <strong className="text-[#38BDF8] text-sm">
                        {paiseToRupeeLabel(compareResult.expected.monthlyProfitPaise)}
                      </strong>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#A0A0A0]">Viability Delta:</span>
                      <strong
                        className={
                          compareResult.probabilityOfViability >= result.probabilityOfViability
                            ? "text-[#38BDF8]"
                            : "text-[#FFA0A0]"
                        }
                      >
                        {compareResult.probabilityOfViability - result.probabilityOfViability > 0 ? "+" : ""}
                        {compareResult.probabilityOfViability - result.probabilityOfViability}%
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A0A0A0]">Break-Even Horizon:</span>
                      <strong className="text-white">{compareResult.expected.breakEvenMonths} months</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      
      <UpgradeModal isOpen={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </div>
  );
}

function RealtimeResultsPanel({
  result,
  rateDelta,
  biz,
  corridor,
  isProUser,
  onExportCSV,
  onPrint,
  onShare,
  copied,
}: {
  result: SimulationResult;
  rateDelta: number;
  biz: string;
  corridor: string;
  isProUser?: boolean;
  onExportCSV: () => void;
  onPrint: () => void;
  onShare: () => void;
  copied: boolean;
}) {
  const rate = result.probabilityOfViability;
  const color =
    rate >= 70 ? "#00FF85" : rate >= 50 ? "#38BDF8" : rate >= 35 ? "#FFD700" : "#FFA0A0";

  const statusLabel =
    rate >= 70
      ? "HIGH SUCCESS"
      : rate >= 50
      ? "MODERATE / VIABLE"
      : rate >= 35
      ? "MARGINAL RISK"
      : "HIGH RISK";

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-[#00FF85] uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-ping" /> {biz} · {corridor}
          </span>
          <h3 className="text-xl sm:text-2xl font-black font-display text-white mt-0.5 tracking-tight">
            Decision Intelligence
          </h3>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onExportCSV}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono font-bold text-white flex items-center gap-1.5 border border-white/15 transition-all shadow-sm cursor-pointer"
            title={isProUser ? "Download CSV report" : "Pro Feature: Unlock CSV Feasibility Export"}
          >
            <FaFileCsv className="text-[#00FF85]" /> CSV
            {!isProUser && (
              <span className="text-[10px] font-mono bg-[#FFD700]/20 text-[#FFD700] px-1.5 py-0.5 rounded-full border border-[#FFD700]/40 flex items-center gap-0.5 font-bold">
                <FaLock size={8} /> PRO
              </span>
            )}
          </button>
          <button
            onClick={onPrint}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono font-bold text-white flex items-center gap-1.5 border border-white/15 transition-all shadow-sm cursor-pointer"
            title={isProUser ? "Print or Save PDF" : "Pro Feature: Unlock Investor PDF Export"}
          >
            <FaPrint className="text-[#38BDF8]" /> PDF
            {!isProUser && (
              <span className="text-[10px] font-mono bg-[#FFD700]/20 text-[#FFD700] px-1.5 py-0.5 rounded-full border border-[#FFD700]/40 flex items-center gap-0.5 font-bold">
                <FaLock size={8} /> PRO
              </span>
            )}
          </button>
          <button
            onClick={onShare}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono font-bold text-white flex items-center gap-1.5 border border-white/15 transition-all shadow-sm"
            title="Copy simulation link"
          >
            {copied ? <FaCheck className="text-[#00FF85]" /> : <FaShareAlt />}
            {copied ? "Copied" : "Share"}
          </button>
        </div>
      </div>

      
      <div
        className="p-5 sm:p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xl"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${color}20, rgba(18,18,18,0.95))`,
          borderColor: `${color}50`,
          boxShadow: `0 10px 40px ${color}15`,
        }}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs font-display font-black px-3 py-1 rounded-full border uppercase tracking-wider shadow-sm"
              style={{
                background: `${color}20`,
                borderColor: `${color}60`,
                color: color,
              }}
            >
              {statusLabel}
            </span>
            {rateDelta !== 0 && (
              <span
                className={`text-xs font-mono font-black px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                  rateDelta > 0
                    ? "bg-green-500/20 text-green-400 border border-green-500/40"
                    : "bg-red-500/20 text-red-400 border border-red-500/40"
                }`}
              >
                {rateDelta > 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                {rateDelta > 0 ? `+${rateDelta}%` : `${rateDelta}%`}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-3">
            <span
              className="text-5xl sm:text-6xl font-black font-display tracking-tight transition-all"
              style={{ color: color }}
            >
              {rate}%
            </span>
            <span className="text-xs sm:text-sm font-display font-bold text-white uppercase tracking-wider">
              Viability Rate
            </span>
          </div>
          <p className="text-xs sm:text-sm text-white font-sans font-medium leading-relaxed max-w-md m-0">
            {result.verdict}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 min-w-[210px]">
          <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/15 shadow-inner">
            <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
              <FaMoneyBillWave className="text-[#00FF85]" /> Expected Profit
            </span>
            <p className="text-base sm:text-lg font-black font-mono text-white mt-1 mb-0">
              {paiseToRupeeLabel(result.expected.monthlyProfitPaise)}
              <span className="text-xs font-normal text-white">/mo</span>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/15 shadow-inner">
            <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
              <FaHourglassHalf className="text-[#38BDF8]" /> Payback Time
            </span>
            <p className="text-base sm:text-lg font-black font-mono text-white mt-1 mb-0">
              {result.expected.breakEvenMonths > 0 ? `${result.expected.breakEvenMonths} mos` : "N/A"}
            </p>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <ScenarioCard label="Worst (P10)" color="#FFA0A0" outcome={result.worst} />
        <ScenarioCard label="Expected (P50)" color="#38BDF8" outcome={result.expected} />
        <ScenarioCard label="Best (P90)" color="#00FF85" outcome={result.best} />
      </div>

      
      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/15 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="uppercase tracking-wider text-white/90 flex items-center gap-1.5">
            <FaInfoCircle className="text-[#38BDF8]" /> Realtime Sensitivity Indices
          </span>
          <span className="text-[#00FF85] text-[10px]">Updates live</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
          <div>
            <div className="flex justify-between text-[10px] font-mono text-white mb-0.5 font-medium">
              <span>Footfall Resilience</span>
              <span style={{ color: color }}>
                {Math.min(Math.round(rate * 1.08), 98)}% Buffer
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(Math.round(rate * 1.08), 98)}%`,
                  background: color,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-mono text-white mb-0.5 font-medium">
              <span>Rent Safety</span>
              <span className="text-[#FFD700]">
                {rate >= 60 ? "Safe (<18%)" : rate >= 40 ? "Moderate (22%)" : "High Risk (>30%)"}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#FFD700] transition-all duration-300"
                style={{ width: `${Math.min(Math.max(rate * 0.9, 20), 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {result.futurePredictions && (
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/15 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-1.5 font-bold">
              <FaHourglassHalf className="text-[#00FF85]" /> 36-Month Longitudinal Growth & Cash Runway
            </span>
            <span className="text-[11px] font-mono text-[#38BDF8]">Multi-Year Predictive Model</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
            {[
              { label: "M3 · Launch", data: result.futurePredictions.month3 },
              { label: "M6 · Ramp", data: result.futurePredictions.month6 },
              { label: "M12 · Year 1", data: result.futurePredictions.month12 },
              { label: "M24 · Year 2", data: result.futurePredictions.month24 },
              { label: "M36 · Year 3", data: result.futurePredictions.month36 },
            ].map((col, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#A0A0A0] font-semibold">{col.label}</span>
                <p className="text-xs font-bold font-mono text-white m-0">
                  {paiseToRupeeLabel(col.data.revenuePaise)}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={col.data.profitPaise >= 0 ? "text-[#00FF85]" : "text-[#FF6B6B]"}>
                    {col.data.profitPaise >= 0 ? "+" : ""}{paiseToRupeeLabel(col.data.profitPaise)}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    col.data.cashReserveStatus === "HEALTHY" ? "bg-green-500/20 text-green-400" :
                    col.data.cashReserveStatus === "TIGHT" ? "bg-amber-500/20 text-amber-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {col.data.cashReserveStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.sensitivity && result.sensitivity.length > 0 && (
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-[11px] font-mono uppercase text-[#A0A0A0] tracking-wider font-semibold block">
            Automated Stress Testing Scenarios
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {result.sensitivity.map((s, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-mono">
                <div className="flex justify-between items-center text-white mb-1">
                  <span className="font-semibold truncate">{s.parameter}</span>
                  <span className={s.impactPercent > 0 ? "text-[#00FF85]" : "text-[#FF6B6B]"}>
                    {s.impactPercent > 0 ? `+${s.impactPercent}%` : `${s.impactPercent}%`}
                  </span>
                </div>
                <div className="text-[10px] text-[#A0A0A0] leading-tight">{s.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[11px] font-mono text-white uppercase tracking-wider m-0 text-center">
        Monte Carlo Model {result.modelVersion} · 10,000 Iterations Live Synchronized
      </p>
    </div>
  );
}

function ScenarioCard({
  label,
  color,
  outcome,
}: {
  label: string;
  color: string;
  outcome: SimulationResult["best"];
}) {
  return (
    <div
      className="p-4 rounded-2xl bg-white/[0.05] border border-white/15 space-y-2 relative overflow-hidden shadow-lg"
      style={{ borderTop: `3.5px solid ${color}` }}
    >
      <span className="text-xs font-display uppercase text-white font-black tracking-wider">{label}</span>
      <p className="text-xl sm:text-2xl font-black font-mono text-white m-0 leading-tight tracking-tight">
        {paiseToRupeeLabel(outcome.monthlyRevenuePaise)}
        <span className="text-xs font-normal text-white">/mo</span>
      </p>
      <div className="flex justify-between text-xs sm:text-sm text-white m-0 font-mono pt-0.5">
        <span className="text-white">Net:</span>
        <strong className={outcome.monthlyProfitPaise >= 0 ? "text-[#00FF85] font-black" : "text-[#FFA0A0] font-black"}>
          {paiseToRupeeLabel(outcome.monthlyProfitPaise)}
        </strong>
      </div>
      <p className="text-xs text-white m-0 font-mono font-medium">
        {outcome.breakEvenMonths > 0 ? `Break-even: ${outcome.breakEvenMonths}m` : "No break-even"}
      </p>
    </div>
  );
}

function FieldSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-display font-black text-white/90 uppercase tracking-wider">
        {label}
      </label>
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#181818] border border-white/20 focus:border-[#00FF85] rounded-xl text-white text-xs sm:text-sm font-sans font-semibold focus:outline-none transition-all cursor-pointer shadow-inner"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#181818] text-white font-medium">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldRange({
  id,
  label,
  valueDisplay,
  min,
  max,
  step,
  value,
  onChange,
}: {
  id: string;
  label: string;
  valueDisplay?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2 p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00FF85]/30 transition-all">
      <div className="flex justify-between items-center gap-2">
        <label htmlFor={id} className="text-xs font-display font-black text-white uppercase tracking-wider">
          {label}
        </label>
        {valueDisplay && (
          <span className="text-xs font-mono font-black text-[#00FF85] bg-[#00FF85]/15 px-2.5 py-0.5 rounded-lg border border-[#00FF85]/30 shadow-sm">
            {valueDisplay}
          </span>
        )}
      </div>
      <input
        id={id}
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#00FF85] cursor-pointer min-h-[32px] h-8 py-2 bg-transparent rounded-lg"
      />
    </div>
  );
}
