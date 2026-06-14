"use client";

import { motion } from "framer-motion";
import { links } from "@/lib/content";

type Lang = "en" | "es";

interface ProjectsProps {
  lang: Lang;
}

const projects = [
  {
    id: "summer-dent",
    name: "Summer Dent",
    description: {
      en: "Full Stack dental clinic management system in production with real users. Handles patients, appointments, treatments, inventory and finance modules.",
      es: "Sistema de gestión odontológica Full Stack en producción con usuarios reales. Módulos de pacientes, citas, tratamientos, inventario y finanzas.",
    },
    tags: ["React", "Node.js", "Express", "Cypress"],
    liveUrl: links.summerdent,
    featured: true,
    status: "live" as const,
    accent: "blue" as const,
  },
  {
    id: "roomify",
    name: "Roomify",
    description: {
      en: "AI-powered architectural visualization platform that transforms 2D floor plans into realistic rendered spaces.",
      es: "Plataforma de visualización arquitectónica con IA que transforma planos 2D en espacios renderizados realistas.",
    },
    tags: ["React 19", "TypeScript", "Tailwind", "Docker", "AI"],
    repoUrl: "https://github.com/Pa004/roomify",
    featured: true,
    status: "deployed" as const,
    accent: "cyan" as const,
  },
  {
    id: "secureauth",
    name: "SecureAuth MERN",
    description: {
      en: "Complete authentication system with JWT, email verification, password recovery and protected routes.",
      es: "Sistema de autenticación completo con JWT, verificación por email, recuperación de contraseña y rutas protegidas.",
    },
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    repoUrl: "https://github.com/Pa004/SecureAuth-MERN",
    featured: false,
    status: "deployed" as const,
    accent: "blue" as const,
  },
  {
    id: "monster-university",
    name: "Monster University",
    description: {
      en: "Academic management system built in two versions — Java + SQL Server and C# + MongoDB — demonstrating language versatility.",
      es: "Sistema de gestión académica en dos versiones — Java + SQL Server y C# + MongoDB — demostrando versatilidad de lenguajes.",
    },
    tags: ["Java", "C#", "MongoDB", "SQL Server"],
    repoUrl: "https://github.com/Pa004",
    featured: false,
    status: "academic" as const,
    accent: "gray" as const,
  },
];

const statusConfig = {
  live: {
    en: "Live",
    es: "En vivo",
    dot: "bg-emerald-400",
    badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  },
  deployed: {
    en: "Deployed",
    es: "Desplegado",
    dot: "bg-[#3b82f6]",
    badge: "bg-[#3b82f6]/10 text-[#93c5fd] border-[#3b82f6]/20",
  },
  academic: {
    en: "Academic",
    es: "Académico",
    dot: "bg-zinc-500",
    badge: "bg-white/[0.04] text-zinc-400 border-white/[0.08]",
  },
};

const accentMap = {
  blue: "hover:border-[#3b82f6]/30",
  cyan: "hover:border-[#06b6d4]/30",
  gray: "hover:border-white/20",
};

const tagAccent = {
  blue: "bg-[#3b82f6]/10 text-[#93c5fd] border-[#3b82f6]/20",
  cyan: "bg-[#06b6d4]/10 text-[#67e8f9] border-[#06b6d4]/20",
  gray: "bg-white/[0.04] text-zinc-400 border-white/[0.08]",
};

const content = {
  en: {
    label: "Work",
    title: "Featured Projects",
    subtitle: "A selection of projects I've built — from production systems to experimental ideas.",
    demo: "Live demo",
    repo: "Repository",
  },
  es: {
    label: "Proyectos",
    title: "Proyectos Destacados",
    subtitle: "Una selección de proyectos que he construido — desde sistemas en producción hasta ideas experimentales.",
    demo: "Ver demo",
    repo: "Repositorio",
  },
};

export default function Projects({ lang }: ProjectsProps) {
  const t = content[lang];

  return (
    <section id="projects" className="relative py-24 px-6">
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

        {/* Featured projects — large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => {
              const status = statusConfig[project.status];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`glass-blue rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${accentMap[project.accent]}`}
                >
                  {/* Top glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#3b82f6]/6 rounded-full blur-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-zinc-100 tracking-tight">
                      {project.name}
                    </h3>
                    <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${status.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${project.status === "live" ? "animate-blink" : ""}`} />
                      {status[lang]}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                    {project.description[lang]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded border ${tagAccent[project.accent]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-[#3b82f6] hover:text-[#93c5fd] transition-colors"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            {t.demo}
                        </a>
                    )}
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                            </svg>
                            {t.repo}
                        </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Secondary projects — smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => {
              const status = statusConfig[project.status];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`glass rounded-xl p-5 transition-all duration-300 ${accentMap[project.accent]}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-zinc-100">{project.name}</h3>
                    <span className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border ${status.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status[lang]}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    {project.description[lang]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded border ${tagAccent[project.accent]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-[#3b82f6] hover:text-[#93c5fd] transition-colors"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            {t.demo}
                        </a>
                    )}
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                            </svg>
                            {t.repo}
                        </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}