"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Unable to reset password.");
        return;
      }

      setSuccess("Password has been reset. You can now log in.");
      
      setPassword("");
      setConfirmPassword("");
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
        <p>This password reset link is invalid or has expired.</p>
        <Button onClick={() => router.push("/login")}>
          Go to Login
        </Button>
      </Card>
    );
  }

  return (
    <Card style={{ width: 380 }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 24, marginTop: 0 }}>
        Reset Password
      </h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input
          id="password"
          label="New Password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p style={{ color: "var(--red)", fontSize: 13 }}>{error}</p>}
        {success && <p style={{ color: "var(--green)", fontSize: 13 }}>{success}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Resetting…" : "Reset Password"}
        </Button>
      </form>
    </Card>
  );
}