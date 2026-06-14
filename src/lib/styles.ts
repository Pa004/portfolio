export const glass = {
  background: "rgba(255,255,255,0.03)",
  border: "0.5px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as React.CSSProperties;

export const glassBlue = {
  background: "rgba(59,130,246,0.04)",
  border: "0.5px solid rgba(59,130,246,0.2)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as React.CSSProperties;

export const gridBg = {
  backgroundImage: `
    linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "32px 32px",
} as React.CSSProperties;