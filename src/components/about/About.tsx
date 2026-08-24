"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ScrubText } from "@/components/animations/ScrubText";

export function About() {
  const { about } = portfolio;
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-28 md:py-36"
    >
      <ScrubText text="About" className="label mb-14" />

      <div className="border-t border-border pt-10">
        <ScrubText
          text={about.editorial}
          className="display text-[clamp(1.7rem,4.4vw,4.2rem)] leading-[1.05] text-text"
        />

        <div className="mt-20 grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <ScrubText text="Background" className="label text-accent" />

          <div className="space-y-6">
            <ScrubText
              text={about.bio}
              className="text-lg leading-relaxed text-text/95 md:text-xl"
            />

            {expanded ? (
              <div className="space-y-4 pt-2">
                {about.more.map((paragraph) => (
                  <ScrubText
                    key={paragraph}
                    text={paragraph}
                    className="text-base leading-relaxed text-muted"
                  />
                ))}
              </div>
            ) : null}

            <ScrollReveal>
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="label inline-flex items-center gap-2 border border-border bg-bg-elevated px-4 py-2.5 text-text transition-all hover:border-accent hover:text-accent cursor-pointer rounded-sm"
              >
                {expanded ? "Show less" : "More about me"}
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
