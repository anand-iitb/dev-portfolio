import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TechIcon } from "@/components/ui/TechIcon";

export function Education() {
  return (
    <section
      id="education"
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-24 md:py-32"
    >
      <ScrollReveal>
        <p className="label mb-14">04 — Education</p>
      </ScrollReveal>
      <div className="border-t border-border">
        {portfolio.education.map((edu) => (
          <ScrollReveal key={edu.id}>
            <article className="grid gap-2 border-b border-border py-8 md:grid-cols-[9.5rem_1fr] md:gap-16">
              <p className="label pt-1 text-accent">{edu.year}</p>
              <div>
                <h2 className="display flex items-center gap-3 text-[clamp(1.5rem,3vw,2.6rem)]">
                  <TechIcon slug={edu.id} title={edu.school} className="h-7 w-7 shrink-0 text-accent" />
                  <a
                    href={edu.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity duration-300 hover:opacity-70"
                  >
                    {edu.school}
                  </a>
                </h2>
                <p className="mt-3 text-muted">
                  {edu.degree} · {edu.field}
                </p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal>
        <p className="label mt-20 mb-10">Recognition</p>
      </ScrollReveal>
      <ol className="border-t border-border">
        {portfolio.achievements.map((item, i) => (
          <li key={item.title}>
            <ScrollReveal delay={i * 0.03}>
              <article className="group grid gap-3 border-b border-border py-8 md:grid-cols-[9.5rem_minmax(0,1.2fr)_minmax(0,1.6fr)] md:items-baseline md:gap-10">
                <p className="label text-accent">{item.year}</p>
                <h3 className="display text-[clamp(1.35rem,2.4vw,2rem)] text-text">
                  {item.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
                  {item.detail}
                </p>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
