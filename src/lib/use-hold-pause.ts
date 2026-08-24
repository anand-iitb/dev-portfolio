"use client";

import { useCallback, useState } from "react";

/** Pause autoplay only while the pointer is held, or after an explicit card click. */
export function useHoldPause() {
  const [held, setHeld] = useState(false);
  const [pinned, setPinned] = useState(false);

  const onPointerDown = useCallback(() => setHeld(true), []);
  const onPointerUp = useCallback(() => setHeld(false), []);
  const onPointerCancel = useCallback(() => setHeld(false), []);

  const pin = useCallback(() => setPinned(true), []);
  const unpin = useCallback(() => setPinned(false), []);

  return {
    isPaused: held || pinned,
    pin,
    unpin,
    holdBind: {
      onPointerDown,
      onPointerUp,
      onPointerCancel,
    },
  };
}
