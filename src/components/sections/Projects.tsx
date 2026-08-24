"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { glass, glassBlue } from "@/lib/styles";
import { projects as projectData } from "@/lib/content";

import SectionBackground from "@/components/ui/SectionBackground";
import RevealSection from "@/components/ui/RevealSection";
import TiltCard from "@/components/ui/TiltCard";
import GradientText from "@/components/ui/GradientText";

type Lang = "en" | "es";
interface ProjectsProps {
  lang: Lang;
}

const projects = projectData.map((p, idx) => ({
  ...p,
  accent: p.id === "roomify" ? ("cyan" as const) : p.id === "summer-dent" ? ("blue" as const) : idx === 2 ? ("blue" as const) : ("gray" as const),
}));

const statusConfig = {
  live: {
    en: "Live",
    es: "En vivo",
    dot: "#22c55e",
    badge: {
      background: "rgba(34,197,94,0.1)",
      color: "#86efac",
      border: "0.5px solid rgba(34,197,94,0.2)",
    },
    blink: true,
  },
  deployed: {
    en: "Deployed",
    es: "Desplegado",
    dot: "#3b82f6",
    badge: {
      background: "var(--badge-bg)",
      color: "var(--accent-text)",
      border: "0.5px solid var(--badge-border)",
    },
    blink: false,
  },
  academic: {
    en: "Academic",
    es: "Académico",
    dot: "var(--text-muted)",
    badge: {
      background: "var(--surface)",
      color: "var(--text-muted)",
      border: "0.5px solid var(--border)",
    },
    blink: false,
  },
};

const tagStyles = {
  blue: {
    background: "var(--badge-bg)",
    color: "var(--accent-text)",
    border: "0.5px solid var(--badge-border)",
  },
  cyan: {
    background: "rgba(6,182,212,0.1)",
    color: "#67e8f9",
    border: "0.5px solid rgba(6,182,212,0.2)",
  },
  gray: {
    background: "rgba(255,255,255,0.04)",
    color: "#71717a",
    border: "0.5px solid rgba(255,255,255,0.08)",
  },
};

const content = {
  en: {
    label: "Work",
    title: "Featured Projects",
    subtitle:
      "A selection of projects I've built — from production systems to experimental ideas.",
    demo: "Live demo",
    repo: "Repository",
  },
  es: {
    label: "Proyectos",
    title: "Proyectos Destacados",
    subtitle:
      "Una selección de proyectos que he construido — desde sistemas en producción hasta ideas experimentales.",
    demo: "Ver demo",
    repo: "Repositorio",
  },
};

const ExternalIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

const CodeIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
    />
  </svg>
);

export default function Projects({ lang }: ProjectsProps) {
  const t = content[lang];

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        padding: "80px 24px 64px",
        overflow: "hidden",
      }}
    >
      <SectionBackground variant="orbs" />
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <RevealSection>
          <div style={{ marginBottom: "56px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#3b82f6",
                marginBottom: "8px",
              }}
            >
              {t.label}
            </p>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,36px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              <GradientText>{t.title}</GradientText>
            </h2>
            <p
              style={{ fontSize: "14px", color: "#71717a", maxWidth: "28rem" }}
            >
              {t.subtitle}
            </p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {projects
            .filter((p) => p.featured)
            .map((project, i) => {
              const status = statusConfig[project.status];
              const tag = tagStyles[project.accent];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <TiltCard
                    style={{
                      ...glassBlue,
                      borderRadius: "16px",
                      padding: "24px",
                      overflow: "hidden",
                    }}
                  >
                    {project.imageUrl && (
                      <div
                        style={{
                          position: "relative",
                          width: "calc(100% + 48px)",
                          height: "160px",
                          margin: "-24px -24px 20px -24px",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={project.imageUrl}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "40px",
                            background: "linear-gradient(to top, rgba(9,9,11,0.95), transparent)",
                            pointerEvents: "none",
                          }}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "160px",
                        height: "160px",
                        background:
                          "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "#f4f4f5",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {project.name}
                      </h3>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "11px",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          ...status.badge,
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: status.dot,
                            animation: status.blink
                              ? "blink 2s infinite"
                              : "none",
                          }}
                        />
                        {status[lang]}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#71717a",
                        lineHeight: 1.7,
                        marginBottom: "20px",
                      }}
                    >
                      {project.description[lang]}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "20px",
                      }}
                    >
                      {project.tags.map((tag2) => (
                        <span
                          key={tag2}
                          style={{
                            fontSize: "11px",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            ...tag,
                          }}
                        >
                          {tag2}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "#3b82f6",
                            textDecoration: "none",
                          }}
                        >
                          <ExternalIcon />
                          {t.demo}
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "#71717a",
                            textDecoration: "none",
                          }}
                        >
                          <CodeIcon />
                          {t.repo}
                        </a>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => {
              const status = statusConfig[project.status];
              const tag = tagStyles[project.accent];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <TiltCard
                    style={{ ...glass, borderRadius: "12px", padding: "20px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#f4f4f5",
                        }}
                      >
                        {project.name}
                      </h3>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "11px",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          ...status.badge,
                        }}
                      >
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: status.dot,
                          }}
                        />
                        {status[lang]}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#71717a",
                        lineHeight: 1.6,
                        marginBottom: "16px",
                      }}
                    >
                      {project.description[lang]}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "16px",
                      }}
                    >
                      {project.tags.map((tag2) => (
                        <span
                          key={tag2}
                          style={{
                            fontSize: "11px",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            ...tag,
                          }}
                        >
                          {tag2}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "#3b82f6",
                            textDecoration: "none",
                          }}
                        >
                          <ExternalIcon />
                          {t.demo}
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "#71717a",
                            textDecoration: "none",
                          }}
                        >
                          <CodeIcon />
                          {t.repo}
                        </a>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
