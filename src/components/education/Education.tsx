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
        <p className="label mb-14">Education</p>
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
    </section>
  );
}
