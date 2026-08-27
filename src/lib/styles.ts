const blur = {
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as const;

export const glass = {
  ...blur,
  background: "var(--surface)",
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow-glass)",
} as React.CSSProperties;

export const glassBlue = {
  ...blur,
  background: "var(--glass-blue-bg)",
  border: "0.5px solid var(--glass-blue-border)",
} as React.CSSProperties;

export const cardGlass = {
  ...blur,
  background: "var(--surface-card)",
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow-card)",
} as React.CSSProperties;

export const gridBg = {
  backgroundImage: `
    linear-gradient(var(--grid-line-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px)
  `,
  backgroundSize: "32px 32px",
} as React.CSSProperties;