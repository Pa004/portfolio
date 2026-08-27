import type { Meteor, StarNode, TokenColors } from "./types";
import { dist } from "./math";

const STARS_CELL = 40;
const STARS_INFLUENCE = 260;

interface StarsRefs {
  nodes: { current: StarNode[] | null };
  meteors: { current: Meteor[] | null };
}

export function drawStars(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  tokens: TokenColors,
  mx: number,
  my: number,
  hasMouse: boolean,
  sectionName: string | undefined,
  refs: StarsRefs
): void {
  const accentRgb = tokens.accent;
  const cyanRgb = tokens.cyan;
  const aScale = tokens.aScale;
  const isLight = document.documentElement.dataset.theme === "light";
  const neutralRgb = isLight ? "51,65,85" : "148,163,184";

  if (refs.nodes.current === null) {
    const nodes: StarNode[] = [];
    for (let x = STARS_CELL / 2; x < W; x += STARS_CELL) {
      for (let y = STARS_CELL / 2; y < H; y += STARS_CELL) {
        nodes.push({ x, y, pulse: Math.random() * Math.PI * 2 });
      }
    }
    refs.nodes.current = nodes;
  }
  if (refs.meteors.current === null) {
    const spawn = (): Meteor => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.5,
      len: 130 + Math.random() * 90,
      speed: 2.2 + Math.random() * 2.4,
      angle: 0.5 + Math.random() * 0.35,
      active: false,
    });
    refs.meteors.current = Array.from({ length: 6 }, () => spawn());
  }
  const nodes = refs.nodes.current;
  const meteors = refs.meteors.current;

  nodes.forEach((n, i) => {
    const mouseDist = hasMouse ? dist(n.x, n.y, mx, my) : Infinity;
    const isNear = hasMouse && mouseDist < STARS_INFLUENCE;
    const nearT = isNear ? 1 - mouseDist / STARS_INFLUENCE : 0;
    const pulse = Math.sin(n.pulse + i) * 0.5 + 0.5;
    const r = 1.1 + nearT * 0.9;
    const baseAlpha = 0.1 + pulse * 0.25;
    if (isNear) {
      const glowR = 6 + nearT * 6;
      const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
      grd.addColorStop(0, `rgba(${accentRgb},${(nearT * 0.35).toFixed(3)})`);
      grd.addColorStop(1, `rgba(${accentRgb},0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = isNear
      ? `rgba(${accentRgb},${(0.15 + nearT * 0.7) * aScale})`
      : `rgba(${neutralRgb},${baseAlpha * aScale})`;
    ctx.fill();
  });

  const activeMeteors = meteors.filter((m) => m.active).length;
  if (!!sectionName && activeMeteors < 3 && Math.random() < 0.008) {
    const idx = Math.floor(Math.random() * meteors.length);
    const m = meteors[idx];
    if (!m.active) {
      m.x = Math.random() * W;
      m.y = -Math.random() * 100;
      m.len = 130 + Math.random() * 90;
      m.angle = 0.5 + Math.random() * 0.35;
      m.speed = 2.2 + Math.random() * 2.4;
      m.active = true;
    }
  }

  for (const m of meteors) {
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
    if (m.y > H + 80 || m.x < -200 || m.x > W + 200) {
      m.active = false;
      continue;
    }
    const headX = m.x;
    const headY = m.y;
    const tailX = m.x - Math.cos(m.angle) * m.len;
    const tailY = m.y - Math.sin(m.angle) * m.len;
    const grd = ctx.createLinearGradient(headX, headY, tailX, tailY);
    grd.addColorStop(0, `rgba(${accentRgb},${0.9 * aScale})`);
    grd.addColorStop(0.4, `rgba(${cyanRgb},${0.25 * aScale})`);
    grd.addColorStop(1, `rgba(${accentRgb},0)`);
    ctx.beginPath();
    ctx.moveTo(headX, headY);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = grd;
    ctx.lineWidth = 1.6;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(headX, headY, 2.1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accentRgb},${0.95 * aScale})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(headX, headY, 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accentRgb},${0.18 * aScale})`;
    ctx.fill();
  }
}
