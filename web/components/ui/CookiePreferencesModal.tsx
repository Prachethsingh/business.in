"use client";

import { useState, useEffect } from "react";
import { FaCookieBite, FaTimes, FaCheck, FaShieldAlt, FaChartBar, FaSlidersH } from "react-icons/fa";

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
}

const DEFAULT_SETTINGS: CookieSettings = {
  essential: true,
  analytics: true,
  preferences: true,
};

export function CookiePreferencesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(DEFAULT_SETTINGS);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("biz_cookie_preferences");
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }

    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-cookie-preferences", handleOpen);
    return () => window.removeEventListener("open-cookie-preferences", handleOpen);
  }, []);

  const saveSettings = (newSettings: CookieSettings) => {
    try {
      localStorage.setItem("biz_cookie_preferences", JSON.stringify(newSettings));
    } catch {
      // Ignore
    }
    setSettings(newSettings);
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      setIsOpen(false);
    }, 700);
  };

  const handleAcceptAll = () => {
    saveSettings({ essential: true, analytics: true, preferences: true });
  };

  const handleSaveCurrent = () => {
    saveSettings(settings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#0F172A] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00FF85]/15 border border-[#00FF85]/30 flex items-center justify-center text-[#00FF85]">
              <FaCookieBite size={20} />
            </div>
            <div>
              <h2 id="cookie-modal-title" className="text-xl font-bold font-serif text-white m-0">
                Cookie Preferences
              </h2>
              <p className="text-xs text-slate-100 font-mono m-0">
                Manage how BUSINESS.IN stores data in your browser
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-[#00FF85] p-1 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* Essential */}
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-[#00FF85] text-sm" />
                <span className="font-bold text-sm text-white">Strictly Necessary Cookies</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#00FF85]/20 text-[#00FF85]">
                  Required
                </span>
              </div>
              <p className="text-xs text-slate-100 leading-relaxed m-0">
                Required for core platform security, user authentication sessions, and CSRF protection. Cannot be disabled.
              </p>
            </div>
            <input
              type="checkbox"
              checked={true}
              disabled
              className="accent-[#00FF85] w-5 h-5 rounded cursor-not-allowed opacity-80 mt-1"
            />
          </div>

          {/* Analytics */}
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FaChartBar className="text-[#38BDF8] text-sm" />
                <span className="font-bold text-sm text-white">Analytics & Performance</span>
              </div>
              <p className="text-xs text-slate-100 leading-relaxed m-0">
                Anonymously tracks location simulation compute latency, error rates, and user flow to improve algorithmic accuracy.
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.analytics}
              onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
              className="accent-[#00FF85] w-5 h-5 rounded cursor-pointer mt-1"
            />
          </div>

          {/* Preferences */}
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FaSlidersH className="text-[#FFD700] text-sm" />
                <span className="font-bold text-sm text-white">Functional Preferences</span>
              </div>
              <p className="text-xs text-slate-100 leading-relaxed m-0">
                Remembers your preferred simulation catchment radius, commercial corridor filters, and report formatting choices.
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.preferences}
              onChange={(e) => setSettings({ ...settings, preferences: e.target.checked })}
              className="accent-[#00FF85] w-5 h-5 rounded cursor-pointer mt-1"
            />
          </div>
        </div>

        {savedMessage && (
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#00FF85] bg-[#00FF85]/10 py-2 rounded-xl border border-[#00FF85]/30">
            <FaCheck size={12} /> Preferences saved successfully
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={handleSaveCurrent}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-white font-mono text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            Save Preferences
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00FF85] text-black font-mono text-xs font-bold hover:bg-[#00FF85]/90 transition-all shadow-lg"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
  }
}
