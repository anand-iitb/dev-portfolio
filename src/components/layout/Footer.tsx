"use client";

import { Heart } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { StatusDot } from "@/components/ui/StatusDot";
import { VisitCounter } from "@/components/ui/VisitCounter";
import { IndiaTime } from "@/components/ui/IndiaTime";
import { MetalName } from "@/components/ui/MetalName";
import { useCursor } from "@/components/ui/cursor-context";

export function Footer() {
  const { person, social } = portfolio;
  const year = new Date().getFullYear();
  const { setLabel } = useCursor();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-8 gap-y-10 px-[var(--page-pad)] py-12 md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-3">
          <p className="label mb-3">Name</p>
          <a href="#top" className="label text-text">
            <MetalName>{person.name}</MetalName>
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="label mb-3">Location</p>
          <p className="label text-text">{person.location}</p>
          <div className="mt-2">
            <IndiaTime />
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="label mb-3">Index</p>
          <p className="label text-text">{year}</p>
          <div className="mt-2">
            <VisitCounter />
          </div>
        </div>
        <div className="md:col-span-4">
          <p className="label mb-3">Connect</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a className="label link-line text-text" href={person.resume}>
              Resume
            </a>
            <a className="label link-line text-text" href={social.github.href}>
              GitHub
            </a>
            <a className="label link-line text-text" href={social.linkedin.href}>
              LinkedIn
            </a>
            <a className="label link-line text-text" href={`mailto:${person.email}`}>
              Email
            </a>
          </div>
        </div>
        <div
          className="col-span-2 flex items-center md:col-span-8"
          onMouseEnter={() => setLabel("heart")}
          onMouseLeave={() => setLabel(null)}
        >
          <p className="label inline-flex items-center gap-2">
            Made with
            <Heart size={12} className="fill-accent text-accent" />
            by {person.name}
          </p>
        </div>
        <div className="col-span-2 flex items-center md:col-span-4 md:justify-end">
          <StatusDot label="Open to opportunities" />
        </div>
      </div>
    </footer>
  );
}
