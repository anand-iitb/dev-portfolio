import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function Contact() {
  const { person, social } = portfolio;

  return (
    <section
      id="contact"
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-28 md:py-40"
    >
      <ScrollReveal>
        <p className="label mb-10">06 — Contact</p>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <h2 className="display text-[clamp(2.6rem,10vw,8rem)]">
          Let&apos;s build
          <br />
          something great.
        </h2>
      </ScrollReveal>
      <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <MagneticButton
          href={`mailto:${person.email}`}
          className="label w-fit border border-accent bg-accent px-7 py-4 text-bg"
        >
          Get in touch
          <ArrowUpRight size={14} />
        </MagneticButton>
        <ul className="flex flex-col gap-3">
          <li>
            <a className="link-line text-lg" href={person.resume}>
              Resume
            </a>
          </li>
          <li>
            <a className="link-line text-lg" href={`mailto:${person.email}`}>
              {person.email}
            </a>
          </li>
          <li>
            <a className="link-line text-lg" href={social.linkedin.href}>
              {social.linkedin.label}
            </a>
          </li>
          <li>
            <a className="link-line text-lg" href={social.github.href}>
              {social.github.label}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
