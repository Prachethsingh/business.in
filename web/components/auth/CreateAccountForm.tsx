"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";
import { FaCompass, FaLock, FaEnvelope, FaUser, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

export function CreateAccountForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  const hasMinLength = password.length >= 8;
  const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    if (!hasMinLength) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await authClient.signUp.email({
        email: email.trim().toLowerCase(),
        password,
        name: name.trim() || email.split("@")[0] || "User",
        callbackURL: "/dashboard",
      });

      if (res.error) {
        setError(res.error.message || "Registration failed. Please check your details and try again.");
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 800);
    } catch {
      setError("Network or authentication error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Container Card */}
      <div className="glass rounded-3xl p-8 sm:p-10 relative overflow-hidden border border-white/10 shadow-2xl backdrop-blur-2xl bg-[#121212]/90">
        {/* Subtle Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#00FF85" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#1E90FF" }}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4 text-decoration-none group">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#00FF85]/20 to-[#1E90FF]/20 border border-[#00FF85]/30 group-hover:scale-105 transition-all">
              <FaCompass className="text-[#00FF85] text-xl" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
            Create New Account
          </h1>
          <p className="text-sm text-[#A0A0A0] mt-2 font-sans">
            Start evaluating Bengaluru business locations with AI simulations
          </p>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm animate-fade-in">
            <FaExclamationCircle className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3.5 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3 text-green-400 text-sm animate-fade-in">
            <FaCheckCircle className="flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2 font-mono">
              Full Name <span className="text-white/40 normal-case">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7C7C7C]">
                <FaUser size={14} />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-10 pr-4 py-3 bg-[#181818] border border-white/10 rounded-xl text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2 font-mono">
              Email Address <span className="text-[#00FF85]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7C7C7C]">
                <FaEnvelope size={14} />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@business.com"
                className="w-full pl-10 pr-4 py-3 bg-[#181818] border border-white/10 rounded-xl text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2 font-mono">
              Password <span className="text-[#00FF85]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7C7C7C]">
                <FaLock size={14} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full pl-10 pr-11 py-3 bg-[#181818] border border-white/10 rounded-xl text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7C7C7C] hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>

            {/* Password Criteria Hints */}
            {password.length > 0 && (
              <div className="mt-2 flex items-center gap-4 text-xs font-mono text-[#A0A0A0]">
                <span className={`flex items-center gap-1 ${hasMinLength ? "text-[#00FF85]" : "text-[#7C7C7C]"}`}>
                  ✓ 8+ chars
                </span>
                <span className={`flex items-center gap-1 ${hasNumberOrSymbol ? "text-[#00FF85]" : "text-[#7C7C7C]"}`}>
                  ✓ Number/symbol
                </span>
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 text-xs text-[#A0A0A0] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#181818] text-[#00FF85] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>
                I agree to the{" "}
                <span className="text-white hover:underline">Terms of Service</span> and{" "}
                <span className="text-white hover:underline">Privacy Policy</span>.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <GlowButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </GlowButton>
          </div>
        </form>

        {/* Footer / Login Link */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-[#A0A0A0] relative z-10">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#00FF85] font-semibold hover:text-[#00FF85]/80 hover:underline transition-colors ml-1"
          >
            Sign In
          </Link>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-xs text-[#7C7C7C] hover:text-white transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
