import type { KineticRipple } from "./types";
import { lerp, smoothstep } from "./math";

const KINETIC_CELL = 64;
const KINETIC_INFLUENCE = 240;
const KINETIC_MAX_WARP = 22;

export function drawKinetic(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  accentRgb: string,
  aScale: number,
  mx: number,
  my: number,
  hasMouse: boolean,
  ripples: KineticRipple[]
): void {
  const cols = Math.max(2, Math.ceil(W / KINETIC_CELL)) + 1;
  const rows = Math.max(2, Math.ceil(H / KINETIC_CELL)) + 1;
  const cellW = W / (cols - 1);
  const cellH = H / (rows - 1);
  const now = performance.now();

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
      const proximity = Math.max(0, 1 - mDist / KINETIC_INFLUENCE) * pinFactor;

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
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(${accentRgb},${(0.04 + avg * 0.22) * aScale})`;
        ctx.lineWidth = 0.4 + avg * 0.8;
        ctx.stroke();
      }
      if (row < rows - 1) {
        const q = pts[down];
        const avg = smoothstep((p.proximity + q.proximity) / 2);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(${accentRgb},${(0.04 + avg * 0.22) * aScale})`;
        ctx.lineWidth = 0.4 + avg * 0.8;
        ctx.stroke();
      }
    }
  }

  for (const p of pts) {
    const t = smoothstep(p.proximity);
    const r = lerp(1.4, 3.2, t);
    if (t > 0.25) {
      const glowR = r + lerp(0, 6, (t - 0.25) / 0.75);
      const grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
      grd.addColorStop(0, `rgba(${accentRgb},${(t * 0.3).toFixed(3)})`);
      grd.addColorStop(1, `rgba(${accentRgb},0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accentRgb},${(0.12 + t * 0.5) * aScale})`;
    ctx.fill();
  }

  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    const age = (now - r.born) / 1000;
    const radius = Math.max(0, age * 400);
    const opacity = Math.max(0, 1 - age * 1.2);
    if (radius > 0) {
      ctx.beginPath();
      ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${accentRgb},${(opacity * 0.25).toFixed(3)})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    if (opacity <= 0) ripples.splice(i, 1);
  }
}
