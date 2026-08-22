"use client";

import { useEffect, useState } from "react";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"up" | "cover" | "down">("up");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      const t = window.setTimeout(onDone, 80);
      return () => window.clearTimeout(t);
    }

    const cover = window.setTimeout(() => setPhase("cover"), 40);
    const start = performance.now();
    const length = 880;
    let frame = 0;
    let finished = false;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / length);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!finished) {
        finished = true;
        setPhase("down");
        window.setTimeout(onDone, 950);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(cover);
      cancelAnimationFrame(frame);
    };
  }, [onDone]);

  const y = phase === "up" ? "-100%" : phase === "cover" ? "0%" : "100%";

  return (
    <div
      className="fixed inset-0 z-[90] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        className="absolute inset-0 bg-bg"
        style={{
          transform: `translate3d(0, ${y}, 0)`,
          transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
      <div
        className="relative z-10 flex h-full items-end justify-between px-[var(--page-pad)] py-10"
        style={{
          opacity: phase === "down" ? 0 : 1,
          transition: "opacity 0.35s ease",
        }}
      >
        <p className="display text-[clamp(3rem,8vw,6rem)] text-text">AK</p>
        <p className="font-mono text-4xl tracking-tight tabular-nums text-muted md:text-6xl">
          {String(progress).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
