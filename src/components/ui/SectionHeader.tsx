"use client";

import RevealSection from "@/components/ui/RevealSection";
import StaggerText from "@/components/ui/StaggerText";

type Lang = "en" | "es";

interface SectionHeaderProps {
  lang: Lang;
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <RevealSection>
      <div style={{ marginBottom: "56px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "8px",
          }}
        >
          {label}
        </p>
        <StaggerText
          text={title}
          style={{
            fontSize: "clamp(28px,4vw,36px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: subtitle ? "12px" : 0,
            background: "linear-gradient(135deg, var(--accent), var(--accent-cyan-icon), var(--accent))",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-shift 4s ease infinite",
          }}
        />
        {subtitle && (
          <p
            style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "28rem" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </RevealSection>
  );
}
