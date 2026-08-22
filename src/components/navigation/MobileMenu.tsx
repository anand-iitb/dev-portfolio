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
          className="fixed inset-0 z-[70] flex flex-col bg-bg px-[var(--page-pad)] pt-28 pb-10 lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: duration.slow, ease: ease.expo }}
        >
          <nav className="flex flex-1 flex-col justify-center gap-2">
            {[
              ...portfolio.nav,
              { label: "Resume", href: portfolio.person.resume },
            ].map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.18 + i * 0.06,
                  duration: duration.slow,
                  ease: ease.expo,
                }}
                className="display text-[12vw] text-text"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
          <p className="label">{portfolio.person.email}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
