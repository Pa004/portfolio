"use client";

import { useEffect, useRef } from "react";

type Variant = "grid" | "orbs" | "dots" | "waves";

interface SectionBackgroundProps {
  variant: Variant;
}

export default function SectionBackground({ variant }: SectionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const setSize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    setSize();

    const W = () => canvas.width;
    const H = () => canvas.height;
    let t = 0;

    const dots =
      variant === "dots"
        ? Array.from({ length: 40 }, () => ({
            x: Math.random() * W(),
            y: Math.random() * H(),
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            r: Math.random() * 1.2 + 0.3,
          }))
        : [];

    const orbs =
      variant === "orbs"
        ? [
            { x: 0.2, y: 0.3, r: 200, color: "59,130,246", speed: 0.0008 },
            { x: 0.8, y: 0.6, r: 180, color: "6,182,212",  speed: 0.0012 },
            { x: 0.5, y: 0.8, r: 150, color: "167,139,250",speed: 0.001  },
            { x: 0.1, y: 0.7, r: 120, color: "59,130,246", speed: 0.0015 },
          ]
        : [];

    const paint = () => {
      ctx.clearRect(0, 0, W(), H());

      if (variant === "grid") {
        const size = 40;
        t += 0.008;
        for (let x = 0; x < W(); x += size) {
          for (let y = 0; y < H(); y += size) {
            const dist = Math.sqrt((x - W() / 2) ** 2 + (y - H() / 2) ** 2);
            const pulse = Math.sin(dist * 0.015 - t) * 0.5 + 0.5;
            ctx.strokeStyle = `rgba(59,130,246,${pulse * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, size, size);
            if (pulse > 0.7) {
              ctx.beginPath();
              ctx.arc(x, y, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(59,130,246,${pulse * 0.4})`;
              ctx.fill();
            }
          }
        }
      }

      if (variant === "orbs") {
        t += 1;
        orbs.forEach((orb, i) => {
          const x = (orb.x + Math.sin(t * orb.speed + i) * 0.15) * W();
          const y = (orb.y + Math.cos(t * orb.speed + i) * 0.1) * H();
          const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
          grad.addColorStop(0, `rgba(${orb.color},0.08)`);
          grad.addColorStop(1, `rgba(${orb.color},0)`);
          ctx.beginPath();
          ctx.arc(x, y, orb.r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        const size = 48;
        ctx.strokeStyle = "rgba(59,130,246,0.03)";
        ctx.lineWidth = 0.5;
        for (let x = 0; x < W(); x += size) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, H());
          ctx.stroke();
        }
        for (let y = 0; y < H(); y += size) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(W(), y);
          ctx.stroke();
        }
      }

      if (variant === "dots") {
        dots.forEach((d) => {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > W()) d.vx *= -1;
          if (d.y < 0 || d.y > H()) d.vy *= -1;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(6,182,212,0.35)";
          ctx.fill();
        });

        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(dots[i].x, dots[i].y);
              ctx.lineTo(dots[j].x, dots[j].y);
              ctx.strokeStyle = `rgba(6,182,212,${0.12 * (1 - dist / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      if (variant === "waves") {
        t += 0.015;
        const waves = [
          { amp: 30, freq: 0.008, speed: 1.0, color: "59,130,246", alpha: 0.04, yOffset: 0.3 },
          { amp: 20, freq: 0.012, speed: 1.5, color: "6,182,212",  alpha: 0.03, yOffset: 0.5 },
          { amp: 40, freq: 0.006, speed: 0.8, color: "167,139,250",alpha: 0.03, yOffset: 0.7 },
        ];

        waves.forEach((wave) => {
          ctx.beginPath();
          ctx.moveTo(0, H() * wave.yOffset);
          for (let x = 0; x <= W(); x += 2) {
            const y = H() * wave.yOffset + Math.sin(x * wave.freq + t * wave.speed) * wave.amp;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(W(), H());
          ctx.lineTo(0, H());
          ctx.closePath();
          ctx.fillStyle = `rgba(${wave.color},${wave.alpha})`;
          ctx.fill();
        });

        const scanY = ((Math.sin(t * 0.3) + 1) / 2) * H();
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(W(), scanY);
        ctx.strokeStyle = "rgba(59,130,246,0.04)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    let animId: number | null = null;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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

    if (prefersReduced) paint();
    else if (animId === null) loop();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", setSize);
    };
  }, [variant]);

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
        opacity: 0.8,
      }}
    />
  );
}
