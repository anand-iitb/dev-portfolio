"use client";

import { useCallback, useRef, useState } from "react";

export function MetalName({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const triggerChar = useCallback((index: number) => {
    setActiveIndices((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    if (timeoutRefs.current.has(index)) {
      clearTimeout(timeoutRefs.current.get(index)!);
    }

    const timer = setTimeout(() => {
      setActiveIndices((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
      timeoutRefs.current.delete(index);
    }, 1000);

    timeoutRefs.current.set(index, timer);
  }, []);

  const triggerWave = useCallback(() => {
    const chars = children.split("");
    chars.forEach((_, i) => {
      setTimeout(() => {
        triggerChar(i);
      }, i * 50);
    });
  }, [children, triggerChar]);

  const handleTouchMove = (e: React.TouchEvent<HTMLSpanElement>) => {
    const touch = e.touches[0];
    if (!touch || !containerRef.current) return;
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    elements.forEach((el) => {
      const charIndex = el.getAttribute("data-char-index");
      if (charIndex !== null) {
        triggerChar(parseInt(charIndex, 10));
      }
    });
  };

  return (
    <span
      ref={containerRef}
      className={`inline-block select-none ${className}`}
      style={{ perspective: "1200px" }}
      onTouchStart={triggerWave}
      onTouchMove={handleTouchMove}
    >
      {children.split("").map((char, i) => {
        const isActive = activeIndices.has(i);
        return (
          <span
            key={i}
            data-char-index={i}
            onMouseEnter={() => triggerChar(i)}
            onClick={() => triggerChar(i)}
            className="inline-block transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer select-none origin-center text-text hover:text-accent"
            style={{
              transform: isActive
                ? "rotateY(360deg) scale(1.08) translateZ(12px)"
                : "rotateY(0deg) scale(1) translateZ(0px)",
              color: isActive ? "var(--accent)" : undefined,
              textShadow: isActive ? "0 0 16px var(--accent-dim)" : undefined,
              transformStyle: "preserve-3d",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}

