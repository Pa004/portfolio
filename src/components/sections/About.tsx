"use client";

import { motion } from "framer-motion";
import { glass, glassBlue } from "@/lib/styles";
import SectionBackground from "@/components/ui/SectionBackground";
import CounterStat from "@/components/ui/CounterStat";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealSection from "@/components/ui/RevealSection";
import {
  aboutContent,
  interests,
  statsData,
} from "@/lib/copy/about";
import type { Lang } from "@/types";

interface AboutProps {
  lang: Lang;
}

export default function About({ lang }: AboutProps) {
  const t = aboutContent[lang];

  return (
    <section
      id="about"
      className="section-fade-top section-fade-bottom"
      style={{
        position: "relative",
        padding: "80px 24px 64px",
        overflow: "hidden",
      }}
    >
      <SectionBackground variant="kinetic" section="about" />
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
          title={lang === "en" ? "Who I am" : "Quién soy"}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <RevealSection>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[t.bio1, t.bio2, t.bio3].map((para, i) => (
                  <p
                    key={i}
                    style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.8 }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </RevealSection>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              {[
                { icon: "📍", text: t.location },
                { icon: "🎓", text: t.university },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  whileHover={{ scale: 1.04, borderColor: "var(--accent-cyan-icon)", backgroundColor: "rgba(var(--accent-cyan-rgb),0.08)" }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    ...glass,
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    transition: "border-color 0.2s ease, background-color 0.2s ease",
                  }}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "12px",
                ...glassBlue,
                width: "fit-content",
                marginTop: "4px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--accent-green-icon)",
                  animation: "blink 2s infinite",
                }}
              />
              <span style={{ fontSize: "12px", color: "var(--accent-text)" }}>
                {t.status}:
              </span>
              <span
                style={{ fontSize: "12px", color: "var(--text)", fontWeight: 500 }}
              >
                {t.statusText}
              </span>
            </div>
          </motion.div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              {statsData.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{
                    scale: 1.04,
                    borderColor: "var(--accent-cyan-icon)",
                    boxShadow: "0 0 20px rgba(var(--accent-cyan-rgb),0.12)",
                  }}
                  style={{
                    ...glass,
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      background: "linear-gradient(135deg, var(--accent), var(--accent-cyan-icon))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <CounterStat value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label[lang]}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ ...glass, borderRadius: "12px", padding: "20px" }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "14px",
                }}
              >
                {t.interests}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "10px",
                }}
              >
                {interests.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(var(--accent-cyan-rgb),0.1)",
                      borderColor: "var(--accent-cyan-icon)",
                      boxShadow: "0 0 16px rgba(var(--accent-cyan-rgb),0.1)",
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 14px",
                      borderRadius: "6px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      cursor: "default",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    <span style={{ fontSize: "16px" }} aria-hidden="true">{item.icon}</span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--text)",
                        fontWeight: 500,
                      }}
                    >
                      {item[lang]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
