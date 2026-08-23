"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function Recognition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const totalAchievements = portfolio.achievements.length;
  const AUTO_DURATION = 4000; // 4 seconds per achievement

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalAchievements);
    setProgress(0);
  }, [totalAchievements]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalAchievements) % totalAchievements);
    setProgress(0);
  }, [totalAchievements]);

  const goToIndex = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Smooth live progress timer for active pill
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 30; // 33fps silky smooth filling
    const step = (intervalTime / AUTO_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch Swipe Handlers for Mobile (horizontal swipe)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // 3D Cube Rotation with Cinematic Depth Blur & 3-Tier Shading
  const getCardStyle = (index: number) => {
    let offset = (index - currentIndex + totalAchievements) % totalAchievements;
    if (offset > totalAchievements / 2) {
      offset -= totalAchievements;
    }

    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;
    const isVisible = absOffset <= 2;

    // 3D Cube Spatial Positioning
    const translateX = offset * 66; // percentage offset
    const translateZ = isCenter ? 60 : Math.max(-160, 20 - absOffset * 75);
    const rotateY = isCenter ? 0 : Math.max(-38, Math.min(38, -offset * 25));
    const scale = isCenter ? 1.05 : Math.max(0.78, 1 - absOffset * 0.08);
    const blurPx = isCenter ? 0 : Math.min(4.5, Math.max(0, (absOffset - 0.3) * 2.2));
    
    // Balanced 3-tier opacity for crisp visibility in both dark and light modes
    const opacity = isCenter ? 1 : absOffset === 1 ? 0.82 : 0.58;
    const zIndex = 30 - absOffset * 6;

    return {
      transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      filter: blurPx > 0.4 ? `blur(${blurPx.toFixed(1)}px)` : "none",
      opacity: isVisible ? opacity : 0,
      zIndex,
      pointerEvents: isVisible ? ("auto" as const) : ("none" as const),
      visibility: isVisible ? ("visible" as const) : ("hidden" as const),
      transformOrigin: "center center",
      transformStyle: "preserve-3d" as const,
      transition: "transform 0.75s cubic-bezier(0.2, 0.9, 0.3, 1), filter 0.75s ease, opacity 0.75s ease, border-color 0.4s ease, box-shadow 0.4s ease",
    };
  };

  return (
    <section id="recognition" className="py-24 md:py-36 overflow-hidden">
      <div className="mx-auto mb-10 max-w-[1440px] px-[var(--page-pad)] w-full">
        <ScrollReveal>
          <div className="flex items-center gap-2">
            <Award size={14} className="text-accent" />
            <p className="label text-accent">Honors & Milestones</p>
          </div>
          <h2 className="display mt-3 text-3xl md:text-5xl text-text">
            Recognition
          </h2>
        </ScrollReveal>
      </div>

      {/* 3D Cube Carousel Deck */}
      <div
        className="w-full relative px-[var(--page-pad)] max-w-[1440px] mx-auto select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="relative flex items-center justify-center min-h-[22rem] md:min-h-[26rem] w-full py-6"
          style={{ perspective: "1300px", transformStyle: "preserve-3d" }}
        >
          {portfolio.achievements.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <article
                key={item.title}
                onClick={() => goToIndex(idx)}
                style={getCardStyle(idx)}
                className={`absolute left-1/2 top-1/2 w-[min(84vw,22rem)] md:w-[28rem] shrink-0 cursor-pointer flex flex-col justify-between rounded-sm border bg-bg-elevated p-7 md:h-[20rem] md:p-9 select-none ${
                  isActive
                    ? "border-accent shadow-[0_35px_100px_-15px_rgba(0,0,0,0.8),0_0_0_1.5px_var(--accent),0_0_45px_-5px_var(--accent-dim)] ring-1 ring-accent/60"
                    : "border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:border-accent/40"
                }`}
              >
                <div>
                  {/* Top Bar: Award Icon and Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award size={15} className="text-accent" />
                      <span className="label text-accent tracking-widest text-[0.68rem] uppercase">
                        Achievement
                      </span>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
                  </div>

                  <h3 className="display mt-6 md:mt-7 text-xl md:text-2xl text-text leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div>
                  <p className="text-sm md:text-base leading-relaxed text-muted mt-5">
                    {item.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Centered Controls: <- . . _ . . -> with Live Completion Progress Bar */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous achievement"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-all hover:border-accent hover:text-accent hover:scale-105 cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>

          {/* 5-dot Indicator with Live Completion Progress Pill: <- . . _ . . -> */}
          <div className="flex items-center gap-2.5 px-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToIndex((currentIndex - 2 + totalAchievements) % totalAchievements);
              }}
              aria-label="Previous step 2"
              className="h-1.5 w-1.5 rounded-full bg-border transition-all hover:bg-muted cursor-pointer"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToIndex((currentIndex - 1 + totalAchievements) % totalAchievements);
              }}
              aria-label="Previous step 1"
              className="h-1.5 w-1.5 rounded-full bg-border transition-all hover:bg-muted cursor-pointer"
            />

            {/* Middle Completion Bar Pill */}
            <div
              className="relative h-1.5 w-11 overflow-hidden rounded-full bg-border/70 shadow-inner"
              title="Next achievement countdown"
            >
              <div
                className="h-full bg-accent shadow-[0_0_10px_var(--accent)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToIndex((currentIndex + 1) % totalAchievements);
              }}
              aria-label="Next step 1"
              className="h-1.5 w-1.5 rounded-full bg-border transition-all hover:bg-muted cursor-pointer"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToIndex((currentIndex + 2) % totalAchievements);
              }}
              aria-label="Next step 2"
              className="h-1.5 w-1.5 rounded-full bg-border transition-all hover:bg-muted cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next achievement"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-all hover:border-accent hover:text-accent hover:scale-105 cursor-pointer"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}









