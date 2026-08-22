"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/use-media";

export function Projects() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const pinEl = pin.current;
    const trackEl = track.current;
    if (!pinEl || !trackEl) return;

    const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-card]"));

    const setActive = (index: number) => {
      cards.forEach((card, i) => {
        card.dataset.active = i === index ? "true" : "false";
      });
      setCurrentIndex(index);
    };

    if (reduced) {
      setActive(0);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, trackEl.scrollWidth - window.innerWidth + 80);

      const tween = gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          id: "projects-scroll",
          trigger: pinEl,
          start: "top top",
          end: () => `+=${Math.min(getDistance() * 1.2, window.innerHeight * 2.8)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIdx = Math.min(
              cards.length - 1,
              Math.floor(progress * cards.length)
            );
            setActive(activeIdx);
          },
        },
      });

      triggerRef.current = tween.scrollTrigger || null;
      setActive(0);
    }, pinEl);

    return () => ctx.revert();
  }, [reduced]);

  const scrollToProject = (targetIndex: number) => {
    const nextIdx = Math.max(0, Math.min(portfolio.projects.length - 1, targetIndex));
    const st = triggerRef.current;
    if (st) {
      const targetScroll = st.start + (nextIdx / (portfolio.projects.length - 1)) * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto mb-10 flex max-w-[1440px] items-center justify-between px-[var(--page-pad)]">
        <div>
          <p className="label">05 — Selected work</p>
        </div>

        {/* Manual Left / Right Controls */}
        <div className="flex items-center gap-4">
          <p className="label hidden text-muted sm:inline-block">
            {String(currentIndex + 1).padStart(2, "0")} / {String(portfolio.projects.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToProject(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Previous project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text cursor-pointer"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => scrollToProject(currentIndex + 1)}
              disabled={currentIndex === portfolio.projects.length - 1}
              aria-label="Next project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text cursor-pointer"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={pin}
        className="flex min-h-svh items-center overflow-hidden"
      >
        <div
          ref={track}
          className="flex w-max items-center gap-8 px-[var(--page-pad)] py-10 will-change-transform"
        >
          {portfolio.projects.map((project) => (
            <article
              key={project.slug}
              data-card
              data-active="false"
              className="project-card flex w-[min(82vw,32rem)] shrink-0 flex-col justify-between border border-border bg-bg-elevated p-7 md:h-[30rem] md:p-10 rounded-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="label text-accent">{project.index}</p>
                  {"year" in project && project.year ? (
                    <p className="label">{project.year}</p>
                  ) : null}
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
