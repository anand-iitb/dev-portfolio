"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/use-media";
import { cn } from "@/lib/cn";

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { x: -72, opacity: 0, clipPath: "inset(0 18% 0 0)" },
        {
          x: 0,
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.15,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, reduced]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={ref} className={reduced ? "" : "opacity-0"}>
        {children}
      </div>
    </div>
  );
}
