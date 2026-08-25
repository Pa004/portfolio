import { ReactNode, CSSProperties } from "react";

interface GradientTextProps {
  children: ReactNode;
  from?: string;
  to?: string;
  style?: CSSProperties;
}

export default function GradientText({
  children,
    from = "var(--accent)",
    to = "var(--accent-cyan-icon)",
  style,
}: GradientTextProps) {
  return (
    <span
      className="gradient-text"
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...style,
      }}
    >
      {children}
    </span>
  );
}