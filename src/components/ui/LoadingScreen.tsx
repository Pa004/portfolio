"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const phases = [
    "Initializing...",
    "Loading modules...",
    "Building interface...",
    "Almost ready...",
  ];

  const phase = Math.min(Math.floor(progress / 25), phases.length - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 4 + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "var(--bg)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "32px",
          }}
        >
          {/* Grid background */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(var(--grid-line-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }} />

          {/* Glow */}
          <div style={{
            position: "absolute",
            width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.08) 0%, transparent 70%)",
            borderRadius: "50%", filter: "blur(40px)",
            pointerEvents: "none",
          }} />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "relative", zIndex: 1, textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.05em", color: "var(--text)", fontFamily: "var(--font-geist-sans)" }}>
              PD<span style={{ color: "var(--accent)" }}>.</span>
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", fontFamily: "monospace", letterSpacing: "0.15em" }}>
              PORTFOLIO
            </div>
          </motion.div>

          {/* Terminal block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              position: "relative", zIndex: 1,
              width: "280px",
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "12px", overflow: "hidden",
            }}
          >
            {/* Terminal bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: "var(--surface)", borderBottom: "0.5px solid var(--border)" }}>
              {["#ff5f57","#ffbd2e","#28c840"].map((c, i) => (
                <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
              <span style={{ marginLeft: "6px", fontSize: "10px", color: "var(--text-muted)", fontFamily: "monospace" }}>loading...</span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "11px" }}>
              <div style={{ color: "var(--accent-green-icon)", marginBottom: "6px" }}>❯ node portfolio.js</div>
              <div style={{ color: "var(--text-muted)", marginBottom: "8px" }}>
                {phases[phase]}
                <span style={{ animation: "blink 1s infinite" }}>_</span>
              </div>

              {/* Progress bar */}
              <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", background: "var(--accent)", borderRadius: "2px" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <span style={{ color: "var(--accent)", fontSize: "10px" }}>{Math.min(Math.floor(progress), 100)}%</span>
                <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>pablo@dev</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
