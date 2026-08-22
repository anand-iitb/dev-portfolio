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
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.4,
            },
          },
        );
      }

      section.querySelectorAll<HTMLElement>("[data-exp]").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          end: "bottom 48%",
          onEnter: () => item.setAttribute("data-active", "true"),
          onEnterBack: () => item.setAttribute("data-active", "true"),
          onLeave: () => item.setAttribute("data-active", "false"),
          onLeaveBack: () => item.setAttribute("data-active", "false"),
        });
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="experience"
      ref={root}
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-24 md:py-32"
    >
      <ScrollReveal>
        <p className="label mb-14">03 — Experience</p>
      </ScrollReveal>
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-0 w-px bg-border md:left-[8.5rem]" />
        <div
          ref={line}
          className="absolute top-0 left-0 h-full w-px origin-top bg-accent md:left-[8.5rem]"
          style={{ transform: reduced ? "scaleY(1)" : "scaleY(0)" }}
        />
        <ol className="space-y-16 md:space-y-24">
          {portfolio.experience.map((job) => (
            <li
              key={job.id}
              data-exp
              data-active={reduced ? "true" : "false"}
              className="grid gap-4 pl-8 transition-opacity duration-500 md:grid-cols-[8.5rem_1fr] md:gap-16 md:pl-16 data-[active=false]:opacity-35 data-[active=true]:opacity-100"
            >
              <p className="label pt-1 text-accent">{job.year}</p>
              <div>
                <ScrollReveal>
                  <h2 className="display text-3xl md:text-5xl">{job.role}</h2>
                </ScrollReveal>
                <p className="mt-3 flex items-center gap-2 text-muted">
                  <TechIcon slug={job.id} title={job.company} className="h-4 w-4 shrink-0 text-accent" />
                  <span>{job.company} · {job.location}</span>
                </p>
                <p className="mt-5 max-w-2xl leading-relaxed text-text/85">
                  {job.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
