"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface VerifyEmailFormProps {
  token: string;
}

export default function VerifyEmailForm({ token }: VerifyEmailFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function verify() {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Invalid or expired token.");
        return;
      }
      setSuccess("Email verified successfully! You can now access all features.");
      
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <Card style={{ width: 380 }}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 24, marginTop: 0 }}>
          Invalid Link
        </h1>
        <p>This verification link is missing or invalid.</p>
        <Button onClick={() => router.push("/login")}>
          Go to Login
        </Button>
      </Card>
    );
  }

  return (
    <Card style={{ width: 380 }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 24, marginTop: 0 }}>
        Verify Email
      </h1>
      <p>
        We&apos;ve sent a verification link to your email. Please click the button below to verify.
      </p>
      {error && <p style={{ color: "var(--red)", fontSize: 13 }}>{error}</p>}
      {success && <p style={{ color: "var(--green)", fontSize: 13 }}>{success}</p>}
      <Button onClick={verify} disabled={loading}>
        {loading ? "Verifying&hellip;" : "Verify Email"}
      </Button>
      <p style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
        Didn&apos;t receive the email? <a href="/forgot-password" className="underline">Request a new verification link</a>
      </p>
    </Card>
  );
}