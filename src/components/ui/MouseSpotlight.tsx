"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  const [pos, setPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onLeave = () => setPos({ x: -999, y: -999 });
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, var(--glass-blue-bg), transparent 70%)`,
        zIndex: 3,
      }}
    />
  );
}
