"use client";

import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MetalName } from "@/components/ui/MetalName";

export function Hero() {
  const { person } = portfolio;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end px-[var(--page-pad)] pt-28 pb-16"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <ScrollReveal>
          <p className="label mb-6">Hello, I&apos;m</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h1 className="display text-[clamp(3.4rem,12vw,9.5rem)]">
            <MetalName className="block">{person.firstName}</MetalName>
            <MetalName className="block">{person.lastName}</MetalName>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="mt-8 max-w-xl text-lg text-text md:text-xl">{person.role}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.22}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {person.statement}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.28}>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <MagneticButton
              href="#work"
              className="label border border-border bg-text px-6 py-3 text-bg"
            >
              View my work
              <ArrowUpRight size={14} />
            </MagneticButton>
            <MagneticButton href="#contact" className="label link-line text-text">
              Contact me
            </MagneticButton>
            <MagneticButton
              href={person.resume}
              className="label link-line text-text"
              ariaLabel="Download resume"
            >
              Resume
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
