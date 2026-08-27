interface TerminalBarProps {
  label: string;
  dots?: string[];
}

const DEFAULT_DOTS = ["#ef4444", "#f59e0b", "#22c55e"];

export default function TerminalBar({ label, dots = DEFAULT_DOTS }: TerminalBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 16px",
        background: "var(--surface)",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      {dots.map((color) => (
        <span
          key={color}
          style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }}
        />
      ))}
      <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "8px", fontFamily: "monospace" }}>
        {label}
      </span>
    </div>
  );
}
