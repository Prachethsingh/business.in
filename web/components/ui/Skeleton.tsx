"use client";

import React from "react";

type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
};

export function Skeleton({ className = "", style, label = "Loading content..." }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label}
      aria-hidden="true"
      style={style}
      className={`skeleton rounded-xl ${className}`}
    />
  );
}

export function SkeletonText({ className = "", lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div className={`space-y-2.5 ${className}`} role="status" aria-label="Loading text...">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-3/5" : i === 0 ? "w-full" : "w-5/6"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return (
    <Skeleton
      className="rounded-full flex-shrink-0"
      style={{ width: `${size}px`, height: `${size}px` } as React.CSSProperties}
    />
  );
}

export function SkeletonButton({ className = "w-32 h-10" }: { className?: string }) {
  return <Skeleton className={`rounded-xl ${className}`} />;
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`glass rounded-2xl p-6 border border-white/10 space-y-4 ${className}`}
      aria-busy="true"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="pt-2 flex justify-between items-center">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonMetric() {
  return (
    <div className="glass rounded-2xl p-5 border border-white/10 space-y-3" aria-busy="true">
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="w-4 h-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function SkeletonChart({ height = 280 }: { height?: number }) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/10 space-y-4" aria-busy="true">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="w-full rounded-xl" style={{ height: `${height}px` } as React.CSSProperties} />
      <div className="flex justify-between gap-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function SkeletonMap({ height = 400 }: { height?: number }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden glass border border-white/10 flex items-center justify-center"
      style={{ height: `${height}px` }}
      aria-busy="true"
      aria-label="Loading interactive map..."
    >
      <Skeleton className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex flex-col items-center gap-2 p-4 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#00FF85] border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-white font-semibold">Loading Map Layers & Catchment Radii...</span>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden" aria-busy="true">
      <div className="p-4 bg-white/5 border-b border-white/10 grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-3/4" />
        ))}
      </div>
      <div className="divide-y divide-white/5">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-4 grid items-center" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-4 w-2/3" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in" aria-busy="true" aria-label="Loading dashboard...">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <SkeletonButton className="h-11 w-40" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonMetric key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkeletonChart height={320} />
        </div>
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
