"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { duration, ease } from "@/lib/motion";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#work" },
    { label: "Achievements", href: "#recognition" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col justify-between bg-bg px-[var(--page-pad)] pt-24 pb-10 lg:hidden overflow-y-auto"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: duration.slow, ease: ease.expo }}
        >
          {/* Main Navigation Links */}
          <nav className="flex flex-col gap-3 pt-6">
            {navLinks.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.12 + i * 0.05,
                  duration: duration.slow,
                  ease: ease.expo,
                }}
                className="display text-[ clamp(2rem,8vw,3.5rem) ] text-text hover:text-accent transition-colors"
              >
                {item.label}
              </motion.a>
            ))}

            {/* Separated Resume Button */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.12 + navLinks.length * 0.05,
                duration: duration.slow,
                ease: ease.expo,
              }}
              className="pt-6 mt-4 border-t border-border/50"
            >
              <a
                href={portfolio.person.resume}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="label inline-flex items-center gap-2.5 border border-accent bg-accent/10 px-6 py-3.5 text-accent rounded-sm hover:bg-accent hover:text-bg transition-all tracking-widest uppercase text-xs"
              >
                <FileText size={15} />
                <span>Resume / CV</span>
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </nav>

          {/* Footer Info */}
          <div className="pt-8 border-t border-border/40 flex items-center justify-between">
            <p className="label text-muted text-xs">{portfolio.person.email}</p>
            <span className="label text-[0.65rem] text-accent">Anand Kumar</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

