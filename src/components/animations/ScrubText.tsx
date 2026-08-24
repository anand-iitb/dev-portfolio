"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/use-media";
import { cn } from "@/lib/cn";

export function ScrubText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
}: {
  text: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span";
  className?: string;
  delay?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  useEffect(() => {
    const wrap = wrapRef.current;
    const root = textRef.current;
    if (!wrap || !root || reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { x: -64, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          delay,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: wrap,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const spans = root.querySelectorAll(".word-reveal");
      gsap.fromTo(
        spans,
        { opacity: 0.18, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            end: "bottom 42%",
            scrub: 0.5,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [delay, reduced, text]);

  return (
    <div className="overflow-hidden">
      <div ref={wrapRef} className={reduced ? "" : "opacity-0"}>
        <Tag
          ref={textRef as never}
          className={cn(className)}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={`word-reveal inline-block ${
                reduced ? "opacity-100" : "opacity-[0.18]"
              }`}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </Tag>
      </div>
    </div>
  );
}
