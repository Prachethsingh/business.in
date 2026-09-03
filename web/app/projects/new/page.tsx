"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BUSINESS_TYPES, type BusinessTypeKey } from "@/lib/simulator/data";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessTypeKey>(BUSINESS_TYPES[0]!.key);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, businessType, city: "Bengaluru" }),
      });
      if (!res.ok) {
        setError("Could not create project.");
        return;
      }
      const data = await res.json();
      router.push(`/projects/${data.project.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page" style={{ maxWidth: 480 }}>
      <Card>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 22, marginTop: 0 }}>New Project</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input id="name" label="Project Name" required value={name} onChange={(e) => setName(e.target.value)} />
          <div>
            <label htmlFor="businessType" style={{ display: "block", fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>
              Business Type
            </label>
            <select
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value as BusinessTypeKey)}
              style={{
                width: "100%",
                minHeight: 44,
                background: "var(--paper-2)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text)",
                padding: "10px 14px",
              }}
            >
              {BUSINESS_TYPES.map((b) => (
                <option key={b.key} value={b.key}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          {error && <p style={{ color: "var(--red)", fontSize: 13 }}>{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create Project"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
