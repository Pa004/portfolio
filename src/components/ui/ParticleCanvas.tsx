"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const currentDpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * currentDpr;
      canvas.height = canvas.offsetHeight * currentDpr;
    };
    setSize();

    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.5,
    }));

    let animId: number | null = null;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let accentRgb = "59,130,246";
    let canvasAlphaScale = 1;

    const refreshThemeTokens = () => {
      accentRgb =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent-rgb")
          .trim() || "59,130,246";
      canvasAlphaScale =
        parseFloat(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--canvas-alpha-scale")
        ) || 1;
    };
    refreshThemeTokens();

    const paint = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb},${Math.min(0.55 * canvasAlphaScale, 0.9)})`;
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
            ctx.strokeStyle = `rgba(${accentRgb},${Math.min(0.18 * canvasAlphaScale * (1 - dist / 90), 0.5)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      paint();
      animId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (animId !== null) { cancelAnimationFrame(animId); animId = null; }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !prefersReduced) {
          if (animId === null) loop();
        } else {
          stop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", setSize);

    const onThemeChange = () => {
      refreshThemeTokens();
      if (prefersReduced) paint();
    };
    window.addEventListener("theme-change", onThemeChange);

    if (prefersReduced) paint();
    else if (animId === null) loop();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", setSize);
      window.removeEventListener("theme-change", onThemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
