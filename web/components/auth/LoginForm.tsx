"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";
import { FaCompass, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
        callbackURL: next,
      });

      if (res.error) {
        setError(res.error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setError("Unable to sign in. Please check your connection.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      
      <div className="glass rounded-3xl p-8 sm:p-10 relative overflow-hidden border border-white/10 shadow-2xl backdrop-blur-2xl bg-[#121212]/90">
        
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#1E90FF" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#00FF85" }}
          aria-hidden="true"
        />

        
        <div className="text-center mb-8 relative z-10">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4 text-decoration-none group">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#00FF85]/20 to-[#1E90FF]/20 border border-[#00FF85]/30 group-hover:scale-105 transition-all">
              <FaCompass className="text-[#00FF85] text-xl" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
            Welcome Back
          </h1>
          <p className="text-sm text-[#A0A0A0] mt-2 font-sans">
            Sign in to access your business location simulations
          </p>
        </div>

        
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm animate-fade-in">
            <FaExclamationCircle className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2 font-mono">
              Email Address
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

          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] font-mono">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#00FF85] hover:text-[#00FF85]/80 hover:underline transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7C7C7C]">
                <FaLock size={14} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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
          </div>

          
          <div className="pt-2">
            <GlowButton
              id="login"
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </GlowButton>
          </div>
        </form>

        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-[#A0A0A0] relative z-10">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#00FF85] font-semibold hover:text-[#00FF85]/80 hover:underline transition-colors ml-1"
          >
            Create New Account
          </Link>
        </div>

        
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
