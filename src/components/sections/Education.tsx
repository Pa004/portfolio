"use client";

import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";
import EducationItem from "@/components/ui/EducationItem";
import {
  educationContent,
  educationItems,
} from "@/lib/copy/education";
import type { Lang } from "@/types";
interface EducationProps {
  lang: Lang;
}

export default function Education({ lang }: EducationProps) {
  const t = educationContent[lang];

  return (
    <section
      id="education"
      className="section-fade-top section-fade-bottom"
      style={{
        position: "relative",
        padding: "80px 24px 64px",
        overflow: "hidden",
      }}
    >
      <SectionBackground variant="neural" section="education" />
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionHeader
          lang={lang}
          label={t.label}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "19px",
              top: "8px",
              bottom: "8px",
              width: "1px",
              background:
                "linear-gradient(to bottom, var(--accent), var(--accent-cyan-icon), transparent)",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            {educationItems.map((item, i) => (
              <EducationItem
                key={item.id}
                item={item}
                index={i}
                lang={lang}
                copy={{ current: t.current, cert: t.cert }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
