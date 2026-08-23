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

    const animateIn = () => {
      gsap.fromTo(
        el,
        { x: -64, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          delay,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      end: "bottom 10%",
      onEnter: animateIn,
      onEnterBack: animateIn,
    });

    return () => {
      st.kill();
    };
  }, [delay, reduced]);




  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={ref} className={reduced ? "" : "opacity-0"}>
        {children}
      </div>
    </div>
  );
}
