"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
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

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-bg px-[var(--page-pad)] pt-24 pb-10 lg:hidden overflow-y-auto"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: duration.slow, ease: ease.expo }}
        >
          <nav className="flex flex-col gap-3 pt-6">
            {portfolio.nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={item.href.endsWith(".pdf") ? "noreferrer" : undefined}
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
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
