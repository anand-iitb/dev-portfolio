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
    if (cards.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const updateCardTransforms = (progress: number) => {
      const numCards = cards.length;
      if (numCards === 0) return;

      const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;
      const currentFloatIdx = progress * (numCards - 1);
      const activeIdx = Math.min(
        numCards - 1,
        Math.max(0, Math.round(currentFloatIdx))
      );
      setCurrentIndex(activeIdx);

      cards.forEach((card, idx) => {
        const diff = idx - currentFloatIdx;
        const absDiff = Math.abs(diff);
        const isActive = idx === activeIdx;

        card.dataset.active = isActive ? "true" : "false";

        if (reduced) {
          card.style.transform = "none";
          card.style.filter = "none";
          card.style.opacity = isActive ? "1" : "0.5";
          return;
        }

        // On mobile / small screens: Zero blur for maximum legibility and responsiveness
        if (isSmallScreen) {
          const scale = isActive ? 1.02 : 0.94;
          const opacity = isActive ? 1 : 0.45;
          const translateZ = isActive ? 24 : -30;
          card.style.transform = `perspective(1000px) translateZ(${translateZ}px) scale(${scale})`;
          card.style.filter = "none";
          card.style.opacity = String(opacity);
          return;
        }

        // On desktop: active card is always 100% crisp (0 blur), background cards recede in 3D
        const scale = Math.max(0.88, 1.04 - absDiff * 0.08);
        const translateZ = Math.max(-120, 40 - absDiff * 80);
        const rotateY = Math.max(-18, Math.min(18, -diff * 12));
        const blurPx = isActive ? 0 : Math.min(5, Math.max(0, (absDiff - 0.4) * 3.5));
        const brightness = Math.max(0.55, 1 - absDiff * 0.25);
        const opacity = Math.max(0.35, 1 - absDiff * 0.4);

        card.style.transform = `perspective(1200px) translateZ(${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        card.style.filter = blurPx > 0.5 ? `blur(${blurPx.toFixed(1)}px) brightness(${brightness.toFixed(2)})` : "none";
        card.style.opacity = opacity.toFixed(2);
      });
    };

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, trackEl.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          id: "projects-scroll",
          trigger: pinEl,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 2.2, getDistance() * 1.05)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateCardTransforms(self.progress);
          },
        },
      });

      triggerRef.current = tween.scrollTrigger || null;
      updateCardTransforms(0);
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
    <section id="work" className="py-20 md:py-32">
      <div className="mx-auto mb-8 md:mb-12 flex max-w-[1440px] items-center justify-between px-[var(--page-pad)]">
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
        className="projects-stage flex min-h-[90vh] md:min-h-svh items-center overflow-hidden"
      >
        <div
          ref={track}
          className="flex w-max items-center gap-6 md:gap-10 px-[var(--page-pad)] py-12 will-change-transform"
        >
          {portfolio.projects.map((project, idx) => (
            <article
              key={project.slug}
              data-card
              data-active={idx === 0 ? "true" : "false"}
              onClick={() => scrollToProject(idx)}
              className="project-card flex w-[min(85vw,22rem)] md:w-[32rem] shrink-0 cursor-pointer flex-col justify-between border border-border bg-bg-elevated p-6 md:h-[30rem] md:p-10 rounded-sm select-none"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="label text-accent">{project.index}</p>
                  {"year" in project && project.year ? (
                    <p className="label">{project.year}</p>
                  ) : null}
                </div>
                <h2 className="display mt-6 md:mt-8 text-[clamp(1.7rem,4vw,3.2rem)]">
                  {project.title}
                </h2>
                <p className="label mt-3">{project.category}</p>
              </div>
              <div>
                <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {project.description}
                </p>
                <p className="label mt-6 md:mt-8">{project.technologies.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

