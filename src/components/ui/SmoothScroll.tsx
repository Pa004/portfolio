"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    setLenis(lenis);

    const onClickAnchor = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      lenis.scrollTo(href, { offset: -70 });
    };

    let running = true;
    function raf(time: number) {
      if (!running) return;
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);
    document.addEventListener("click", onClickAnchor);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
      document.removeEventListener("click", onClickAnchor);
    };
  }, []);

  return null;
}
