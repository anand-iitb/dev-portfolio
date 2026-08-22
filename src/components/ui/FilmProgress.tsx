"use client";

import { useEffect, useState } from "react";

const FRAMES = 24;

export function FilmProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max <= 0 ? 0 : Math.min(1, window.scrollY / max);
      setActive(Math.round(p * (FRAMES - 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[76] h-3"
      aria-hidden
    >
      <div className="film-strip flex h-full items-stretch">
        {Array.from({ length: FRAMES }).map((_, i) => (
          <span
            key={i}
            className={`relative flex-1 border-r border-bg last:border-r-0 ${
              i <= active ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
