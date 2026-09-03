import { CreateAccountForm } from "@/components/auth/CreateAccountForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Account — BUSINESS.IN",
  description: "Create an account to start simulating and optimizing business locations across Bengaluru.",
  alternates: {
    canonical: "/register",
  },
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0A] overflow-hidden">
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,255,133,0.3) 1px, transparent 1px)`,
            backgroundSize: "46px 46px",
          }}
        />
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <div className="relative z-10 w-full py-8">
        <CreateAccountForm />
      </div>
    </main>
  );
}
