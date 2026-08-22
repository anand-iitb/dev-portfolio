"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = "button",
  ariaLabel,
}: Props) {
  const sharedClass = cn(
    "inline-flex items-center gap-3 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-80",
    className,
  );

  if (href) {
    const external =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.endsWith(".pdf");
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={sharedClass}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={sharedClass}
    >
      {children}
    </button>
  );
}
