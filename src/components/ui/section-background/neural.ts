import type { NeuralNode, NeuralSignal, TokenColors } from "./types";
import { dist } from "./math";

const NEURAL_COUNT = 60;
const NEURAL_LINK_DIST = 185;
const NEURAL_INFLUENCE = 230;
const NEURAL_SPEED = 0.3;

interface NeuralRefs {
  nodes: { current: NeuralNode[] | null };
  signals: { current: NeuralSignal[] | null };
}

export function drawNeural(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  tokens: TokenColors,
  mx: number,
  my: number,
  hasMouse: boolean,
  refs: NeuralRefs
): void {
  const accentRgb = tokens.accent;
  const aScale = tokens.aScale;
  const isLight = document.documentElement.dataset.theme === "light";
  const neutralRgb = isLight ? "51,65,85" : "148,163,184";

  if (refs.nodes.current === null) {
    refs.nodes.current = Array.from({ length: NEURAL_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * NEURAL_SPEED,
      vy: (Math.random() - 0.5) * NEURAL_SPEED,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.5 + Math.random() * 0.8,
    }));
  }
  if (refs.signals.current === null) {
    const spawn = (): NeuralSignal => {
      const a = Math.floor(Math.random() * NEURAL_COUNT);
      let b = Math.floor(Math.random() * NEURAL_COUNT);
      if (b === a) b = (b + 1) % NEURAL_COUNT;
      return { a, b, t: Math.random(), speed: 0.008 + Math.random() * 0.006 };
    };
    refs.signals.current = Array.from({ length: 4 }, () => spawn());
  }
  const nodes = refs.nodes.current;
  const signals = refs.signals.current;

  nodes.forEach((n) => {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  });

  for (let i = 0; i < nodes.length; i++) {
    const ni = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const nj = nodes[j];
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
      ctx.beginPath();
      ctx.moveTo(ni.x, ni.y);
      ctx.lineTo(nj.x, nj.y);
      ctx.strokeStyle = `rgba(${accentRgb},${Math.min(linkAlpha, 0.75) * aScale})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  }

  for (const s of signals) {
    s.t += s.speed;
    if (s.t > 1) {
      const next = { a: Math.floor(Math.random() * NEURAL_COUNT), b: 0, t: 0, speed: 0.008 + Math.random() * 0.006 };
      let b = Math.floor(Math.random() * NEURAL_COUNT);
      if (b === next.a) b = (b + 1) % NEURAL_COUNT;
      s.a = next.a;
      s.b = b;
      s.t = 0;
      s.speed = next.speed;
    }
    const na = nodes[s.a];
    const nb = nodes[s.b];
    const dx = nb.x - na.x;
    const dy = nb.y - na.y;
    const px = na.x + dx * s.t;
    const py = na.y + dy * s.t;
    ctx.beginPath();
    ctx.arc(px, py, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accentRgb},${0.7 * aScale})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${accentRgb},${0.14 * aScale})`;
    ctx.fill();
  }

  nodes.forEach((n, i) => {
    const pulse = Math.sin(n.pulse + i) * 0.5 + 0.5;
    let alpha = 0.25 + pulse * 0.35;
    let r = 1.2 + pulse * 0.7;
    const md = hasMouse ? dist(n.x, n.y, mx, my) : Infinity;
    const isNear = hasMouse && md < NEURAL_INFLUENCE;
    if (isNear) {
      const nearT = 1 - md / NEURAL_INFLUENCE;
      alpha += nearT * 0.5;
      r += nearT * 1.2;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 7 + nearT * 7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentRgb},${(nearT * 0.28).toFixed(3)})`;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = isNear
      ? `rgba(${accentRgb},${Math.min(alpha, 1) * aScale})`
      : `rgba(${neutralRgb},${alpha * aScale})`;
    ctx.fill();
  });
}
