"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/use-media";

export function Recognition() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const pinEl = pin.current;
    const trackEl = track.current;
    if (!pinEl || !trackEl) return;

    const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-cube-card]"));
    if (cards.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const updateCubeTransforms = (progress: number) => {
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
          card.style.opacity = isActive ? "1" : "0.5";
          return;
        }

        // 3D Cube Rotation Effect (Zero Blur everywhere)
        if (isSmallScreen) {
          const scale = isActive ? 1.02 : 0.94;
          const opacity = isActive ? 1 : 0.45;
          const rotateY = Math.max(-35, Math.min(35, -diff * 22));
          card.style.transform = `perspective(1000px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale})`;
          card.style.filter = "none";
          card.style.opacity = String(opacity);
          return;
        }

        const rotateY = Math.max(-55, Math.min(55, -diff * 32));
        const translateZ = Math.max(-120, 50 - absDiff * 85);
        const scale = Math.max(0.86, 1.04 - absDiff * 0.08);
        const opacity = Math.max(0.4, 1 - absDiff * 0.35);

        card.style.transform = `perspective(1400px) translateZ(${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        card.style.filter = "none";
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
          id: "recognition-scroll",
          trigger: pinEl,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 2.2, getDistance() * 1.05)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateCubeTransforms(self.progress);
          },
        },
      });

      triggerRef.current = tween.scrollTrigger || null;
      updateCubeTransforms(0);
    }, pinEl);


    return () => ctx.revert();
  }, [reduced]);

  const scrollToRecognition = (targetIndex: number) => {
    const nextIdx = Math.max(0, Math.min(portfolio.achievements.length - 1, targetIndex));
    const st = triggerRef.current;
    if (st) {
      const targetScroll = st.start + (nextIdx / (portfolio.achievements.length - 1)) * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="recognition" className="py-20 md:py-32">
      <div className="mx-auto mb-8 md:mb-12 flex max-w-[1440px] items-center justify-between px-[var(--page-pad)]">
        <div>
          <p className="label">06 — Recognition & Honors</p>
        </div>

        {/* Manual Navigation Controls */}
        <div className="flex items-center gap-4">
          <p className="label hidden text-muted sm:inline-block">
            {String(currentIndex + 1).padStart(2, "0")} / {String(portfolio.achievements.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToRecognition(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Previous achievement"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text cursor-pointer"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => scrollToRecognition(currentIndex + 1)}
              disabled={currentIndex === portfolio.achievements.length - 1}
              aria-label="Next achievement"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text cursor-pointer"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={pin}
        className="cube-stage flex min-h-[85vh] md:min-h-svh items-center overflow-hidden"
      >
        <div
          ref={track}
          className="flex w-max items-center gap-6 md:gap-10 px-[var(--page-pad)] py-12 will-change-transform"
        >
          {portfolio.achievements.map((item, idx) => (
            <article
              key={item.title}
              data-cube-card
              data-active={idx === 0 ? "true" : "false"}
              onClick={() => scrollToRecognition(idx)}
              className="cube-card flex w-[min(85vw,22rem)] md:w-[28rem] shrink-0 cursor-pointer flex-col justify-between rounded-sm border border-border bg-bg-elevated p-6 md:h-[22rem] md:p-9 select-none"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-accent" />
                    <p className="label text-accent">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <p className="label">{item.year}</p>
                </div>
                <h3 className="display mt-6 md:mt-8 text-xl tracking-tight text-text md:text-2xl">
                  {item.title}
                </h3>
              </div>
              <div>
                <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                  {item.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

