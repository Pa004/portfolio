"use client";

import { useEffect, useRef } from "react";

type Variant = "grid" | "orbs" | "dots" | "waves";
type Section = "about" | "skills" | "projects" | "education";

interface SectionBackgroundProps {
  variant: Variant;
  section?: Section;
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export default function SectionBackground({ variant, section }: SectionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      return;
    }
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

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const interactive = !!section && !prefersReduced;

    const dots =
      variant === "dots"
        ? Array.from({ length: 40 }, () => ({
            x: Math.random() * W(),
            y: Math.random() * H(),
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            r: Math.random() * 1.2 + 0.3,
            baseR: 0,
          }))
        : [];

    dots.forEach((d) => { d.baseR = d.r; });

    const orbs =
      variant === "orbs"
        ? [
            { x: 0.2, y: 0.3, baseR: 200, colorVar: "--accent", speed: 0.0008, pulseSpeed: 0.003 },
            { x: 0.8, y: 0.6, baseR: 180, colorVar: "--accent-cyan-icon", speed: 0.0012, pulseSpeed: 0.004 },
            { x: 0.5, y: 0.8, baseR: 150, colorVar: "--accent-violet-icon", speed: 0.001, pulseSpeed: 0.0035 },
            { x: 0.1, y: 0.7, baseR: 120, colorVar: "--accent", speed: 0.0015, pulseSpeed: 0.0045 },
          ]
        : [];

    const paint = () => {
      ctx!.clearRect(0, 0, W(), H());
      const aScale = parseFloat(cssVar("--canvas-alpha-scale")) || 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = mx >= 0 && interactive;

      if (variant === "grid") {
        const size = 40;
        t += 0.008;
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");
        const isEducation = section === "education";

        for (let x = 0; x < W(); x += size) {
          for (let y = 0; y < H(); y += size) {
            let pulse: number;

            if (isEducation) {
              pulse = Math.sin(y * 0.01 - t * 0.5) * 0.5 + 0.5;
            } else {
              const cellDist = dist(x, y, W() / 2, H() / 2);
              pulse = Math.sin(cellDist * 0.015 - t) * 0.5 + 0.5;
            }

            if (hasMouse) {
              const mouseDist = dist(x, y, mx, my);
              if (mouseDist < 120) {
                pulse *= 1 + (1 - mouseDist / 120) * 0.8;
              }
            }

            ctx!.strokeStyle = `rgba(${accentRgb},${Math.min(pulse, 1) * 0.06 * aScale})`;
            ctx!.lineWidth = 0.5;
            ctx!.strokeRect(x, y, size, size);

            if (pulse > 0.7) {
              ctx!.beginPath();
              ctx!.arc(x, y, 1.2, 0, Math.PI * 2);
              ctx!.fillStyle = `rgba(${accentRgb},${Math.min(pulse, 1) * 0.4 * aScale})`;
              ctx!.fill();
            }
          }
        }
      }

      if (variant === "orbs") {
        t += 1;
        const isSkills = section === "skills";

        orbs.forEach((orb, i) => {
          let orbX = orb.x + Math.sin(t * orb.speed + i) * 0.15;
          let orbY = orb.y + Math.cos(t * orb.speed + i) * 0.1;

          if (isSkills && hasMouse) {
            const attractX = (mx / W() - orb.x) * 0.02;
            const attractY = (my / H() - orb.y) * 0.02;
            orbX += attractX;
            orbY += attractY;
          }

          const x = orbX * W();
          const y = orbY * H();

          const pulseR = isSkills
            ? orb.baseR + Math.sin(t * orb.pulseSpeed + i) * (orb.baseR * 0.1)
            : orb.baseR;

          const rgb = hexToRgb(cssVar(orb.colorVar) || "#3b82f6");
          const grad = ctx!.createRadialGradient(x, y, 0, x, y, pulseR);
          grad.addColorStop(0, `rgba(${rgb},${0.08 * aScale})`);
          grad.addColorStop(1, `rgba(${rgb},0)`);
          ctx!.beginPath();
          ctx!.arc(x, y, pulseR, 0, Math.PI * 2);
          ctx!.fillStyle = grad;
          ctx!.fill();
        });

        const size = 48;
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");
        ctx!.strokeStyle = `rgba(${accentRgb},${0.03 * aScale})`;
        ctx!.lineWidth = 0.5;
        for (let x = 0; x < W(); x += size) {
          ctx!.beginPath();
          ctx!.moveTo(x, 0);
          ctx!.lineTo(x, H());
          ctx!.stroke();
        }
        for (let y = 0; y < H(); y += size) {
          ctx!.beginPath();
          ctx!.moveTo(0, y);
          ctx!.lineTo(W(), y);
          ctx!.stroke();
        }
      }

      if (variant === "dots") {
        const cyanRgb = hexToRgb(cssVar("--accent-cyan-icon") || "#06b6d4");
        const isProjects = section === "projects";

        dots.forEach((d) => {
          let speedMult = 1;
          if (isProjects && hasMouse) {
            const mouseDist = dist(d.x, d.y, mx, my);
            if (mouseDist < 150) {
              speedMult = 0.5;
            }
          }

          d.x += d.vx * speedMult;
          d.y += d.vy * speedMult;
          if (d.x < 0 || d.x > W()) d.vx *= -1;
          if (d.y < 0 || d.y > H()) d.vy *= -1;

          let drawR = d.baseR;
          if (isProjects && hasMouse) {
            const mouseDist = dist(d.x, d.y, mx, my);
            if (mouseDist < 150) {
              drawR = d.baseR * (1 + (1 - mouseDist / 150) * 0.5);
            }
          }

          ctx!.beginPath();
          ctx!.arc(d.x, d.y, drawR, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${cyanRgb},${0.35 * aScale})`;
          ctx!.fill();
        });

        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 100) {
              const t2 = 1 - d / 100;
              ctx!.beginPath();
              ctx!.moveTo(dots[i].x, dots[i].y);
              ctx!.lineTo(dots[j].x, dots[j].y);
              ctx!.strokeStyle = `rgba(${cyanRgb},${(0.08 + t2 * 0.15) * aScale})`;
              ctx!.lineWidth = 0.3 + t2 * 1.2;
              ctx!.stroke();
            }
          }
        }
      }

      if (variant === "waves") {
        t += 0.015;
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");
        const cyanRgb = hexToRgb(cssVar("--accent-cyan-icon") || "#06b6d4");
        const violetRgb = hexToRgb(cssVar("--accent-violet-icon") || "#a78bfa");
        const waves = [
          { amp: 30, freq: 0.008, speed: 1.0, color: accentRgb, alpha: 0.04 * aScale, yOffset: 0.3 },
          { amp: 20, freq: 0.012, speed: 1.5, color: cyanRgb, alpha: 0.03 * aScale, yOffset: 0.5 },
          { amp: 40, freq: 0.006, speed: 0.8, color: violetRgb, alpha: 0.03 * aScale, yOffset: 0.7 },
        ];

        waves.forEach((wave) => {
          ctx!.beginPath();
          ctx!.moveTo(0, H() * wave.yOffset);
          for (let x = 0; x <= W(); x += 2) {
            const y = H() * wave.yOffset + Math.sin(x * wave.freq + t * wave.speed) * wave.amp;
            ctx!.lineTo(x, y);
          }
          ctx!.lineTo(W(), H());
          ctx!.lineTo(0, H());
          ctx!.closePath();
          ctx!.fillStyle = `rgba(${wave.color},${wave.alpha})`;
          ctx!.fill();
        });

        const scanY = ((Math.sin(t * 0.3) + 1) / 2) * H();
        ctx!.beginPath();
        ctx!.moveTo(0, scanY);
        ctx!.lineTo(W(), scanY);
        ctx!.strokeStyle = `rgba(${accentRgb},${0.04 * aScale})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    };

    let animId: number | null = null;

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

    const resizeObserver = new ResizeObserver(() => setSize());
    resizeObserver.observe(canvas);

    if (prefersReduced) paint();
    else if (animId === null) loop();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [variant, section]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !section) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
      };
    };
    const onLeave = () => { mouseRef.current = { x: -1, y: -1 }; };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [section]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
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
    </div>
  );
}
