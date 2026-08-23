"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/use-media";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TechIcon } from "@/components/ui/TechIcon";

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = root.current;
    if (!section || reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (line.current) {
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.4,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="experience"
      ref={root}
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-24 md:py-36"
    >
      <ScrollReveal>
        <p className="label mb-14">Experience</p>
      </ScrollReveal>

      <div className="relative pl-6 md:pl-0">
        {/* Timeline Line */}
        <div className="absolute top-0 bottom-0 left-0 w-px bg-border md:left-[11rem]" />
        <div
          ref={line}
          className="absolute top-0 left-0 h-full w-px origin-top bg-accent md:left-[11rem]"
          style={{ transform: reduced ? "scaleY(1)" : "scaleY(0)" }}
        />

        <div className="space-y-14 md:space-y-20">
          {portfolio.experience.map((job) => (
            <ScrollReveal key={job.id}>
              <article className="relative grid gap-4 md:grid-cols-[11rem_1fr] md:gap-14 items-start">
                {/* Timeline Dot on line */}
                <div className="hidden md:block absolute left-[11rem] top-2 -translate-x-1/2 h-2.5 w-2.5 rounded-full border border-accent bg-bg" />

                {/* Date on Left (Desktop) / Top (Mobile) */}
                <div className="md:text-right md:pr-10">
                  <span className="label text-accent text-[0.7rem] tracking-wider block">
                    {job.year}
                  </span>
                </div>

                {/* Details on Right */}
                <div className="space-y-3">
                  <h3 className="display text-2xl md:text-4xl text-text">
                    {job.role}
                  </h3>

                  <p className="flex items-center gap-2 text-muted text-sm md:text-base">
                    <TechIcon slug={job.id} title={job.company} className="h-4 w-4 shrink-0 text-accent" />
                    <span className="font-medium text-text/90">{job.company}</span>
                    <span className="text-muted/60">·</span>
                    <span>{job.location}</span>
                  </p>

                  <p className="max-w-3xl leading-relaxed text-text/85 text-sm md:text-base pt-2">
                    {job.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

