"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface FloatingBlobProps {
  color1: string;
  color2: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  blur?: number;
}

export default function FloatingBlob({
  color1,
  color2,
  size = 400,
  top,
  left,
  right,
  blur = 100,
}: FloatingBlobProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: top ?? "50%",
        left: left ?? "50%",
        right,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color1}, ${color2})`,
        filter: `blur(${blur}px)`,
        opacity: 0.12,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 0,
        animation: reduced ? "none" : "blob-float 12s ease-in-out infinite",
      }}
    />
  );
}
