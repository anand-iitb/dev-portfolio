"use client";

import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ScrubText } from "@/components/animations/ScrubText";
import { MetalName } from "@/components/ui/MetalName";

export function Hero() {
  const { person } = portfolio;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end px-[var(--page-pad)] pt-28 pb-16"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <ScrubText text="Hello, I'm" className="label mb-6" />

        <ScrollReveal delay={0.08}>
          <h1 className="display text-[clamp(3.4rem,12vw,9.5rem)]">
            <MetalName className="block" autoWaveDelay={600}>
              {person.firstName}
            </MetalName>
            <MetalName className="block" autoWaveDelay={1050}>
              {person.lastName}
            </MetalName>
          </h1>
        </ScrollReveal>

        <ScrubText
          delay={0.16}
          text={person.role}
          className="mt-8 max-w-xl text-lg text-text md:text-xl"
        />

        <ScrubText
          delay={0.22}
          text={person.statement}
          className="mt-4 max-w-xl text-base leading-relaxed text-muted"
        />

        <ScrollReveal delay={0.28}>
          <div className="mt-10 flex items-center">
            <MagneticButton
              href="#work"
              className="btn-slant-sweep label border border-text bg-text px-8 py-4 text-bg font-medium tracking-widest uppercase transition-all duration-300"
            >
              Explore Projects
              <ArrowUpRight size={15} />
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
