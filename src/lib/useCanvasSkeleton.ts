"use client";

import { useEffect, useRef, type RefObject } from "react";

interface UseCanvasSkeletonOptions {
  draw: () => void;
  drawWhenReduced?: () => void;
  onThemeChange?: () => void;
}

export function useCanvasSkeleton(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { draw, drawWhenReduced, onThemeChange }: UseCanvasSkeletonOptions
) {
  const drawRef = useRef(draw);
  const reducedRef = useRef(drawWhenReduced);
  const themeRef = useRef(onThemeChange);

  useEffect(() => {
    drawRef.current = draw;
    reducedRef.current = drawWhenReduced;
    themeRef.current = onThemeChange;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    setSize();

    let animId: number | null = null;
    const loop = () => {
      drawRef.current();
      animId = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
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

    const onThemeChangeEvent = () => {
      themeRef.current?.();
      if (prefersReduced && reducedRef.current) reducedRef.current();
    };
    window.addEventListener("theme-change", onThemeChangeEvent);

    if (prefersReduced) reducedRef.current?.();
    else if (animId === null) loop();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("theme-change", onThemeChangeEvent);
    };
  }, [canvasRef]);
}
