"use client";

import { useCallback, useEffect, useRef } from "react";
import { useCanvasSkeleton } from "@/lib/useCanvasSkeleton";
import { readThemeTokens } from "./section-background/tokens";
import { drawKinetic } from "./section-background/kinetic";
import { drawLattice } from "./section-background/lattice";
import { drawStars } from "./section-background/stars";
import { drawNeural } from "./section-background/neural";
import { drawWaves } from "./section-background/waves";
import type {
  KineticRipple,
  LatticePoint,
  Meteor,
  NeuralNode,
  NeuralSignal,
  Section,
  StarNode,
  Variant,
  WaveParticle,
} from "./section-background/types";

interface SectionBackgroundProps {
  variant: Variant;
  section?: Section;
}

export default function SectionBackground({ variant, section }: SectionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const latticeRef = useRef<LatticePoint[] | null>(null);
  const starsRef = useRef<StarNode[] | null>(null);
  const starsMeteorsRef = useRef<Meteor[] | null>(null);
  const neuralNodesRef = useRef<NeuralNode[] | null>(null);
  const neuralSignalsRef = useRef<NeuralSignal[] | null>(null);
  const kineticRipplesRef = useRef<KineticRipple[]>([]);
  const waveParticlesRef = useRef<WaveParticle[] | null>(null);
  const tRef = useRef(0);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const tokens = readThemeTokens();
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const hasMouse = mx >= 0 && !!section;

    ctx.clearRect(0, 0, W, H);

    switch (variant) {
      case "kinetic":
        drawKinetic(ctx, W, H, tokens.accent, tokens.aScale, mx, my, hasMouse, kineticRipplesRef.current);
        break;
      case "lattice":
        drawLattice(ctx, W, H, tokens, mx, my, hasMouse, latticeRef);
        break;
      case "stars":
        drawStars(ctx, W, H, tokens, mx, my, hasMouse, section, { nodes: starsRef, meteors: starsMeteorsRef });
        break;
      case "neural":
        drawNeural(ctx, W, H, tokens, mx, my, hasMouse, { nodes: neuralNodesRef, signals: neuralSignalsRef });
        break;
      case "waves":
        tRef.current += 0.02;
        drawWaves(ctx, W, H, tokens, mx, my, hasMouse, { t: tRef, particles: waveParticlesRef });
        break;
    }
  }, [variant, section]);

  useCanvasSkeleton(canvasRef, {
    draw: paint,
    drawWhenReduced: paint,
  });

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

    const onClick = (e: MouseEvent) => {
      if (
        variant !== "kinetic" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) return;
      kineticRipplesRef.current.push({
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height),
        born: performance.now(),
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
    };
  }, [variant, section]);

  return (
    <div
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
