"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { StatusDot } from "@/components/ui/StatusDot";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MetalName } from "@/components/ui/MetalName";
import { IndiaTime } from "@/components/ui/IndiaTime";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-3 z-[75] transition-[padding,background,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          compact
            ? "bg-bg/70 py-3 backdrop-blur-md"
            : "bg-transparent py-6 md:py-7",
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-[var(--page-pad)]">
          <a href="#top" className="label">
            <MetalName>{portfolio.person.name}</MetalName>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {portfolio.nav.map((item) => (
              <a key={item.href} href={item.href} className="label link-line">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <IndiaTime className="hidden md:block" />
            <StatusDot
              className="hidden xl:inline-flex"
              label={portfolio.person.availability}
            />
            <a
              href={portfolio.person.resume}
              className="label link-line hidden text-text sm:inline-flex"
            >
              Resume
            </a>
            <ThemeToggle />
            <button
              type="button"
              className="label text-text lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
