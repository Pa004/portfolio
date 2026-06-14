"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
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
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);
    const onDown   = () => setIsClicking(true);
    const onUp     = () => setIsClicking(false);

    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd   = () => setIsHovering(false);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      animId = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    const interactives = document.querySelectorAll("a, button, [data-hover]");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", onHoverStart);
      el.addEventListener("mouseleave", onHoverEnd);
    });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", onHoverStart);
        el.removeEventListener("mouseleave", onHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "8px", height: "8px",
        borderRadius: "50%",
        background: isHovering ? "#06b6d4" : "#3b82f6",
        pointerEvents: "none", zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s, background 0.2s, transform 0.05s",
        transform: isClicking ? "scale(0.6)" : "scale(1)",
        boxShadow: `0 0 6px ${isHovering ? "#06b6d4" : "#3b82f6"}`,
      }} />

      {/* Ring */}
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "32px", height: "32px",
        borderRadius: "50%",
        border: `1.5px solid ${isHovering ? "rgba(6,182,212,0.6)" : "rgba(59,130,246,0.4)"}`,
        pointerEvents: "none", zIndex: 9998,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s, border-color 0.2s, width 0.2s, height 0.2s",
        width: isHovering ? "44px" : isClicking ? "24px" : "32px",
        height: isHovering ? "44px" : isClicking ? "24px" : "32px",
      }} />
    </>
  );
}