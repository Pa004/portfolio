"use client";

import { motion } from "motion/react";
import { glass, sectionContainer } from "@/lib/styles";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";
import { accentColors } from "@/components/ui/EducationItem";
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
      <SectionBackground variant="kinetic" section="experience" />
      <div style={{ ...sectionContainer }}>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {experienceItems.map((item, i) => (
              <ExperienceCard
                key={item.id}
                item={item}
                index={i}
                lang={lang}
                currentLabel={t.current}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  item: ExperienceItemData;
  index: number;
  lang: Lang;
  currentLabel: string;
}

function ExperienceCard({ item, index, lang, currentLabel }: CardProps) {
  const accent = accentColors[item.accent];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", gap: "24px" }}
    >
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            ...glass,
            background: "var(--surface-elevated)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: accent.ring,
            position: "relative",
            zIndex: 10,
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: accent.dot,
            }}
          />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          ...glass,
          background: "var(--surface-elevated)",
          borderRadius: "12px",
          padding: "24px",
          borderLeft: accent.borderLeft,
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>
            {item.role[lang]}
          </h3>
          {item.current && (
            <span
              style={{
                fontSize: "11px",
                padding: "2px 10px",
                borderRadius: "999px",
                whiteSpace: "nowrap",
                ...accent.badge,
              }}
            >
              {currentLabel}
            </span>
          )}
        </div>
        <p style={{ fontSize: "13px", color: "var(--accent-text)", marginBottom: "4px" }}>
          {item.organization}
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
          {item.period} · {item.location}
        </p>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "16px" }}>
          {item.description[lang]}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: item.links.length > 0 ? "16px" : 0 }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", ...accent.tag }}
            >
              {tag}
            </span>
          ))}
        </div>
        {item.links.length > 0 && (
          <div style={{ display: "flex", gap: "16px" }}>
            {item.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "12px", color: link.color, textDecoration: "none" }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
