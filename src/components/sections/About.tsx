"use client";

import { motion } from "framer-motion";
import { glass, glassBlue } from "@/lib/styles";
import RevealSection from "@/components/ui/RevealSection";
import SectionBackground from "@/components/ui/SectionBackground";
import CounterStat from "@/components/ui/CounterStat";

type Lang = "en" | "es";
interface AboutProps { lang: Lang; }

const content = {
  en: {
    label: "About",
    title: "Who I am",
    bio1: "I'm a Software Engineering student at ESPE (Universidad de las Fuerzas Armadas), Ecuador. I'm passionate about building modern, intelligent web experiences that solve real problems.",
    bio2: "My focus is on Frontend and Full Stack development, with a growing interest in AI/ML and mobile development with Flutter. I enjoy turning complex ideas into clean, functional interfaces.",
    bio3: "Beyond code, I'm an active researcher with profiles on ORCID and ResearchGate, exploring the intersection of software engineering and emerging technologies.",
    interests: "Areas of interest",
    status: "Currently",
    statusText: "Open to opportunities & collaborations",
    location: "Quito, Ecuador",
    university: "ESPE — Software Engineering",
  },
  es: {
    label: "Sobre mí",
    title: "Quién soy",
    bio1: "Soy estudiante de Ingeniería de Software en la ESPE (Universidad de las Fuerzas Armadas), Ecuador. Me apasiona construir experiencias web modernas e inteligentes que resuelvan problemas reales.",
    bio2: "Mi enfoque está en el desarrollo Frontend y Full Stack, con un creciente interés en IA/ML y desarrollo móvil con Flutter. Disfruto transformar ideas complejas en interfaces limpias y funcionales.",
    bio3: "Más allá del código, soy investigador activo con perfiles en ORCID y ResearchGate, explorando la intersección entre la ingeniería de software y las tecnologías emergentes.",
    interests: "Áreas de interés",
    status: "Actualmente",
    statusText: "Abierto a oportunidades y colaboraciones",
    location: "Quito, Ecuador",
    university: "ESPE — Ingeniería de Software",
  },
};

const interests = [
  { en: "Software Architecture", es: "Arquitectura de Software", icon: "🏗️" },
  { en: "Frontend Development",  es: "Desarrollo Frontend",     icon: "🎨" },
  { en: "AI & Machine Learning", es: "IA y Machine Learning",   icon: "🤖" },
  { en: "Mobile Development",    es: "Desarrollo Mobile",       icon: "📱" },
  { en: "Design Patterns",       es: "Patrones de Diseño",      icon: "🧩" },
  { en: "Database Design",       es: "Diseño de Bases de Datos",icon: "🗄️" },
];

const statsData = [
  { value: 4,  suffix: "+", label: { en: "Projects built",    es: "Proyectos construidos" } },
  { value: 7,  suffix: "+", label: { en: "Technologies",      es: "Tecnologías"           } },
  { value: 2,  suffix: "+", label: { en: "Years learning",    es: "Años aprendiendo"      } },
  { value: 1,  suffix: "",  label: { en: "App in production", es: "App en producción"     } },
];

export default function About({ lang }: AboutProps) {
  const t = content[lang];

  return (
    <section id="about" style={{ position: "relative", padding: "80px 24px 64px", overflow: "hidden" }}>
      <SectionBackground variant="grid" />
      <div style={{ maxWidth: "1152px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <RevealSection>
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#3b82f6", marginBottom: "8px" }}>{t.label}</p>
            <h2 style={{ fontSize: "clamp(28px,4vw,36px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#f4f4f5", marginBottom: "12px" }}>{t.title}</h2>
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", alignItems: "start" }}>

          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[t.bio1, t.bio2, t.bio3].map((para, i) => (
              <p key={i} style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.8 }}>{para}</p>
            ))}

            {/* Info pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
              {[
                { icon: "📍", text: t.location },
                { icon: "🎓", text: t.university },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "8px", ...glass, fontSize: "12px", color: "#a1a1aa" }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Status badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", ...glassBlue, width: "fit-content", marginTop: "4px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", animation: "blink 2s infinite" }} />
              <span style={{ fontSize: "12px", color: "#93c5fd" }}>{t.status}:</span>
              <span style={{ fontSize: "12px", color: "#f4f4f5", fontWeight: 500 }}>{t.statusText}</span>
            </div>
          </motion.div>

          {/* Right — Stats + Interests */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Stats with counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}
            >
              {statsData.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ ...glass, borderRadius: "12px", padding: "20px", textAlign: "center" }}
                >
                  <div style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #3b82f6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    <CounterStat value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: "11px", color: "#71717a", marginTop: "4px" }}>{stat.label[lang]}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ ...glass, borderRadius: "12px", padding: "20px" }}
            >
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#52525b", marginBottom: "14px" }}>{t.interests}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {interests.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderRadius: "8px", background: "rgba(255,255,255,0.02)" }}
                  >
                    <span style={{ fontSize: "14px" }}>{item.icon}</span>
                    <span style={{ fontSize: "13px", color: "#a1a1aa" }}>{item[lang]}</span>
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