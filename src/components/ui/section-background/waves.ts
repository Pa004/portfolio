import type { TokenColors, WaveParticle } from "./types";

interface WaveRefs {
  t: { current: number };
  particles: { current: WaveParticle[] | null };
}

export function drawWaves(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  tokens: TokenColors,
  mx: number,
  my: number,
  hasMouse: boolean,
  refs: WaveRefs
): void {
  const accentRgb = tokens.accent;
  const cyanRgb = tokens.cyan;
  const violetRgb = tokens.violet;
  const greenRgb = tokens.green;
  const aScale = tokens.aScale;
  const mouseYInfluence = hasMouse ? (my / H - 0.5) * 20 : 0;
  const t = refs.t.current;

  const waves = [
    { amp: 35, freq: 0.008, speed: 1.0, color: accentRgb, alpha: 0.06 * aScale, yOffset: 0.25 },
    { amp: 25, freq: 0.012, speed: 1.5, color: cyanRgb, alpha: 0.05 * aScale, yOffset: 0.45 },
    { amp: 45, freq: 0.006, speed: 0.8, color: violetRgb, alpha: 0.05 * aScale, yOffset: 0.65 },
    { amp: 20, freq: 0.015, speed: 1.2, color: greenRgb, alpha: 0.04 * aScale, yOffset: 0.8 },
  ];

  waves.forEach((wave, i) => {
    ctx.beginPath();
    ctx.moveTo(0, H * wave.yOffset);
    for (let x = 0; x <= W; x += 2) {
      const mouseWarp = hasMouse
        ? Math.sin((x - mx) * 0.005) * 15 * Math.exp(-Math.abs(x - mx) / 300)
        : 0;
      const y = H * wave.yOffset + Math.sin(x * wave.freq + t * wave.speed) * wave.amp + mouseWarp + mouseYInfluence * (i * 0.3);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = `rgba(${wave.color},${wave.alpha})`;
    ctx.fill();
  });

  if (refs.particles.current === null) {
    refs.particles.current = Array.from({ length: 25 }, () => ({
      x: Math.random(),
      speed: Math.random() * 0.3 + 0.1,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      waveIndex: Math.floor(Math.random() * 4),
    }));
  }
  const waveParticles = refs.particles.current;

  waveParticles.forEach((p) => {
    p.x += p.speed * 0.001;
    if (p.x > 1) p.x = 0;
    const wave = waves[p.waveIndex];
    if (!wave) return;
    const px = p.x * W;
    const py = H * wave.yOffset + Math.sin(px * wave.freq + t * wave.speed) * wave.amp;
    ctx.beginPath();
    ctx.arc(px, py, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${wave.color},${p.alpha * aScale})`;
    ctx.fill();
  });

  const scanY = ((Math.sin(t * 0.3) + 1) / 2) * H;
  ctx.beginPath();
  ctx.moveTo(0, scanY);
  ctx.lineTo(W, scanY);
  ctx.strokeStyle = `rgba(${accentRgb},${0.06 * aScale})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}
