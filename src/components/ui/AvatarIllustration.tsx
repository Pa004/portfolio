"use client";

import { useEffect, useState, useRef } from "react";

const allBadges = [
  { label: "React",       color: "#3b82f6", border: "rgba(59,130,246,0.4)"  },
  { label: "Flutter",     color: "#06b6d4", border: "rgba(6,182,212,0.4)"   },
  { label: "Python",      color: "#a78bfa", border: "rgba(167,139,250,0.4)" },
  { label: "Node.js",     color: "#3b82f6", border: "rgba(59,130,246,0.4)"  },
  { label: "TypeScript",  color: "#06b6d4", border: "rgba(6,182,212,0.4)"   },
  { label: "TensorFlow",  color: "#a78bfa", border: "rgba(167,139,250,0.4)" },
  { label: "MongoDB",     color: "#3b82f6", border: "rgba(59,130,246,0.4)"  },
  { label: "Docker",      color: "#06b6d4", border: "rgba(6,182,212,0.4)"   },
  { label: "Next.js",     color: "#a78bfa", border: "rgba(167,139,250,0.4)" },
  { label: "PostgreSQL",  color: "#3b82f6", border: "rgba(59,130,246,0.4)"  },
  { label: "Tailwind",    color: "#06b6d4", border: "rgba(6,182,212,0.4)"   },
  { label: "Express.js",  color: "#a78bfa", border: "rgba(167,139,250,0.4)" },
];

const positions = [
  { top: "4%",  left: "-10%" },
  { top: "4%",  right: "-10%" },
  { top: "38%", left: "-14%" },
  { top: "38%", right: "-14%" },
  { top: "72%", left: "-10%" },
  { top: "72%", right: "-10%" },
];

const lines = [
  { text: "const developer = {",                        color: "#f4f4f5", indent: 0  },
  { text: "  name: 'Pablo Domínguez',",                 color: "#a78bfa", indent: 1  },
  { text: "  role: 'Full Stack Developer',",            color: "#a78bfa", indent: 1  },
  { text: "  university: 'ESPE',",                      color: "#a78bfa", indent: 1  },
  { text: "  stack: [",                                 color: "#f4f4f5", indent: 1  },
  { text: "    'React', 'Next.js',",                    color: "#06b6d4", indent: 2  },
  { text: "    'Node.js', 'Flutter',",                  color: "#06b6d4", indent: 2  },
  { text: "    'Python', 'TypeScript',",                color: "#06b6d4", indent: 2  },
  { text: "  ],",                                       color: "#f4f4f5", indent: 1  },
  { text: "  passion: 'Building things',",              color: "#a78bfa", indent: 1  },
  { text: "  available: true,",                         color: "#22c55e", indent: 1  },
  { text: "};",                                         color: "#f4f4f5", indent: 0  },
  { text: "",                                           color: "",        indent: 0  },
  { text: "developer.init();",                          color: "#fbbf24", indent: 0  },
  { text: "// ✓ Ready for new challenges",              color: "#52525b", indent: 0  },
];

export default function AvatarIllustration() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [badges, setBadges]             = useState(allBadges.slice(0, 6));
  const [badgesVisible, setBadgesVisible] = useState(true);
  const [cursorOn, setCursorOn]         = useState(true);
  const hasTyped = useRef(false);

  // Typewriter for code lines
  useEffect(() => {
    if (hasTyped.current) return;
    hasTyped.current = true;
    let i = 0;
    const type = () => {
      if (i <= lines.length) {
        setVisibleLines(i);
        i++;
        setTimeout(type, i === lines.length ? 1000 : 90);
      } else {
        // restart
        setTimeout(() => {
          hasTyped.current = false;
          setVisibleLines(0);
        }, 4000);
      }
    };
    type();
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorOn(p => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // Badge rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setBadgesVisible(false);
      setTimeout(() => {
        const shuffled = [...allBadges].sort(() => Math.random() - 0.5);
        setBadges(shuffled.slice(0, 6));
        setBadgesVisible(true);
      }, 400);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "340px", flexShrink: 0 }}>

      {/* Terminal window */}
      <div style={{
        background: "rgba(9,9,11,0.92)",
        border: "0.5px solid rgba(59,130,246,0.25)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 40px rgba(59,130,246,0.08), 0 20px 60px rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        position: "relative",
        zIndex: 2,
      }}>

        {/* Title bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "10px 14px",
          background: "rgba(255,255,255,0.03)",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        }}>
          {/* Traffic lights */}
          {["#ff5f57","#ffbd2e","#28c840"].map((c, i) => (
            <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.8 }} />
          ))}
          <span style={{ marginLeft: "8px", fontSize: "11px", color: "#52525b", fontFamily: "monospace" }}>
            pablo@dev: ~/portfolio
          </span>
          {/* Glow dot */}
          <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", animation: "blink 2s infinite" }} />
        </div>

        {/* Code body */}
        <div style={{ padding: "16px 18px", fontFamily: "monospace", fontSize: "12px", lineHeight: "1.75", minHeight: "280px" }}>

          {/* Prompt line */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            <span style={{ color: "#22c55e" }}>❯</span>
            <span style={{ color: "#3b82f6" }}>node</span>
            <span style={{ color: "#a1a1aa" }}>portfolio.js</span>
          </div>

          {/* Typed lines */}
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ display: "flex", minHeight: "21px" }}>
              {/* Line number */}
              <span style={{ color: "#3f3f46", userSelect: "none", marginRight: "14px", minWidth: "16px", textAlign: "right", fontSize: "10px", paddingTop: "2px" }}>
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
                  background: "#3b82f6", marginLeft: "1px", marginTop: "2px",
                  opacity: cursorOn ? 1 : 0, borderRadius: "1px",
                  transition: "opacity 0.1s",
                }} />
              )}
            </div>
          ))}

          {/* Idle cursor after typing done */}
          {visibleLines >= lines.length && (
            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
              <span style={{ color: "#22c55e" }}>❯</span>
              <span style={{
                display: "inline-block", width: "7px", height: "14px",
                background: "#22c55e", marginTop: "2px",
                opacity: cursorOn ? 1 : 0, borderRadius: "1px",
              }} />
            </div>
          )}
        </div>

        {/* Bottom status bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "6px 14px",
          background: "#3b82f6",
          fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.85)",
        }}>
          <span>● NORMAL</span>
          <span style={{ marginLeft: "auto" }}>portfolio.js</span>
          <span>UTF-8</span>
          <span>JS</span>
        </div>
      </div>

      {/* Floating badges */}
      {positions.map((pos, i) => {
        const badge = badges[i];
        if (!badge) return null;
        return (
          <div key={`${badge.label}-${i}`} style={{
            position: "absolute", ...pos,
            padding: "4px 10px", borderRadius: "6px",
            background: "rgba(9,9,11,0.9)",
            border: `0.5px solid ${badge.border}`,
            backdropFilter: "blur(8px)",
            fontSize: "10px", fontWeight: 600,
            color: badge.color,
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            boxShadow: `0 0 10px ${badge.border}`,
            opacity: badgesVisible ? 1 : 0,
            transform: badgesVisible ? "translateY(0) scale(1)" : "translateY(4px) scale(0.95)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            animation: `float-${i % 3} ${3 + i * 0.5}s ease-in-out infinite`,
            zIndex: 3,
          }}>
            {badge.label}
          </div>
        );
      })}

      {/* Glow behind terminal */}
      <div style={{
        position: "absolute", inset: "-20px",
        background: "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
        filter: "blur(20px)",
      }} />

      <style>{`
        @keyframes float-0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes float-1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        @keyframes float-2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>
    </div>
  );
}