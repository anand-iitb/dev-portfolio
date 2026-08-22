"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/theme-context";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center text-text"
      aria-label={`Switch to ${next} theme`}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
