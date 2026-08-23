"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ui/theme-context";
import { FilmProgress } from "@/components/ui/FilmProgress";
import { Preloader } from "@/components/animations/Preloader";


const KEY = "ak-intro";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (sessionStorage.getItem(KEY) === "1") setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const onDone = useCallback(() => {
    sessionStorage.setItem(KEY, "1");
    setReady(true);
  }, []);

  return (
    <ThemeProvider>
      <LayoutGroup>
        <SmoothScroll>
          <FilmProgress />
          <div className="grain" aria-hidden />
          <AnimatePresence>
            {!ready ? (
              <Preloader key="preloader" onDone={onDone} />
            ) : null}
          </AnimatePresence>
          <Navbar />
          <div>
            {children}
            <Footer />
          </div>
        </SmoothScroll>
      </LayoutGroup>
    </ThemeProvider>

  );
}
