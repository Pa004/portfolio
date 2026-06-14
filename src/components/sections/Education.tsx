"use client";

import { motion } from "framer-motion";

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
    tags: ["Software Architecture", "Design Patterns", "AI", "Databases", "Full Stack"],
    links: [
      {
        label: "ORCID",
        url: "https://orcid.org/0009-0000-6400-026X",
        color: "text-[#a6ce39]",
      },
      {
        label: "ResearchGate",
        url: "https://www.researchgate.net/profile/Pablo-Dominguez-21",
        color: "text-[#00d0af]",
      },
    ],
    accent: "blue" as const,
    current: true,
  },
  {
    id: "datacamp",
    type: "cert" as const,
    institution: "DataCamp",
    degree: {
      en: "AI Engineer for Developers Associate",
      es: "AI Engineer for Developers Associate",
    },
    period: "2025",
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
];

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

const accentColors = {
  blue: {
    border: "border-[#3b82f6]/40",
    dot: "bg-[#3b82f6]",
    ring: "ring-[#3b82f6]/20",
    tag: "bg-[#3b82f6]/10 text-[#93c5fd] border-[#3b82f6]/20",
    badge: "bg-[#3b82f6]/10 text-[#93c5fd] border-[#3b82f6]/25",
    icon: "text-[#3b82f6]",
  },
  cyan: {
    border: "border-[#06b6d4]/40",
    dot: "bg-[#06b6d4]",
    ring: "ring-[#06b6d4]/20",
    tag: "bg-[#06b6d4]/10 text-[#67e8f9] border-[#06b6d4]/20",
    badge: "bg-[#06b6d4]/10 text-[#67e8f9] border-[#06b6d4]/25",
    icon: "text-[#06b6d4]",
  },
};

export default function Education({ lang }: EducationProps) {
  const t = content[lang];

  return (
    <section id="education" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3b82f6] mb-2">
            {t.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
            {t.title}
          </h2>
          <p className="text-sm text-zinc-500 max-w-md">{t.subtitle}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#3b82f6]/40 via-[#06b6d4]/20 to-transparent" />

          <div className="flex flex-col gap-10">
            {educationItems.map((item, i) => {
              const accent = accentColors[item.accent];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex gap-6"
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full glass flex items-center justify-center ring-4 ${accent.ring} z-10`}>
                      {item.type === "degree" ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={accent.icon}>
                          <path strokeLinecap="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={accent.icon}>
                          <path strokeLinecap="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 glass rounded-xl p-6 border-l-2 ${accent.border} hover:border-opacity-60 transition-all duration-300 mb-2`}>
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-base font-bold text-zinc-100 tracking-tight">
                          {item.degree[lang]}
                        </h3>
                        <p className="text-sm text-zinc-400 mt-0.5">{item.institution}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${accent.badge}`}>
                          {item.current ? t.current : t.cert}
                        </span>
                        <span className="text-xs text-zinc-600">{item.period}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-600">
                        <path strokeLinecap="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span className="text-xs text-zinc-600">{item.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      {item.description[lang]}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-0.5 rounded border ${accent.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    {item.links.length > 0 && (
                      <div className="flex gap-4 pt-3 border-t border-white/[0.06]">
                        {item.links.map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1.5 text-xs ${link.color} hover:opacity-80 transition-opacity`}
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