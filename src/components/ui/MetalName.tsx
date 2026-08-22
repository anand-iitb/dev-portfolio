"use client";

import { useEffect, useRef } from "react";

export function MetalName({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = useRef(72);
  const current = useRef(72);
  const raf = useRef(0);

  useEffect(() => {
    const tick = () => {
      current.current += (target.current - current.current) * 0.12;
      ref.current?.style.setProperty("--shine", `${current.current}%`);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <span
      ref={ref}
      className={`metal-name ${className}`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        target.current = ((event.clientX - rect.left) / rect.width) * 100;
      }}
      onMouseLeave={() => {
        target.current = 72;
      }}
    >
      {children}
    </span>
  );
}
