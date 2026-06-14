"use client";

import { motion, Variants } from "framer-motion";
import { gridBg } from "@/lib/styles";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import TypeWriter from "@/components/ui/TypeWriter";
import AvatarIllustration from "@/components/ui/AvatarIllustration";
import React from "react";

type Lang = "en" | "es";
interface HeroProps { lang?: Lang; }

const content = {
  en: {
    badge: "Available for opportunities",
    greeting: "Hi, I'm",
    role: "Software Engineering student at ESPE",
    description: "I build modern web experiences and intelligent systems. Focused on Frontend and Full Stack development, exploring AI and mobile.",
    cta_projects: "View projects",
    cta_contact: "Contact me",
    scroll: "Scroll to explore",
  },
  es: {
    badge: "Disponible para oportunidades",
    greeting: "Hola, soy",
    role: "Estudiante de Ingeniería de Software en ESPE",
    description: "Construyo experiencias web modernas y sistemas inteligentes. Enfocado en desarrollo Frontend y Full Stack, explorando IA y mobile.",
    cta_projects: "Ver proyectos",
    cta_contact: "Contáctame",
    scroll: "Scroll para explorar",
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function Hero({ lang = "en" }: HeroProps) {
  const t = content[lang];

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        ...gridBg,
      }}
    >
      {/* Particles */}
      <ParticleCanvas />

      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "25%", left: "25%", width: "288px", height: "288px", background: "rgba(59,130,246,0.08)", borderRadius: "50%", filter: "blur(64px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "25%", right: "25%", width: "224px", height: "224px", background: "rgba(6,182,212,0.06)", borderRadius: "50%", filter: "blur(64px)", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1152px", margin: "0 auto", padding: "96px 24px 64px", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "48px", flexWrap: "wrap" }}>

          {/* Left — text */}
          <div style={{ flex: 1, minWidth: "280px", maxWidth: "540px" }}>

            {/* Badge */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "20px", border: "0.5px solid rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.08)", marginBottom: "24px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", animation: "blink 2s infinite" }} />
              <span style={{ fontSize: "12px", color: "#93c5fd" }}>{t.badge}</span>
            </motion.div>

            {/* Name */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              <p style={{ fontSize: "14px", color: "#71717a", marginBottom: "4px" }}>{t.greeting}</p>
              <h1 style={{ fontSize: "clamp(48px, 7vw, 72px)", fontWeight: 900, letterSpacing: "-0.05em", color: "#f4f4f5", lineHeight: 1, marginBottom: "12px" }}>
                Pablo<br />
                Domínguez<span style={{ color: "#3b82f6" }}>.</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}
              style={{ fontSize: "18px", marginBottom: "8px", height: "32px", display: "flex", alignItems: "center" }}>
              <TypeWriter lang={lang} />
            </motion.div>

            {/* Role */}
            <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp}
              style={{ fontSize: "13px", color: "#71717a", marginBottom: "20px" }}>
              {t.role}
            </motion.p>

            {/* Description */}
            <motion.p custom={4} initial="hidden" animate="visible" variants={fadeUp}
              style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.7, marginBottom: "32px", maxWidth: "440px" }}>
              {t.description}
            </motion.p>

            {/* CTAs */}
            <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
              style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="#projects"
                style={{ padding: "10px 20px", borderRadius: "8px", background: "#3b82f6", color: "#fff", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
                {t.cta_projects}
              </a>
              <a href="#contact"
                style={{ padding: "10px 20px", borderRadius: "8px", border: "0.5px solid rgba(255,255,255,0.1)", color: "#d4d4d8", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
                {t.cta_contact}
              </a>
            </motion.div>

            {/* Scroll hint */}
            <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp}
              style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "48px", color: "#52525b" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{t.scroll}</span>
            </motion.div>
          </div>

          {/* Right — Avatar */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
            style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
            <AvatarIllustration />
          </motion.div>

        </div>
      </div>
    </section>
  );
}