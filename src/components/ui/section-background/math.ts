export function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export function smoothstep(a: number): number {
  return a * a * (3 - 2 * a);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
