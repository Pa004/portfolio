"use client";

import { motion } from "framer-motion";
import { glass } from "@/lib/styles";

import SectionBackground from "@/components/ui/SectionBackground";
import RevealSection from "@/components/ui/RevealSection";
import GradientText from "@/components/ui/GradientText";

type Lang = "en" | "es";
interface EducationProps {
  lang: Lang;
}

const educationItems = [
  {
    id: "espe",
    type: "degree" as const,
    institution: "Universidad de las Fuerzas Armadas — ESPE",
    degree: {
      en: "Bachelor's in Software Engineering",
      es: "Ingeniería de Software",
    },
    period: "2022 — Present",
    location: "Sangolquí, Ecuador",
    description: {
      en: "Studying software architecture, design patterns, databases, AI, and full stack development. Active researcher with profiles on ORCID and ResearchGate.",
      es: "Estudio de arquitectura de software, patrones de diseño, bases de datos, IA y desarrollo full stack. Investigador activo con perfiles en ORCID y ResearchGate.",
    },
    tags: [
      "Software Architecture",
      "Design Patterns",
      "AI",
      "Databases",
      "Full Stack",
    ],
    links: [
      {
        label: "ORCID",
        url: "https://orcid.org/0009-0000-6400-026X",
        color: "#a6ce39",
      },
      {
        label: "ResearchGate",
        url: "https://www.researchgate.net/profile/Pablo-Dominguez-21",
        color: "#00d0af",
      },
    ],
    accent: "blue" as const,
    current: true,
  },
  {
    id: "datacamp-ai",
    type: "cert" as const,
    institution: "DataCamp",
    degree: {
      en: "AI Engineer for Developers Associate",
      es: "AI Engineer for Developers Associate",
    },
    period: "Jun 2026 — Jun 2028",
    location: "Online",
    description: {
      en: "Certification focused on building AI-powered applications using the OpenAI API, including embeddings, semantic search and conversational systems.",
      es: "Certificación enfocada en construir aplicaciones potenciadas con IA usando la API de OpenAI, incluyendo embeddings, búsqueda semántica y sistemas conversacionales.",
    },
    tags: ["OpenAI API", "Embeddings", "Semantic Search", "AI Engineering"],
    links: [],
    accent: "cyan" as const,
    current: false,
  },
  {
    id: "datacamp-de",
    type: "cert" as const,
    institution: "DataCamp",
    degree: {
      en: "Data Engineer Certificate",
      es: "Data Engineer Certificate",
    },
    period: "Jun 2026 — Jun 2028",
    location: "Online",
    description: {
      en: "Certification covering data engineering fundamentals including data pipelines, ETL processes, data warehousing and modern data infrastructure.",
      es: "Certificación que cubre los fundamentos de ingeniería de datos incluyendo pipelines, procesos ETL, almacenamiento de datos e infraestructura moderna.",
    },
    tags: ["Data Pipelines", "ETL", "Data Warehousing", "Data Infrastructure"],
    links: [],
    accent: "purple" as const,
    current: false,
  },
];

const accentColors = {
  blue: {
    borderLeft: "2px solid var(--accent)",
    dot: "var(--accent)",
    ring: "0 0 0 4px var(--glass-blue-bg)",
    tag: {
      background: "var(--badge-bg)",
      color: "var(--accent-text)",
      border: "0.5px solid var(--badge-border)",
    },
    badge: {
      background: "var(--badge-bg)",
      color: "var(--accent-text)",
      border: "0.5px solid var(--badge-border)",
    },
    icon: "var(--accent)",
  },
  cyan: {
    borderLeft: "2px solid var(--accent-cyan-icon)",
    dot: "var(--accent-cyan-icon)",
    ring: "0 0 0 4px var(--glass-blue-bg)",
    tag: {
      background: "rgba(var(--accent-cyan-rgb), 0.1)",
      color: "var(--accent-cyan-text)",
      border: "0.5px solid rgba(var(--accent-cyan-rgb), var(--tag-border-alpha))",
    },
    badge: {
      background: "rgba(var(--accent-cyan-rgb), 0.1)",
      color: "var(--accent-cyan-text)",
      border: "0.5px solid rgba(var(--accent-cyan-rgb), var(--tag-border-alpha-strong))",
    },
    icon: "var(--accent-cyan-icon)",
  },
  purple: {
    borderLeft: "2px solid var(--accent-violet-icon)",
    dot: "var(--accent-violet-icon)",
    ring: "0 0 0 4px var(--glass-blue-bg)",
    tag: {
      background: "rgba(var(--accent-violet-rgb), 0.1)",
      color: "var(--accent-violet-text)",
      border: "0.5px solid rgba(var(--accent-violet-rgb), var(--tag-border-alpha))",
    },
    badge: {
      background: "rgba(var(--accent-violet-rgb), 0.1)",
      color: "var(--accent-violet-text)",
      border: "0.5px solid rgba(var(--accent-violet-rgb), var(--tag-border-alpha-strong))",
    },
    icon: "var(--accent-violet-icon)",
  },
};

const content = {
  en: {
    label: "Background",
    title: "Education & Certifications",
    subtitle: "Academic formation and professional certifications.",
    current: "Current",
    cert: "Certificate",
  },
  es: {
    label: "Formación",
    title: "Educación y Certificaciones",
    subtitle: "Formación académica y certificaciones profesionales.",
    current: "En curso",
    cert: "Certificado",
  },
};

export default function Education({ lang }: EducationProps) {
  const t = content[lang];

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
      <SectionBackground variant="grid" section="education" />
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
                color: "var(--accent)",
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
              style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "28rem" }}
            >
              {t.subtitle}
            </p>
          </div>
        </RevealSection>

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
            {educationItems.map((item, i) => {
              const accent = accentColors[item.accent];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  style={{ display: "flex", gap: "24px" }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        ...glass,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: accent.ring,
                        position: "relative",
                        zIndex: 10,
                      }}
                    >
                      {item.type === "degree" ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={accent.icon}
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={accent.icon}
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      ...glass,
                      borderRadius: "12px",
                      padding: "24px",
                      borderLeft: accent.borderLeft,
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "var(--text)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {item.degree[lang]}
                        </h3>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "var(--text-muted)",
                            marginTop: "2px",
                          }}
                        >
                          {item.institution}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "3px 10px",
                            borderRadius: "20px",
                            fontWeight: 500,
                            ...accent.badge,
                          }}
                        >
                          {item.current ? t.current : t.cert}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          {item.period}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "12px",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#52525b"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        {item.location}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        lineHeight: 1.7,
                        marginBottom: "16px",
                      }}
                    >
                      {item.description[lang]}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: item.links.length > 0 ? "16px" : "0",
                      }}
                    >
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "11px",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            ...accent.tag,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.links.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          paddingTop: "16px",
                          borderTop: "0.5px solid var(--border)",
                        }}
                      >
                        {item.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "12px",
                              color: link.color,
                              textDecoration: "none",
                            }}
                          >
                            <svg
                              width="11"
                              height="11"
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
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
