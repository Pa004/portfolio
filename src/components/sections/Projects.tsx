"use client";

import { projects as projectData } from "@/lib/content";
import { projectsContent } from "@/lib/copy/projects";

import SectionBackground from "@/components/ui/SectionBackground";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard, { resolveAccent } from "@/components/ui/ProjectCard";
import { sectionContainer } from "@/lib/styles";
import type { Lang, Project } from "@/types";

interface ProjectsProps {
  lang: Lang;
}

export default function Projects({ lang }: ProjectsProps) {
  const t = projectsContent[lang];

  const allProjects: Project[] = projectData;
  const featured = allProjects.filter((p) => p.featured);
  const rest = allProjects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="section-fade-top section-fade-bottom"
      style={{
        position: "relative",
        padding: "80px 24px 64px",
        overflow: "hidden",
      }}
    >
      <SectionBackground variant="stars" section="projects" />
      <div style={{ ...sectionContainer }}>
        <SectionHeader
          lang={lang}
          label={t.label}
          title={t.title}
          subtitle={t.subtitle}
        />

        <ProjectGrid projects={featured} lang={lang} copy={t} className="projects-featured-grid" />
        <ProjectGrid projects={rest} lang={lang} copy={t} className="projects-rest-grid" />
      </div>
    </section>
  );
}

interface ProjectGridProps {
  projects: Project[];
  lang: Lang;
  copy: typeof projectsContent["en"];
  className: string;
}

function ProjectGrid({ projects, lang, copy, className }: ProjectGridProps) {
  if (projects.length === 0) return null;
  return (
    <div className={className}>
      {projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={i}
          accent={resolveAccent(project.id, projectData.indexOf(project))}
          lang={lang}
          copy={{ demo: copy.demo, repo: copy.repo }}
        />
      ))}
    </div>
  );
}
