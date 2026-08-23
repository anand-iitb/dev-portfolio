"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const spans = root.querySelectorAll(".word-reveal");
    const ctx = gsap.context(() => {
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
            end: "bottom 45%",
            scrub: 0.5,
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
        <p className="label mb-10">About</p>
      </ScrollReveal>

      {/* Editorial Scrub-Revealed Headline */}
      <p
        ref={ref}
        className="display text-[clamp(1.7rem,4.4vw,4.2rem)] leading-[1.05] text-text"
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

      </p>

      {/* Bio & Expandable More About Me */}
      <div className="mt-20 grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <p className="label text-accent">Background & Philosophy</p>
        </div>

        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-text/95 md:text-xl">
            {about.bio}
          </p>

          {/* Expandable Section */}
          {expanded && (
            <div className="space-y-4 pt-2 text-base leading-relaxed text-muted animate-in fade-in duration-300">
              {about.more.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="label inline-flex items-center gap-2 border border-border bg-bg-elevated px-4 py-2.5 text-text transition-all hover:border-accent hover:text-accent cursor-pointer rounded-sm"
            >
              {expanded ? "Show less" : "More about me"}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

