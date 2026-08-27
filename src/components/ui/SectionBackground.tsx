"use client";

import { useEffect, useRef } from "react";

type Variant = "grid" | "orbs" | "dots" | "waves" | "kinetic" | "lattice" | "stars" | "neural";
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

function smoothstep(a: number): number {
  return a * a * (3 - 2 * a);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
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
    let nodesPulse = 0;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const interactive = !!section && !prefersReduced;

    const dots =
      variant === "dots"
        ? Array.from({ length: 50 }, () => ({
            x: Math.random() * W(),
            y: Math.random() * H(),
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.5,
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

    const floatingNodes =
      variant === "grid"
        ? Array.from({ length: 12 }, () => ({
            x: Math.random() * W(),
            y: Math.random() * H(),
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            r: Math.random() * 2 + 1,
            alpha: Math.random() * 0.3 + 0.1,
          }))
        : [];

    const waveParticles =
      variant === "waves"
        ? Array.from({ length: 25 }, () => ({
            x: Math.random(),
            speed: Math.random() * 0.3 + 0.1,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.4 + 0.1,
            waveIndex: Math.floor(Math.random() * 4),
          }))
        : [];

    const kineticRipples: { x: number; y: number; born: number }[] = [];

    interface LatticePoint {
      x: number;
      y: number;
      vx: number;
      vy: number;
      pulse: number;
      pulseSpeed: number;
    }

    const latticePoints: LatticePoint[] =
      variant === "lattice"
        ? (() => {
            const density = Math.floor((W() * H()) / 9000);
            const count = Math.min(Math.max(density, 40), 110);
            return Array.from({ length: count }, () => ({
              x: Math.random() * W(),
              y: Math.random() * H(),
              vx: (Math.random() - 0.5) * 0.8,
              vy: (Math.random() - 0.5) * 0.8,
              pulse: Math.random() * Math.PI * 2,
              pulseSpeed: 1 + Math.random() * 1.5,
            }));
          })()
        : [];

    const KINETIC_CELL = 64;
    const KINETIC_INFLUENCE = 240;
    const KINETIC_MAX_WARP = 22;

    interface Meteor {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      active: boolean;
    }

    const STARS_CELL = 40;
    const STARS_INFLUENCE = 260;

    const starsNodes =
      variant === "stars"
        ? (() => {
            const nodes: { x: number; y: number; pulse: number }[] = [];
            for (let x = STARS_CELL / 2; x < W(); x += STARS_CELL) {
              for (let y = STARS_CELL / 2; y < H(); y += STARS_CELL) {
                nodes.push({
                  x,
                  y,
                  pulse: Math.random() * Math.PI * 2,
                });
              }
            }
            return nodes;
          })()
        : [];

    const starsMeteors: Meteor[] = [];

    const spawnMeteor = (): Meteor => {
      const len = 130 + Math.random() * 90;
      const speed = 2.2 + Math.random() * 2.4;
      const angle = 0.5 + Math.random() * 0.35;
      return {
        x: Math.random() * W(),
        y: Math.random() * H() * 0.5,
        len,
        speed,
        angle,
        active: false,
      };
    };

    for (let i = 0; i < 6; i++) {
      const m = spawnMeteor();
      m.active = false;
      starsMeteors.push(m);
    }

    const NEURAL_COUNT = 60;
    const NEURAL_LINK_DIST = 185;
    const NEURAL_INFLUENCE = 230;
    const NEURAL_SPEED = 0.3;

    interface NeuralNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      pulse: number;
      pulseSpeed: number;
    }

    interface NeuralSignal {
      a: number;
      b: number;
      t: number;
      speed: number;
    }

    const neuralNodes: NeuralNode[] =
      variant === "neural"
        ? Array.from({ length: NEURAL_COUNT }, () => ({
            x: Math.random() * W(),
            y: Math.random() * H(),
            vx: (Math.random() - 0.5) * NEURAL_SPEED,
            vy: (Math.random() - 0.5) * NEURAL_SPEED,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.5 + Math.random() * 0.8,
          }))
        : [];

    const neuralSignals: NeuralSignal[] = [];
    const spawnNeuralSignal = (): NeuralSignal => {
      const a = Math.floor(Math.random() * NEURAL_COUNT);
      let b = Math.floor(Math.random() * NEURAL_COUNT);
      if (b === a) b = (b + 1) % NEURAL_COUNT;
      return {
        a,
        b,
        t: Math.random(),
        speed: 0.008 + Math.random() * 0.006,
      };
    };
    for (let i = 0; i < 4; i++) neuralSignals.push(spawnNeuralSignal());


    const paint = () => {
      ctx!.clearRect(0, 0, W(), H());
      const aScale = parseFloat(cssVar("--canvas-alpha-scale")) || 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = mx >= 0 && interactive;

      if (variant === "kinetic") {
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");

        const cols = Math.max(2, Math.ceil(W() / KINETIC_CELL)) + 1;
        const rows = Math.max(2, Math.ceil(H() / KINETIC_CELL)) + 1;
        const cellW = W() / (cols - 1);
        const cellH = H() / (rows - 1);

        const now = performance.now();
        const ripples = kineticRipples;

        ctx!.clearRect(0, 0, W(), H());

        const pts: { x: number; y: number; proximity: number }[] = [];

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const gx = col * cellW;
            const gy = row * cellH;

            const colPin = Math.min(col / 1.5, (cols - 1 - col) / 1.5, 1);
            const rowPin = Math.min(row / 1.5, (rows - 1 - row) / 1.5, 1);
            const pinFactor = colPin * colPin * rowPin * rowPin;

            const dx = gx - mx;
            const dy = gy - my;
            const mDist = Math.sqrt(dx * dx + dy * dy);
            const proximity =
              Math.max(0, 1 - mDist / KINETIC_INFLUENCE) * pinFactor;

            let wx = 0;
            let wy = 0;
            for (const r of ripples) {
              const rdx = gx - r.x;
              const rdy = gy - r.y;
              const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
              const age = (now - r.born) / 1000;
              const width = 55;
              const diff = rdist - age * 400;
              if (Math.abs(diff) < width) {
                const strength = (1 - Math.abs(diff) / width) * (1 - age * 1.2) * 16 * pinFactor;
                const angle = Math.atan2(rdy, rdx);
                const sign = diff < 0 ? -1 : 1;
                wx += Math.cos(angle) * strength * sign * -1;
                wy += Math.sin(angle) * strength * sign * -1;
              }
            }

            let px = gx + wx;
            let py = gy + wy;
            if (hasMouse && mDist < KINETIC_INFLUENCE && mDist > 0 && pinFactor > 0) {
              const t = mDist / KINETIC_INFLUENCE;
              const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, mDist / 60);
              const warpAmt = eased * KINETIC_MAX_WARP * pinFactor * 0.5;
              const angle = Math.atan2(dy, dx);
              px -= Math.cos(angle) * warpAmt;
              py -= Math.sin(angle) * warpAmt;
            }

            pts.push({ x: px, y: py, proximity });
          }
        }

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const idx = row * cols + col;
            const right = idx + 1;
            const down = idx + cols;
            const p = pts[idx];
            if (col < cols - 1) {
              const q = pts[right];
              const avg = smoothstep((p.proximity + q.proximity) / 2);
              ctx!.beginPath();
              ctx!.moveTo(p.x, p.y);
              ctx!.lineTo(q.x, q.y);
              ctx!.strokeStyle = `rgba(${accentRgb},${(0.04 + avg * 0.22) * aScale})`;
              ctx!.lineWidth = 0.4 + avg * 0.8;
              ctx!.stroke();
            }
            if (row < rows - 1) {
              const q = pts[down];
              const avg = smoothstep((p.proximity + q.proximity) / 2);
              ctx!.beginPath();
              ctx!.moveTo(p.x, p.y);
              ctx!.lineTo(q.x, q.y);
              ctx!.strokeStyle = `rgba(${accentRgb},${(0.04 + avg * 0.22) * aScale})`;
              ctx!.lineWidth = 0.4 + avg * 0.8;
              ctx!.stroke();
            }
          }
        }

        for (const p of pts) {
          const t = smoothstep(p.proximity);
          const r = lerp(1.4, 3.2, t);
          if (t > 0.25) {
            const glowR = r + lerp(0, 6, (t - 0.25) / 0.75);
            const grd = ctx!.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
            grd.addColorStop(0, `rgba(${accentRgb},${(t * 0.3).toFixed(3)})`);
            grd.addColorStop(1, `rgba(${accentRgb},0)`);
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx!.fillStyle = grd;
            ctx!.fill();
          }
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${accentRgb},${(0.12 + t * 0.5) * aScale})`;
          ctx!.fill();
        }

        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          const age = (now - r.born) / 1000;
          const radius = Math.max(0, age * 400);
          const opacity = Math.max(0, 1 - age * 1.2);
          if (radius > 0) {
            ctx!.beginPath();
            ctx!.arc(r.x, r.y, radius, 0, Math.PI * 2);
            ctx!.strokeStyle = `rgba(${accentRgb},${(opacity * 0.25).toFixed(3)})`;
            ctx!.lineWidth = 1.2;
            ctx!.stroke();
          }
          if (opacity <= 0) ripples.splice(i, 1);
        }
      }

      if (variant === "grid") {
        const size = 40;
        t += 0.012;
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");
        const isEducation = section === "education";

        for (let x = 0; x < W(); x += size) {
          for (let y = 0; y < H(); y += size) {
            let pulse: number;

            if (isEducation) {
              const waveOffset = Math.sin(y * 0.008 + t * 0.7) * 8;
              pulse = Math.sin((x + waveOffset) * 0.012 - t * 0.4) * 0.5 + 0.5;
            } else {
              const cellDist = dist(x, y, W() / 2, H() / 2);
              pulse = Math.sin(cellDist * 0.015 - t) * 0.5 + 0.5;
            }

            if (hasMouse) {
              const mouseDist = dist(x, y, mx, my);
              if (mouseDist < 200) {
                pulse *= 1 + (1 - mouseDist / 200) * 1.5;
              }
            }

            ctx!.strokeStyle = `rgba(${accentRgb},${Math.min(pulse, 1) * 0.12 * aScale})`;
            ctx!.lineWidth = 0.5;
            ctx!.strokeRect(x, y, size, size);

            if (pulse > 0.6) {
              ctx!.beginPath();
              ctx!.arc(x, y, 1.5, 0, Math.PI * 2);
              ctx!.fillStyle = `rgba(${accentRgb},${Math.min(pulse, 1) * 0.5 * aScale})`;
              ctx!.fill();
            }
          }
        }

        floatingNodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > W()) node.vx *= -1;
          if (node.y < 0 || node.y > H()) node.vy *= -1;

          let nodeAlpha = node.alpha;
          if (hasMouse) {
            const nodeDist = dist(node.x, node.y, mx, my);
            if (nodeDist < 250) {
              nodeAlpha = Math.min(nodeAlpha * (1 + (1 - nodeDist / 250) * 2), 0.8);
            }
          }

          ctx!.beginPath();
          ctx!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${accentRgb},${nodeAlpha * aScale})`;
          ctx!.fill();
        });
      }

      if (variant === "orbs") {
        t += 1;
        const isSkills = section === "skills";

        orbs.forEach((orb, i) => {
          let orbX = orb.x + Math.sin(t * orb.speed + i) * 0.15;
          let orbY = orb.y + Math.cos(t * orb.speed + i) * 0.1;

          if (isSkills && hasMouse) {
            const attractX = (mx / W() - orb.x) * 0.06;
            const attractY = (my / H() - orb.y) * 0.06;
            orbX += attractX;
            orbY += attractY;
          }

          const x = orbX * W();
          const y = orbY * H();

          const pulseR = isSkills
            ? orb.baseR + Math.sin(t * orb.pulseSpeed + i) * (orb.baseR * 0.15)
            : orb.baseR;

          const rgb = hexToRgb(cssVar(orb.colorVar) || "#3b82f6");
          const grad = ctx!.createRadialGradient(x, y, 0, x, y, pulseR);
          grad.addColorStop(0, `rgba(${rgb},${0.15 * aScale})`);
          grad.addColorStop(0.5, `rgba(${rgb},${0.06 * aScale})`);
          grad.addColorStop(1, `rgba(${rgb},0)`);
          ctx!.beginPath();
          ctx!.arc(x, y, pulseR, 0, Math.PI * 2);
          ctx!.fillStyle = grad;
          ctx!.fill();

          for (let j = 0; j < 4; j++) {
            const orbitAngle = t * 0.002 + (j * Math.PI * 2) / 4 + i;
            const orbitR = pulseR * 0.6;
            const dotX = x + Math.cos(orbitAngle) * orbitR;
            const dotY = y + Math.sin(orbitAngle) * orbitR;
            ctx!.beginPath();
            ctx!.arc(dotX, dotY, 2, 0, Math.PI * 2);
            ctx!.fillStyle = `rgba(${rgb},${0.4 * aScale})`;
            ctx!.fill();
          }
        });

        for (let i = 0; i < orbs.length; i++) {
          for (let j = i + 1; j < orbs.length; j++) {
            const x1 = (orbs[i].x + Math.sin(t * orbs[i].speed + i) * 0.15) * W();
            const y1 = (orbs[i].y + Math.cos(t * orbs[i].speed + i) * 0.1) * H();
            const x2 = (orbs[j].x + Math.sin(t * orbs[j].speed + j) * 0.15) * W();
            const y2 = (orbs[j].y + Math.cos(t * orbs[j].speed + j) * 0.1) * H();
            const d = dist(x1, y1, x2, y2);
            if (d < 400) {
              const lineAlpha = (1 - d / 400) * 0.08 * aScale;
              ctx!.beginPath();
              ctx!.moveTo(x1, y1);
              ctx!.lineTo(x2, y2);
              ctx!.strokeStyle = `rgba(${hexToRgb(cssVar("--accent") || "#3b82f6")},${lineAlpha})`;
              ctx!.lineWidth = 0.5;
              ctx!.stroke();
            }
          }
        }

        const size = 48;
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");
        ctx!.strokeStyle = `rgba(${accentRgb},${0.04 * aScale})`;
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
          if (isProjects && hasMouse) {
            const mouseDist = dist(d.x, d.y, mx, my);
            if (mouseDist < 220) {
              const force = (1 - mouseDist / 220) * 2;
              const angle = Math.atan2(d.y - my, d.x - mx);
              d.x += Math.cos(angle) * force;
              d.y += Math.sin(angle) * force;
            }
          }

          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > W()) d.vx *= -1;
          if (d.y < 0 || d.y > H()) d.vy *= -1;

          let drawR = d.baseR;
          if (isProjects && hasMouse) {
            const mouseDist = dist(d.x, d.y, mx, my);
            if (mouseDist < 220) {
              drawR = d.baseR * (1 + (1 - mouseDist / 220) * 0.8);
            }
          }

          ctx!.beginPath();
          ctx!.arc(d.x, d.y, drawR, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${cyanRgb},${0.5 * aScale})`;
          ctx!.fill();
        });

        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              const t2 = 1 - d / 120;
              ctx!.beginPath();
              ctx!.moveTo(dots[i].x, dots[i].y);
              ctx!.lineTo(dots[j].x, dots[j].y);
              ctx!.strokeStyle = `rgba(${cyanRgb},${(0.12 + t2 * 0.23) * aScale})`;
              ctx!.lineWidth = 0.4 + t2 * 1.5;
              ctx!.stroke();
            }
          }
        }
      }

      if (variant === "lattice") {
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");
        const isLight = document.documentElement.dataset.theme === "light";
        const neutralRgb = isLight ? "51,65,85" : "148,163,184";
        const maxDist = 150;
        const influence = 210;

        latticePoints.forEach((p) => {
          p.pulse += 0.02 * p.pulseSpeed;

          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) { p.x = 0; p.vx *= -1; }
          else if (p.x > W()) { p.x = W(); p.vx *= -1; }
          if (p.y < 0) { p.y = 0; p.vy *= -1; }
          else if (p.y > H()) { p.y = H(); p.vy *= -1; }

          if (hasMouse) {
            const dx = mx - p.x;
            const dy = my - p.y;
            const dSq = dx * dx + dy * dy;
            if (dSq < influence * influence && dSq > 0) {
              const d = Math.sqrt(dSq);
              const force = (1 - d / influence) * 0.9;
              p.x -= (dx / d) * force;
              p.y -= (dy / d) * force;
            }
          }
        });

        const cellSize = maxDist;
        const cols = Math.max(1, Math.ceil(W() / cellSize));
        const rows = Math.max(1, Math.ceil(H() / cellSize));
        const grid: number[][][] = Array.from({ length: cols }, () =>
          Array.from({ length: rows }, () => [] as number[])
        );

        latticePoints.forEach((p, i) => {
          const c = Math.min(cols - 1, Math.max(0, Math.floor(p.x / cellSize)));
          const r = Math.min(rows - 1, Math.max(0, Math.floor(p.y / cellSize)));
          grid[c][r].push(i);
        });

        const neighbors: number[] = [];
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            neighbors.length = 0;
            for (let nc = Math.max(0, c - 1); nc <= Math.min(cols - 1, c + 1); nc++) {
              for (let nr = Math.max(0, r - 1); nr <= Math.min(rows - 1, r + 1); nr++) {
                const nList = grid[nc][nr];
                for (let k = 0; k < nList.length; k++) neighbors.push(nList[k]);
              }
            }

            const cellPoints = grid[c][r];
            for (let i = 0; i < cellPoints.length; i++) {
              const idx1 = cellPoints[i];
              const p1 = latticePoints[idx1];
              for (let j = 0; j < neighbors.length; j++) {
                const idx2 = neighbors[j];
                if (idx1 >= idx2) continue;
                const p2 = latticePoints[idx2];
                const d12 = dist(p1.x, p1.y, p2.x, p2.y);
                if (d12 > maxDist) continue;
                for (let k = j + 1; k < neighbors.length; k++) {
                  const idx3 = neighbors[k];
                  if (idx2 >= idx3) continue;
                  const p3 = latticePoints[idx3];
                  if (dist(p2.x, p2.y, p3.x, p3.y) > maxDist) continue;
                  if (dist(p3.x, p3.y, p1.x, p1.y) > maxDist) continue;

                  const avgX = (p1.x + p2.x + p3.x) / 3;
                  const avgY = (p1.y + p2.y + p3.y) / 3;
                  const mouseDist = dist(avgX, avgY, mx, my);
                  const isNear = hasMouse && mouseDist < 240;
                  const fillAlpha = isNear
                    ? (1 - mouseDist / 240) * (isLight ? 0.14 : 0.22)
                    : 0.02;

                  ctx!.fillStyle = isNear
                    ? `rgba(${accentRgb},${fillAlpha.toFixed(3)})`
                    : `rgba(${neutralRgb},${fillAlpha.toFixed(3)})`;
                  ctx!.strokeStyle = isNear
                    ? `rgba(${accentRgb},${Math.min(fillAlpha * 1.5, 0.5).toFixed(3)})`
                    : `rgba(${neutralRgb},0.07)`;
                  ctx!.lineWidth = isNear ? 0.8 : 0.4;

                  ctx!.beginPath();
                  ctx!.moveTo(p1.x, p1.y);
                  ctx!.lineTo(p2.x, p2.y);
                  ctx!.lineTo(p3.x, p3.y);
                  ctx!.closePath();
                  ctx!.fill();
                  ctx!.stroke();
                }
              }
            }
          }
        }

        latticePoints.forEach((p) => {
          const mouseDist = dist(p.x, p.y, mx, my);
          const isNear = hasMouse && mouseDist < 240;
          const pulseR = 1.8 + Math.sin(p.pulse) * 1.0;

          ctx!.fillStyle = isNear
            ? `rgba(${accentRgb},0.9)`
            : `rgba(${neutralRgb},0.35)`;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, isNear ? 3.4 : pulseR, 0, Math.PI * 2);
          ctx!.fill();

          if (isNear) {
            ctx!.strokeStyle = `rgba(${accentRgb},0.3)`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, 7 + Math.sin(p.pulse * 2) * 2.5, 0, Math.PI * 2);
            ctx!.stroke();
          }
        });
      }

      if (variant === "stars") {
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");
        const cyanRgb = hexToRgb(cssVar("--accent-cyan-icon") || "#06b6d4");
        const isLight = document.documentElement.dataset.theme === "light";
        const neutralRgb = isLight ? "51,65,85" : "148,163,184";

        nodesPulse++;

        starsNodes.forEach((n, i) => {
          const mouseDist = hasMouse ? dist(n.x, n.y, mx, my) : Infinity;
          const isNear = hasMouse && mouseDist < STARS_INFLUENCE;
          const nearT = isNear ? 1 - mouseDist / STARS_INFLUENCE : 0;
          const pulse = Math.sin(n.pulse + nodesPulse * 0.02 + i) * 0.5 + 0.5;

          const r = 1.1 + nearT * 0.9;
          const baseAlpha = 0.1 + pulse * 0.25;

          if (isNear) {
            const glowR = 6 + nearT * 6;
            const grd = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
            grd.addColorStop(0, `rgba(${accentRgb},${(nearT * 0.35).toFixed(3)})`);
            grd.addColorStop(1, `rgba(${accentRgb},0)`);
            ctx!.beginPath();
            ctx!.arc(n.x, n.y, glowR, 0, Math.PI * 2);
            ctx!.fillStyle = grd;
            ctx!.fill();
          }

          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx!.fillStyle = isNear
            ? `rgba(${accentRgb},${(0.15 + nearT * 0.7) * aScale})`
            : `rgba(${neutralRgb},${baseAlpha * aScale})`;
          ctx!.fill();
        });

        const meteorCount = starsMeteors.length;
        let activeMeteors = 0;
        for (const m of starsMeteors) if (m.active) activeMeteors++;

        if (interactive && activeMeteors < 3 && Math.random() < 0.008) {
          const idx = Math.floor(Math.random() * meteorCount);
          const m = starsMeteors[idx];
          if (!m.active) {
            m.x = Math.random() * W();
            m.y = -Math.random() * 100;
            m.len = 130 + Math.random() * 90;
            m.angle = 0.5 + Math.random() * 0.35;
            m.speed = 2.2 + Math.random() * 2.4;
            m.active = true;
          }
        }

        for (const m of starsMeteors) {
          if (!m.active) continue;

          if (hasMouse) {
            const dx = mx - m.x;
            const dy = my - m.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < STARS_INFLUENCE && d > 0) {
              const pull = (1 - d / STARS_INFLUENCE) * 0.6;
              m.angle += (Math.atan2(dy, dx) - m.angle) * pull * 0.05;
            }
          }

          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;

          if (m.y > H() + 80 || m.x < -200 || m.x > W() + 200) {
            m.active = false;
            continue;
          }

          const headX = m.x;
          const headY = m.y;
          const tailX = m.x - Math.cos(m.angle) * m.len;
          const tailY = m.y - Math.sin(m.angle) * m.len;

          const grd = ctx!.createLinearGradient(headX, headY, tailX, tailY);
          grd.addColorStop(0, `rgba(${accentRgb},${0.9 * aScale})`);
          grd.addColorStop(0.4, `rgba(${cyanRgb},${0.25 * aScale})`);
          grd.addColorStop(1, `rgba(${accentRgb},0)`);
          ctx!.beginPath();
          ctx!.moveTo(headX, headY);
          ctx!.lineTo(tailX, tailY);
          ctx!.strokeStyle = grd;
          ctx!.lineWidth = 1.6;
          ctx!.lineCap = "round";
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.arc(headX, headY, 2.1, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${accentRgb},${0.95 * aScale})`;
          ctx!.fill();

          ctx!.beginPath();
          ctx!.arc(headX, headY, 5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${accentRgb},${0.18 * aScale})`;
          ctx!.fill();
        }
      }

      if (variant === "neural") {
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");
        const isLight = document.documentElement.dataset.theme === "light";
        const neutralRgb = isLight ? "51,65,85" : "148,163,184";

        neuralNodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W()) n.vx *= -1;
          if (n.y < 0 || n.y > H()) n.vy *= -1;
        });

        for (let i = 0; i < neuralNodes.length; i++) {
          const ni = neuralNodes[i];
          for (let j = i + 1; j < neuralNodes.length; j++) {
            const nj = neuralNodes[j];
            const dx = nj.x - ni.x;
            const dy = nj.y - ni.y;
            const d2 = dx * dx + dy * dy;
            if (d2 >= NEURAL_LINK_DIST * NEURAL_LINK_DIST) continue;
            const d = Math.sqrt(d2);
            if (d === 0) continue;
            let linkAlpha = (1 - d / NEURAL_LINK_DIST) * 0.3;
            if (hasMouse) {
              const mdxi = ni.x - mx;
              const mdyi = ni.y - my;
              const md = Math.sqrt(mdxi * mdxi + mdyi * mdyi);
              if (md < NEURAL_INFLUENCE) {
                linkAlpha += (1 - md / NEURAL_INFLUENCE) * 0.45;
              }
            }
            ctx!.beginPath();
            ctx!.moveTo(ni.x, ni.y);
            ctx!.lineTo(nj.x, nj.y);
            ctx!.strokeStyle = `rgba(${accentRgb},${Math.min(linkAlpha, 0.75) * aScale})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }

        for (const s of neuralSignals) {
          s.t += s.speed;
          if (s.t > 1) {
            const next = spawnNeuralSignal();
            s.a = next.a;
            s.b = next.b;
            s.t = 0;
          }
          const na = neuralNodes[s.a];
          const nb = neuralNodes[s.b];
          const dx = nb.x - na.x;
          const dy = nb.y - na.y;
          const px = na.x + dx * s.t;
          const py = na.y + dy * s.t;
          ctx!.beginPath();
          ctx!.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${accentRgb},${0.7 * aScale})`;
          ctx!.fill();
          ctx!.beginPath();
          ctx!.arc(px, py, 5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${accentRgb},${0.14 * aScale})`;
          ctx!.fill();
        }

        neuralNodes.forEach((n, i) => {
          const pulse = Math.sin(n.pulse + i) * 0.5 + 0.5;
          let alpha = 0.25 + pulse * 0.35;
          let r = 1.2 + pulse * 0.7;
          const md = hasMouse ? dist(n.x, n.y, mx, my) : Infinity;
          const isNear = hasMouse && md < NEURAL_INFLUENCE;
          if (isNear) {
            const nearT = 1 - md / NEURAL_INFLUENCE;
            alpha += nearT * 0.5;
            r += nearT * 1.2;
            ctx!.beginPath();
            ctx!.arc(n.x, n.y, 7 + nearT * 7, 0, Math.PI * 2);
            ctx!.fillStyle = `rgba(${accentRgb},${(nearT * 0.28).toFixed(3)})`;
            ctx!.fill();
          }
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx!.fillStyle = isNear
            ? `rgba(${accentRgb},${Math.min(alpha, 1) * aScale})`
            : `rgba(${neutralRgb},${alpha * aScale})`;
          ctx!.fill();
        });
      }

      if (variant === "waves") {
        t += 0.02;
        const accentRgb = hexToRgb(cssVar("--accent") || "#3b82f6");
        const cyanRgb = hexToRgb(cssVar("--accent-cyan-icon") || "#06b6d4");
        const violetRgb = hexToRgb(cssVar("--accent-violet-icon") || "#a78bfa");
        const greenRgb = hexToRgb(cssVar("--accent-green-icon") || "#22c55e");

        const mouseYInfluence = hasMouse ? (my / H() - 0.5) * 20 : 0;

        const waves = [
          { amp: 35, freq: 0.008, speed: 1.0, color: accentRgb, alpha: 0.06 * aScale, yOffset: 0.25 },
          { amp: 25, freq: 0.012, speed: 1.5, color: cyanRgb, alpha: 0.05 * aScale, yOffset: 0.45 },
          { amp: 45, freq: 0.006, speed: 0.8, color: violetRgb, alpha: 0.05 * aScale, yOffset: 0.65 },
          { amp: 20, freq: 0.015, speed: 1.2, color: greenRgb, alpha: 0.04 * aScale, yOffset: 0.8 },
        ];

        waves.forEach((wave, i) => {
          ctx!.beginPath();
          ctx!.moveTo(0, H() * wave.yOffset);
          for (let x = 0; x <= W(); x += 2) {
            const mouseWarp = hasMouse
              ? Math.sin((x - mx) * 0.005) * 15 * Math.exp(-Math.abs(x - mx) / 300)
              : 0;
            const y = H() * wave.yOffset + Math.sin(x * wave.freq + t * wave.speed) * wave.amp + mouseWarp + mouseYInfluence * (i * 0.3);
            ctx!.lineTo(x, y);
          }
          ctx!.lineTo(W(), H());
          ctx!.lineTo(0, H());
          ctx!.closePath();
          ctx!.fillStyle = `rgba(${wave.color},${wave.alpha})`;
          ctx!.fill();
        });

        waveParticles.forEach((p) => {
          p.x += p.speed * 0.001;
          if (p.x > 1) p.x = 0;

          const wave = waves[p.waveIndex];
          if (!wave) return;
          const px = p.x * W();
          const py = H() * wave.yOffset + Math.sin(px * wave.freq + t * wave.speed) * wave.amp;

          ctx!.beginPath();
          ctx!.arc(px, py, p.size, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${wave.color},${p.alpha * aScale})`;
          ctx!.fill();
        });

        const scanY = ((Math.sin(t * 0.3) + 1) / 2) * H();
        ctx!.beginPath();
        ctx!.moveTo(0, scanY);
        ctx!.lineTo(W(), scanY);
        ctx!.strokeStyle = `rgba(${accentRgb},${0.06 * aScale})`;
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

    const onClick = (e: MouseEvent) => {
      if (variant !== "kinetic" || prefersReduced) return;
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) return;
      kineticRipples.push({
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
        born: performance.now(),
      });
    };
    document.addEventListener("click", onClick);

    if (prefersReduced) paint();
    else if (animId === null) loop();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, [variant, section]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !section) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      mouseRef.current = inside
        ? {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height),
          }
        : { x: -1, y: -1 };
    };

    document.addEventListener("mousemove", onMove);

    return () => {
      document.removeEventListener("mousemove", onMove);
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
          opacity: 0.85,
        }}
      />
    </div>
  );
}
