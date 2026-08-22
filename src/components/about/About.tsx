"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/use-media";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function About() {
  const { about } = portfolio;
  const words = about.editorial.split(" ");
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const spans = root.querySelectorAll("span");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { opacity: 0.18, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="about"
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-28 md:py-36"
    >
      <ScrollReveal>
        <p className="label mb-10">01 — About</p>
      </ScrollReveal>
      <p
        ref={ref}
        className="display text-[clamp(1.7rem,4.4vw,4.2rem)] leading-[1.05] text-text"
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={reduced ? "opacity-100" : "inline-block opacity-[0.18]"}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </p>
      <div className="mt-20 grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <p className="label text-accent">Background & Philosophy</p>
        </div>
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-text/95 md:text-xl">
            {about.bio}
          </p>
          <div className="space-y-4 pt-2 text-base leading-relaxed text-muted">
            {about.more.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
