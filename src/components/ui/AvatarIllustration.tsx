"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type BadgeHue = "blue" | "cyan" | "violet";

const hueStyles: Record<BadgeHue, { color: string; border: string }> = {
  blue:   { color: "var(--accent)",             border: "rgba(var(--accent-rgb), 0.4)" },
  cyan:   { color: "var(--accent-cyan-icon)",   border: "rgba(var(--accent-cyan-rgb), 0.4)" },
  violet: { color: "var(--accent-violet-icon)", border: "rgba(var(--accent-violet-rgb), 0.4)" },
};

const allBadges: { label: string; hue: BadgeHue }[] = [
  { label: "React",       hue: "blue"   },
  { label: "Flutter",     hue: "cyan"   },
  { label: "Python",      hue: "violet" },
  { label: "Node.js",     hue: "blue"   },
  { label: "TypeScript",  hue: "cyan"   },
  { label: "TensorFlow",  hue: "violet" },
  { label: "MongoDB",     hue: "blue"   },
  { label: "Docker",      hue: "cyan"   },
  { label: "Next.js",     hue: "violet" },
  { label: "PostgreSQL",  hue: "blue"   },
  { label: "Tailwind",    hue: "cyan"   },
  { label: "Express.js",  hue: "violet" },
];

const lines = [
  { text: "const developer = {",                        color: "var(--text)", indent: 0  },
  { text: "  name: 'Pablo Domínguez',",                 color: "var(--accent-violet-icon)", indent: 1  },
  { text: "  role: 'Full Stack Developer',",            color: "var(--accent-violet-icon)", indent: 1  },
  { text: "  university: 'ESPE',",                      color: "var(--accent-violet-icon)", indent: 1  },
  { text: "  stack: [",                                 color: "var(--text)", indent: 1  },
  { text: "    'React', 'Next.js',",                    color: "var(--accent-cyan-icon)", indent: 2  },
  { text: "    'Node.js', 'Flutter',",                  color: "var(--accent-cyan-icon)", indent: 2  },
  { text: "    'Python', 'TypeScript',",                color: "var(--accent-cyan-icon)", indent: 2  },
  { text: "  ],",                                       color: "var(--text)", indent: 1  },
  { text: "  passion: 'Building things',",              color: "var(--accent-violet-icon)", indent: 1  },
  { text: "  available: true,",                         color: "var(--accent-green-icon)", indent: 1  },
  { text: "};",                                         color: "var(--text)", indent: 0  },
  { text: "",                                           color: "",        indent: 0  },
  { text: "developer.init();",                          color: "var(--accent-amber-icon)", indent: 0  },
  { text: "// ✓ Ready for new challenges",              color: "var(--terminal-comment)", indent: 0  },
];

export default function AvatarIllustration() {
  const reducedMotion = usePrefersReducedMotion();

  const [visibleLines, setVisibleLines] = useState(() =>
    reducedMotion ? lines.length : 0
  );
  const [cursorOn, setCursorOn] = useState(false);

  // Typewriter for code lines
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    let i = 0;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      if (i <= lines.length) {
        setVisibleLines(i);
        i++;
        const delay = i === lines.length ? 4000 : 90;
        setTimeout(() => {
          if (i > lines.length) {
            if (!cancelled) setCycle(c => c + 1);
          } else {
            type();
          }
        }, delay);
      }
    };

    type();
    return () => { cancelled = true; };
  }, [cycle, reducedMotion]);

  // Cursor blink
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => setCursorOn(p => !p), 530);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div aria-hidden="true" style={{ position: "relative", width: "340px", flexShrink: 0 }}>

      {/* Terminal window */}
      <div style={{
        background: "var(--terminal-bg)",
        border: "0.5px solid var(--terminal-border)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "var(--terminal-shadow)",
        backdropFilter: "blur(12px)",
        position: "relative",
        zIndex: 2,
      }}>

        {/* Title bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "10px 14px",
          background: "var(--terminal-titlebar-bg)",
          borderBottom: "0.5px solid var(--terminal-titlebar-border)",
        }}>
          {/* Traffic lights */}
          {["#ff5f57","#ffbd2e","#28c840"].map((c, i) => (
            <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.8 }} />
          ))}
          <span style={{ marginLeft: "8px", fontSize: "11px", color: "var(--terminal-title-text)", fontFamily: "monospace" }}>
            pablo@dev: ~/portfolio
          </span>
          {/* Glow dot */}
          <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-green-icon)", animation: "blink 2s infinite" }} />
        </div>

        {/* Code body */}
        <div style={{ padding: "16px 18px", fontFamily: "monospace", fontSize: "12px", lineHeight: "1.75", minHeight: "280px" }}>

          {/* Prompt line */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            <span style={{ color: "var(--accent-green-icon)" }}>❯</span>
            <span style={{ color: "var(--accent)" }}>node</span>
            <span style={{ color: "var(--text-muted)" }}>portfolio.js</span>
          </div>

          {/* Typed lines */}
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ display: "flex", minHeight: "21px" }}>
              {/* Line number */}
              <span style={{ color: "var(--terminal-line-number)", userSelect: "none", marginRight: "14px", minWidth: "16px", textAlign: "right", fontSize: "10px", paddingTop: "2px" }}>
                {i + 1}
              </span>
              {/* Code */}
              <span style={{ color: line.color || "transparent" }}>
                {line.text}
              </span>
              {/* Cursor on last visible line */}
              {i === visibleLines - 1 && visibleLines < lines.length && (
                <span style={{
                  display: "inline-block", width: "7px", height: "14px",
                  background: "var(--accent)", marginLeft: "1px", marginTop: "2px",
                  opacity: cursorOn ? 1 : 0, borderRadius: "1px",
                  transition: "opacity 0.1s",
                }} />
              )}
            </div>
          ))}

          {/* Idle cursor after typing done */}
          {visibleLines >= lines.length && (
            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
              <span style={{ color: "var(--accent-green-icon)" }}>❯</span>
              <span style={{
                display: "inline-block", width: "7px", height: "14px",
                background: "var(--accent-green-icon)", marginTop: "2px",
                opacity: cursorOn ? 1 : 0, borderRadius: "1px",
              }} />
            </div>
          )}
        </div>

        {/* Bottom status bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "6px 14px",
          background: "var(--accent-btn-bg)",
          fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.85)",
        }}>
          <span>● NORMAL</span>
          <span style={{ marginLeft: "auto" }}>portfolio.js</span>
          <span>UTF-8</span>
          <span>JS</span>
        </div>
      </div>

      {/* Vertical badge marquee — right side */}
      <div style={{
        position: "absolute",
        right: "-100px",
        top: "0",
        bottom: "0",
        width: "88px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          animation: "marquee-up 12s linear infinite",
        }}>
          {/* Double the badges for seamless loop */}
          {[...allBadges, ...allBadges].map((badge, i) => {
            const hue = hueStyles[badge.hue];
            return (
              <div key={i} style={{
                padding: "5px 8px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                boxSizing: "border-box" as const,
                borderRadius: "8px",
                background: "var(--terminal-badge-bg)",
                border: `0.5px solid ${hue.border}`,
                backdropFilter: "blur(8px)",
                fontSize: "10px",
                fontWeight: 600,
                color: hue.color,
                fontFamily: "monospace",
                boxShadow: `0 0 8px ${hue.border}`,
                textAlign: "center",
              }}>
                {badge.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Glow behind terminal */}
      <div style={{
        position: "absolute", inset: "-20px",
        background: "radial-gradient(ellipse at center, rgba(var(--accent-rgb), 0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
        filter: "blur(20px)",
      }} />

      <style>{`
        @keyframes marquee-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}