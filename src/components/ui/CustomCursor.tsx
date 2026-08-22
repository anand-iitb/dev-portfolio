"use client";

import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { useCursor } from "@/components/ui/cursor-context";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/use-media";

export function CustomCursor() {
  const { label } = useCursor();
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (touch || reduced) return;

    document.documentElement.classList.add("cursor-custom");

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const el = root.current;
      if (!el) return;
      el.style.opacity = "1";
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      document.documentElement.classList.remove("cursor-custom");
      window.removeEventListener("pointermove", onMove);
    };
  }, [touch, reduced]);

  if (touch || reduced) return null;

  const expanded = Boolean(label) && label !== "heart";
  const heart = label === "heart";

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ opacity: 0 }}
    >
      <div
        className={`relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-[width,height,background,border-radius,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          heart
            ? "h-8 w-8 text-accent"
            : expanded
              ? "h-16 w-16 rounded-full bg-accent text-[10px] font-medium tracking-[0.14em] text-bg uppercase"
              : "h-2.5 w-2.5 rounded-full bg-text"
        }`}
      >
        {heart ? <Heart size={16} className="fill-accent" /> : null}
        {expanded ? (
          <span className="px-2 text-center whitespace-pre-line">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
