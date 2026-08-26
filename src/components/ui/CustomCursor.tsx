"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible]       = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let animId: number | null = null;
    let isVisible = false;

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [data-hover]");

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      animId = requestAnimationFrame(animate);
    };

    const startRaf = () => { if (animId === null) animate(); };
    const stopRaf  = () => {
      if (animId !== null) { cancelAnimationFrame(animId); animId = null; }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) { isVisible = true; setVisible(true); }
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      startRaf();
    };

    const onLeave = () => { isVisible = false; setVisible(false); stopRaf(); };

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) setIsHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) setIsHovering(false);
    };
    const onDown = () => setIsClicking(true);
    const onUp   = () => setIsClicking(false);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    return () => {
      stopRaf();
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
    };
  }, []);

  const dotSize  = 8;
  const ringSize = isHovering ? 44 : isClicking ? 24 : 32;

  return (
    <>
      {/* Dot — centered via marginLeft/marginTop */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          marginLeft: `-${dotSize / 2}px`,
          marginTop:  `-${dotSize / 2}px`,
          borderRadius: "50%",
          background: isHovering ? "var(--accent-cyan-icon)" : "var(--accent)",
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, background 0.2s, width 0.15s, height 0.15s",
          boxShadow: `0 0 6px ${isHovering ? "var(--accent-cyan-icon)" : "var(--accent)"}`,
          transform: isClicking ? "scale(0.6)" : "scale(1)",
        }}
      />

      {/* Ring — centered via marginLeft/marginTop */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          marginLeft: `-${ringSize / 2}px`,
          marginTop:  `-${ringSize / 2}px`,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "var(--accent-cyan-icon)" : "var(--accent)"}`,
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, border-color 0.2s, width 0.2s, height 0.2s, margin 0.2s",
        }}
      />
    </>
  );
}
