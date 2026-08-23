"use client";

import { useEffect, useState } from "react";

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visits")
      .then((res) => res.json())
      .then((data: { count?: number }) => {
        if (!cancelled && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {
        if (!cancelled) setCount(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-bg-elevated/70 px-3.5 py-1.5 backdrop-blur-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
      <span className="label tabular-nums text-text/90">
        Visits {count !== null ? String(count).padStart(5, "0") : "•••••"}
      </span>
    </div>
  );
}

