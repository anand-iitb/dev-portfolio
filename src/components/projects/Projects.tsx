"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/use-media";

export function Projects() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const pinEl = pin.current;
    const trackEl = track.current;
    if (!pinEl || !trackEl) return;

    const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-card]"));

    const setActive = (index: number) => {
      cards.forEach((card, i) => {
        const on = i === index;
        card.dataset.active = on ? "true" : "false";
      });
    };

    if (reduced) {
      setActive(0);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const distance = () =>
        Math.max(0, trackEl.scrollWidth - pinEl.clientWidth);

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: () => `+=${distance() * 1.85 + window.innerHeight}`,
          pin: true,
          scrub: 1.35,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const mid = pinEl.getBoundingClientRect().left + pinEl.clientWidth * 0.36;
            let best = 0;
            let bestDist = Number.POSITIVE_INFINITY;
            cards.forEach((card, i) => {
              const r = card.getBoundingClientRect();
              const center = r.left + r.width / 2;
              const d = Math.abs(center - mid);
              if (d < bestDist) {
                bestDist = d;
                best = i;
              }
            });
            setActive(best);
          },
        },
      });
      setActive(0);
    }, pinEl);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="work" className="py-24 md:py-32">
      <p className="label mx-auto mb-10 max-w-[1440px] px-[var(--page-pad)]">
        05 — Selected work
      </p>
      <div
        ref={pin}
        className="flex min-h-svh items-center overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={track}
          className="flex w-max items-center gap-8 px-[var(--page-pad)] py-10 will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {portfolio.projects.map((project) => (
            <article
              key={project.slug}
              data-card
              data-active="false"
              className="project-card flex w-[min(78vw,32rem)] shrink-0 flex-col justify-between border border-border bg-bg-elevated p-7 md:h-[30rem] md:p-10"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="label text-accent">{project.index}</p>
                  <p className="label">{project.year}</p>
                </div>
                <h2 className="display mt-8 text-[clamp(1.8rem,4vw,3.2rem)]">
                  {project.title}
                </h2>
                <p className="label mt-3">{project.category}</p>
              </div>
              <div>
                <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {project.description}
                </p>
                <p className="label mt-8">{project.technologies.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
