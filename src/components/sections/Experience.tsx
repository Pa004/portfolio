"use client";

import { motion } from "motion/react";
import { sectionContainer } from "@/lib/styles";
import SectionHeader from "@/components/ui/SectionHeader";
import { experienceContent, experienceItems } from "@/lib/copy/experience";
import type { Lang, ExperienceItemData } from "@/types";

interface ExperienceProps {
  lang: Lang;
}

export default function Experience({ lang }: ExperienceProps) {
  const t = experienceContent[lang];

  return (
    <section
      id="experience"
      className="section-fade-top section-fade-bottom"
      style={{
        position: "relative",
        padding: "80px 24px 64px",
        overflow: "hidden",
      }}
    >
      <div style={{ ...sectionContainer }}>
        <SectionHeader
          lang={lang}
          label={t.label}
          title={t.title}
          subtitle={t.subtitle}
        />
        <div>
          {experienceItems.map((item, i) => (
            <ExperienceRow
              key={item.id}
              item={item}
              index={i}
              lang={lang}
              currentLabel={t.current}
              isLast={i === experienceItems.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface RowProps {
  item: ExperienceItemData;
  index: number;
  lang: Lang;
  currentLabel: string;
  isLast: boolean;
}

function ExperienceRow({ item, index, lang, currentLabel, isLast }: RowProps) {
  return (
    <motion.article
      className="experience-row"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: "32px",
        padding: "32px 0",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <span
          style={{
            fontSize: "12px",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--text)",
            fontWeight: 600,
          }}
        >
          {item.period}
        </span>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          {item.location}
        </span>
        {item.current && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              color: "var(--accent-text)",
              marginTop: "4px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--accent-green-icon)",
                animation: "blink 2s infinite",
              }}
            />
            {currentLabel}
          </span>
        )}
      </div>

      <div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "4px",
          }}
        >
          {item.role[lang]}
        </h3>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--accent)",
            marginBottom: "12px",
          }}
        >
          {item.organization}
        </p>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth: "640px",
            marginBottom: "16px",
          }}
        >
          {item.description[lang]}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "6px",
                background: "var(--surface)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {tag}
            </span>
          ))}
          {item.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "6px",
                color: "var(--accent-text)",
                border: "0.5px solid var(--badge-border)",
                background: "var(--badge-bg)",
                textDecoration: "none",
              }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
