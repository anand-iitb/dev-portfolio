"use client";

export function MetalName({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`inline-block select-none ${className}`} style={{ perspective: "1000px" }}>
      {children.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:[transform:rotateY(360deg)_scale(1.04)] hover:text-accent cursor-pointer select-none origin-center"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
