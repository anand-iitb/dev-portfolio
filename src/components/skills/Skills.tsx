import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ScrubText } from "@/components/animations/ScrubText";
import { TechIcon } from "@/components/ui/TechIcon";

export function Skills() {
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-24 md:py-32">
      <ScrubText text="Technical Skills" className="label mb-14" />

      <div className="grid gap-12 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {portfolio.skills.map((group, i) => (
          <ScrollReveal key={group.id} delay={i * 0.06}>
            <ScrubText text={group.label} className="label mb-6 text-accent" />
            <ul className="space-y-3">
              {group.items.map((item) => {
                const content = (
                  <>
                    {item.icon ? <TechIcon slug={item.icon} title={item.name} /> : null}
                    <span>{item.name}</span>
                  </>
                );
                return (
                  <li key={item.name}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="display inline-flex items-center gap-2.5 text-[clamp(1.2rem,1.8vw,1.7rem)] text-text transition-opacity duration-300 hover:opacity-70"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="display inline-flex items-center gap-2.5 text-[clamp(1.2rem,1.8vw,1.7rem)] text-text">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
