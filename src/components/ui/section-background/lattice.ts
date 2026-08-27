import type { LatticePoint, TokenColors } from "./types";
import { dist } from "./math";

const INFLUENCE = 210;
const MAX_DIST = 150;
const NEAR_DIST = 240;

export function drawLattice(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  tokens: TokenColors,
  mx: number,
  my: number,
  hasMouse: boolean,
  pointsRef: { current: LatticePoint[] | null }
): void {
  const accentRgb = tokens.accent;
  const isLight = document.documentElement.dataset.theme === "light";
  const neutralRgb = isLight ? "51,65,85" : "148,163,184";

  if (pointsRef.current === null) {
    const density = Math.floor((W * H) / 9000);
    const count = Math.min(Math.max(density, 40), 110);
    pointsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 1 + Math.random() * 1.5,
    }));
  }
  const points = pointsRef.current;

  points.forEach((p) => {
    p.pulse += 0.02 * p.pulseSpeed;
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) { p.x = 0; p.vx *= -1; }
    else if (p.x > W) { p.x = W; p.vx *= -1; }
    if (p.y < 0) { p.y = 0; p.vy *= -1; }
    else if (p.y > H) { p.y = H; p.vy *= -1; }
    if (hasMouse) {
      const dx = mx - p.x;
      const dy = my - p.y;
      const dSq = dx * dx + dy * dy;
      if (dSq < INFLUENCE * INFLUENCE && dSq > 0) {
        const d = Math.sqrt(dSq);
        const force = (1 - d / INFLUENCE) * 0.9;
        p.x -= (dx / d) * force;
        p.y -= (dy / d) * force;
      }
    }
  });

  const cellSize = MAX_DIST;
  const cols = Math.max(1, Math.ceil(W / cellSize));
  const rows = Math.max(1, Math.ceil(H / cellSize));
  const grid: number[][][] = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => [] as number[])
  );
  points.forEach((p, i) => {
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
        const p1 = points[idx1];
        for (let j = 0; j < neighbors.length; j++) {
          const idx2 = neighbors[j];
          if (idx1 >= idx2) continue;
          const p2 = points[idx2];
          const d12 = dist(p1.x, p1.y, p2.x, p2.y);
          if (d12 > MAX_DIST) continue;
          for (let k = j + 1; k < neighbors.length; k++) {
            const idx3 = neighbors[k];
            if (idx2 >= idx3) continue;
            const p3 = points[idx3];
            if (dist(p2.x, p2.y, p3.x, p3.y) > MAX_DIST) continue;
            if (dist(p3.x, p3.y, p1.x, p1.y) > MAX_DIST) continue;
            const avgX = (p1.x + p2.x + p3.x) / 3;
            const avgY = (p1.y + p2.y + p3.y) / 3;
            const mouseDist = dist(avgX, avgY, mx, my);
            const isNear = hasMouse && mouseDist < NEAR_DIST;
            const fillAlpha = isNear
              ? (1 - mouseDist / NEAR_DIST) * (isLight ? 0.14 : 0.22)
              : 0.02;
            ctx.fillStyle = isNear
              ? `rgba(${accentRgb},${fillAlpha.toFixed(3)})`
              : `rgba(${neutralRgb},${fillAlpha.toFixed(3)})`;
            ctx.strokeStyle = isNear
              ? `rgba(${accentRgb},${Math.min(fillAlpha * 1.5, 0.5).toFixed(3)})`
              : `rgba(${neutralRgb},0.07)`;
            ctx.lineWidth = isNear ? 0.8 : 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        }
      }
    }
  }

  points.forEach((p) => {
    const mouseDist = dist(p.x, p.y, mx, my);
    const isNear = hasMouse && mouseDist < NEAR_DIST;
    const pulseR = 1.8 + Math.sin(p.pulse) * 1.0;
    ctx.fillStyle = isNear
      ? `rgba(${accentRgb},0.9)`
      : `rgba(${neutralRgb},0.35)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, isNear ? 3.4 : pulseR, 0, Math.PI * 2);
    ctx.fill();
    if (isNear) {
      ctx.strokeStyle = `rgba(${accentRgb},0.3)`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 7 + Math.sin(p.pulse * 2) * 2.5, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
}
