"use client";

import { createContext, useContext, useMemo, useState } from "react";

type CursorLabel = string | null;

type CursorContextValue = {
  label: CursorLabel;
  setLabel: (label: CursorLabel) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [label, setLabel] = useState<CursorLabel>(null);
  const value = useMemo(() => ({ label, setLabel }), [label]);
  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursor must be used within CursorProvider");
  }
  return ctx;
}
