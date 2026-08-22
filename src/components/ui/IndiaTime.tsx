"use client";

import { useEffect, useState } from "react";

function formatIst(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export function IndiaTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatIst(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={`label tabular-nums text-text ${className}`}>
      India {time || "--:--:--"}
    </p>
  );
}
