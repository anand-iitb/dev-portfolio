import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function Contact() {
  const { person } = portfolio;

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-28 md:py-40"
    >
      <ScrollReveal>
        <p className="label mb-10">Contact</p>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <h2 className="display text-[clamp(2.6rem,10vw,8rem)]">
          Let&apos;s build
          <br />
          something great.
        </h2>
      </ScrollReveal>
      <div className="mt-14">
        <ScrollReveal delay={0.16}>
          <MagneticButton
            href={`mailto:${person.email}`}
            className="btn-slant-sweep label inline-flex items-center gap-3 border border-text bg-text px-9 py-4 text-bg font-medium tracking-widest uppercase transition-all duration-300"
          >
            Get in touch
            <ArrowUpRight size={15} />
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}

