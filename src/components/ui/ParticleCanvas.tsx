"use client";

import { useCallback, useRef } from "react";
import { useCanvasSkeleton } from "@/lib/useCanvasSkeleton";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const TOKEN_ACCENT = "--accent-rgb";
const TOKEN_ALPHA = "--canvas-alpha-scale";

function readToken(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[] | null>(null);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    if (particlesRef.current === null) {
      particlesRef.current = Array.from({ length: 55 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.5,
      }));
    }
    const particles = particlesRef.current;

    const accentRgb = readToken(TOKEN_ACCENT) || "59,130,246";
    const alphaScale = parseFloat(readToken(TOKEN_ALPHA)) || 1;

    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentRgb},${Math.min(0.55 * alphaScale, 0.9)})`;
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${accentRgb},${Math.min(0.18 * alphaScale * (1 - dist / 90), 0.5)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }, []);

  useCanvasSkeleton(canvasRef, {
    draw: paint,
    drawWhenReduced: paint,
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
