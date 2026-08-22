import { cn } from "@/lib/cn";

export function StatusDot({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span className={cn("label inline-flex items-center gap-2", className)}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {label}
    </span>
  );
}
