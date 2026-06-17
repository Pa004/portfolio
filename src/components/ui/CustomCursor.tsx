"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible]       = useState(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      // Dot follows instantly — centered on cursor
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);
    const onDown   = () => setIsClicking(true);
    const onUp     = () => setIsClicking(false);

    // Ring follows with lag via RAF
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      animId = requestAnimationFrame(animate);
    };
    animate();

    const updateInteractives = () => {
      const interactives = document.querySelectorAll("a, button, [data-hover]");
      interactives.forEach(el => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };
    updateInteractives();

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
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
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          marginLeft: `-${dotSize / 2}px`,
          marginTop:  `-${dotSize / 2}px`,
          borderRadius: "50%",
          background: isHovering ? "#06b6d4" : "#3b82f6",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, background 0.2s, width 0.15s, height 0.15s",
          boxShadow: `0 0 6px ${isHovering ? "#06b6d4" : "#3b82f6"}`,
          transform: isClicking ? "scale(0.6)" : "scale(1)",
        }}
      />

      {/* Ring — centered via marginLeft/marginTop */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          marginLeft: `-${ringSize / 2}px`,
          marginTop:  `-${ringSize / 2}px`,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "rgba(6,182,212,0.6)" : "rgba(59,130,246,0.4)"}`,
          pointerEvents: "none",
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, border-color 0.2s, width 0.2s, height 0.2s, margin 0.2s",
        }}
      />
    </>
  );
}