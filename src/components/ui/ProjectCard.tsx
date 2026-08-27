"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { glass, glassBlue } from "@/lib/styles";
import MagneticHover from "@/components/ui/MagneticHover";
import Tilt from "react-parallax-tilt";
import type { Lang, Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  accent: "cyan" | "blue" | "gray";
  lang: Lang;
  copy: { demo: string; repo: string };
}

const statusConfig = {
  live: {
    en: "Live",
    es: "En vivo",
    dot: "var(--accent-green-icon)",
    badge: {
      background: "rgba(var(--accent-green-rgb), 0.1)",
      color: "var(--accent-green-text)",
      border: "0.5px solid rgba(var(--accent-green-rgb), var(--tag-border-alpha))",
    },
    blink: true,
  },
  deployed: {
    en: "Deployed",
    es: "Desplegado",
    dot: "var(--accent)",
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
    background: "rgba(var(--accent-cyan-rgb), 0.1)",
    color: "var(--accent-cyan-text)",
    border: "0.5px solid rgba(var(--accent-cyan-rgb), var(--tag-border-alpha))",
  },
  gray: {
    background: "var(--surface-dim)",
    color: "var(--text-muted)",
    border: "0.5px solid var(--border-dim)",
  },
} satisfies Record<string, React.CSSProperties>;

export function resolveAccent(id: string, index: number): "cyan" | "blue" | "gray" {
  if (id === "roomify") return "cyan";
  if (id === "summer-dent") return "blue";
  if (index === 2) return "blue";
  return "gray";
}

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

const CodeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

export default function ProjectCard({ project, index, accent, lang, copy }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const tag = tagStyles[accent];
  const featured = project.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: featured ? 24 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: featured ? 0.5 : 0.4,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Tilt
        tiltMaxAngleX={featured ? 8 : 6}
        tiltMaxAngleY={featured ? 8 : 6}
        scale={1.02}
        glareEnable
        glareMaxOpacity={featured ? 0.15 : 0.1}
        glareColor={featured ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.15)"}
        glarePosition="all"
        style={{ borderRadius: featured ? "16px" : "12px" }}
      >
        <div
          style={{
            ...(featured ? glassBlue : glass),
            borderRadius: featured ? "16px" : "12px",
            padding: featured ? "24px" : "20px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {featured && project.imageUrl && (
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
                className="project-image"
                style={{ objectFit: "cover", transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
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

          {featured && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "160px",
                height: "160px",
                background:
                  "radial-gradient(circle, rgba(var(--accent-rgb), 0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          )}

          <ProjectHeader project={project} status={status} lang={lang} featured={featured} />
          <p
            style={{
              fontSize: featured ? "13px" : "12px",
              color: "var(--text-muted)",
              lineHeight: featured ? 1.7 : 1.6,
              marginBottom: featured ? "20px" : "16px",
            }}
          >
            {project.description[lang]}
          </p>
          <ProjectTags tags={project.tags} tag={tag} />
          <ProjectActions project={project} copy={copy} />
        </div>
      </Tilt>
    </motion.div>
  );
}

interface HeaderProps {
  project: Project;
  status: (typeof statusConfig)[Project["status"]];
  lang: Lang;
  featured: boolean;
}

function ProjectHeader({ project, status, lang, featured }: HeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: featured ? "16px" : "12px",
      }}
    >
      <h3
        style={{
          fontSize: featured ? "17px" : "14px",
          fontWeight: 700,
          color: "var(--text)",
          ...(featured ? { letterSpacing: "-0.02em" } : {}),
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
          padding: featured ? "3px 10px" : "2px 8px",
          borderRadius: "999px",
          ...status.badge,
        }}
      >
        <span
          style={{
            width: featured ? "6px" : "5px",
            height: featured ? "6px" : "5px",
            borderRadius: "50%",
            background: status.dot,
            animation: featured && status.blink ? "blink 2s infinite" : "none",
          }}
        />
        {status[lang]}
      </span>
    </div>
  );
}

function ProjectTags({ tags, tag }: { tags: string[]; tag: React.CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        marginBottom: "20px",
      }}
    >
      {tags.map((t) => (
        <span
          key={t}
          style={{
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "6px",
            ...tag,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectActions({ project, copy }: { project: Project; copy: { demo: string; repo: string } }) {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {project.liveUrl && (
        <MagneticHover strength={0.2}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            <ExternalIcon />
            {copy.demo}
          </a>
        </MagneticHover>
      )}
      {project.repoUrl && (
        <MagneticHover strength={0.2}>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            <CodeIcon />
            {copy.repo}
          </a>
        </MagneticHover>
      )}
    </div>
  );
}
