export type Variant = "waves" | "kinetic" | "lattice" | "stars" | "neural";
export type Section = "about" | "skills" | "projects" | "education";

export interface LatticePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulse: number;
  pulseSpeed: number;
}

export interface Meteor {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  active: boolean;
}

export interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulse: number;
  pulseSpeed: number;
}

export interface NeuralSignal {
  a: number;
  b: number;
  t: number;
  speed: number;
}

export interface WaveParticle {
  x: number;
  speed: number;
  size: number;
  alpha: number;
  waveIndex: number;
}

export interface StarNode {
  x: number;
  y: number;
  pulse: number;
}

export interface KineticRipple {
  x: number;
  y: number;
  born: number;
}

export interface TokenColors {
  accent: string;
  cyan: string;
  violet: string;
  green: string;
  aScale: number;
}
