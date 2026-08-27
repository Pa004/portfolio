"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { glass } from "@/lib/styles";
import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";
import FloatingBlob from "@/components/ui/FloatingBlob";
import { skills as skillData } from "@/lib/content";

import Tilt from "react-parallax-tilt";

type Lang = "en" | "es";
interface SkillsProps {
  lang: Lang;
}

const iconMap: Record<string, ReactNode> = {
  layout: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  server: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  ),
  database: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  brain: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  ),
  "device-mobile": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  tools: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L3 3.5l1.5-1.5L8.5 3.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
  code: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
};

const accentMap = {
  blue: {
    icon: "var(--accent)",
    rgb: "59,130,246",
    tag: {
      background: "var(--badge-bg)",
      color: "var(--accent-text)",
      border: "0.5px solid var(--badge-border)",
    },
  },
  cyan: {
    icon: "var(--accent-cyan-icon)",
    rgb: "6,182,212",
    tag: {
      background: "rgba(var(--accent-cyan-rgb), 0.1)",
      color: "var(--accent-cyan-text)",
      border: "0.5px solid rgba(var(--accent-cyan-rgb), var(--tag-border-alpha))",
    },
  },
  purple: {
    icon: "var(--accent-violet-icon)",
    rgb: "167,139,250",
    tag: {
      background: "rgba(var(--accent-violet-rgb), 0.1)",
      color: "var(--accent-violet-text)",
      border: "0.5px solid rgba(var(--accent-violet-rgb), var(--tag-border-alpha))",
    },
  },
  gray: {
    icon: "var(--text-muted)",
    rgb: "161,161,170",
    tag: {
      background: "var(--surface-dim)",
      color: "var(--text-muted)",
      border: "0.5px solid var(--border-dim)",
    },
  },
};

const content = {
  en: {
    label: "Expertise",
    title: "Skills & Technologies",
    subtitle: "Technologies I work with across the full development stack.",
  },
  es: {
    label: "Experiencia",
    title: "Skills & Tecnologías",
    subtitle: "Tecnologías con las que trabajo en todo el stack de desarrollo.",
  },
};

export default function Skills({ lang }: SkillsProps) {
  const t = content[lang];
  return (
    <section
      id="skills"
      className="section-fade-top section-fade-bottom"
      style={{
        position: "relative",
        padding: "80px 24px 64px",
        overflow: "hidden",
      }}
    >
      <SectionBackground variant="lattice" section="skills" />
      <FloatingBlob color1="rgba(var(--accent-rgb),0.4)" color2="rgba(var(--accent-cyan-rgb),0.25)" size={450} top="30%" left="85%" blur={110} />
      <FloatingBlob color1="rgba(var(--accent-green-rgb),0.3)" color2="rgba(var(--accent-rgb),0.2)" size={350} top="65%" left="5%" blur={90} />
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

        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {skillData.map((skill, i) => {
            const accent = accentMap[skill.color];
            const isLarge = skill.category.en === "Frontend" || skill.category.en === "Backend";
            return (
              <motion.div
                key={skill.category.en}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  gridColumn: isLarge ? "span 2" : "span 1",
                }}
              >
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  scale={1.02}
                  glareEnable
                  glareMaxOpacity={0.12}
                  glareColor={`rgb(${skill.color === "blue" ? "59,130,246" : skill.color === "cyan" ? "6,182,212" : skill.color === "purple" ? "167,139,250" : "161,161,170"})`}
                  glarePosition="all"
                  style={{ borderRadius: "12px", height: "100%" }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.04,
                      borderColor: accent.icon,
                      boxShadow: `0 0 20px rgba(${accent.rgb},0.12)`,
                    }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      ...glass,
                      borderColor: isLarge ? accent.icon : "var(--border)",
                      borderRadius: "12px",
                      padding: "20px",
                      height: "100%",
                      cursor: "default",
                      transitionProperty: "border-color, box-shadow, transform",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "16px",
                      }}
                    >
                      <span style={{ color: accent.icon }}>
                        {iconMap[skill.icon]}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--text)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {skill.category[lang]}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {skill.items.map((item) => (
                        <motion.span
                          key={item}
                          whileHover={{
                            scale: 1.08,
                            filter: "brightness(1.3)",
                            boxShadow: `0 0 12px rgba(${skill.color === "blue" ? "59,130,246" : skill.color === "cyan" ? "6,182,212" : skill.color === "purple" ? "167,139,250" : "161,161,170"},0.25)`,
                          }}
                          style={{
                            fontSize: "11px",
                            padding: "3px 10px",
                            borderRadius: "6px",
                            ...accent.tag,
                            cursor: "default",
                            display: "inline-block",
                            transition: "box-shadow 0.2s ease",
                          }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
