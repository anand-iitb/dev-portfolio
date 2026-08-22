import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function Recognition() {
  return (
    <section
      id="recognition"
      className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-24 md:py-32"
    >
      <ScrollReveal>
        <p className="label mb-14">06 — Recognition & Honors</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolio.achievements.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.04}>
            <article className="flex min-h-[14rem] flex-col justify-between rounded-sm border border-border bg-bg-elevated p-7 transition-all duration-300 hover:border-accent hover:shadow-[0_12px_36px_rgb(0,0,0,0.25)] md:p-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="label text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="label">{item.year}</p>
                </div>
                <h3 className="display mt-6 text-xl tracking-tight text-text md:text-2xl">
                  {item.title}
                </h3>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
