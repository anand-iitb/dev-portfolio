"use client";

import { Heart, Mail } from "lucide-react";
import { siGithub, siInstagram } from "simple-icons";
import { portfolio } from "@/data/portfolio";
import { VisitCounter } from "@/components/ui/VisitCounter";

const LINKEDIN_PATH =
  "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.81a1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45 1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45z";

export function Footer() {
  const { person, social } = portfolio;

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-6 px-[var(--page-pad)] text-center">
        {/* Social Icons & Visitor Counter Layout */}
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6 md:gap-8">
          {/* Social Icons row */}
          <div className="flex items-center justify-center gap-3">
            <a
              href={`mailto:${person.email}`}
              aria-label="Email"
              title="Email"
              className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110"
            >
              <Mail size={16} />
            </a>
            <a
              href={social.linkedin.href}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d={LINKEDIN_PATH} />
              </svg>
            </a>
            <a
              href={social.github.href}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d={siGithub.path} />
              </svg>
            </a>
            <a
              href={social.instagram.href}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-border bg-bg-elevated text-text transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d={siInstagram.path} />
              </svg>
            </a>
          </div>

          {/* Visitor Counter */}
          <div className="flex items-center justify-center">
            <VisitCounter />
          </div>
        </div>

        {/* Bottom: Made with Love */}
        <p className="label inline-flex items-center gap-2 text-text/80 pt-1">
          Made with
          <Heart size={12} className="fill-accent text-accent animate-pulse" />
          by Anand
        </p>
      </div>
    </footer>
  );
}

