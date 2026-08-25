export const glass = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as React.CSSProperties;

export const glassBlue = {
  background: "var(--glass-blue-bg)",
  border: "0.5px solid var(--glass-blue-border)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as React.CSSProperties;

export const gridBg = {
  backgroundImage: `
    linear-gradient(var(--grid-line-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px)
  `,
  backgroundSize: "32px 32px",
} as React.CSSProperties;