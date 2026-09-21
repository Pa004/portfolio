import type { ExperienceItemData } from "@/types";
import { links } from "@/lib/content";

export const experienceContent = {
  en: {
    label: "Career",
    title: "Experience & Research",
    subtitle: "Freelance work, academic distinction and published research.",
    current: "Current",
  },
  es: {
    label: "Trayectoria",
    title: "Experiencia e Investigación",
    subtitle: "Trabajo freelance, distinción académica e investigación publicada.",
    current: "Actual",
  },
};

export const experienceItems: ExperienceItemData[] = [
  {
    id: "freelance",
    role: {
      en: "Full Stack Developer (Freelance)",
      es: "Full Stack Developer (Freelance)",
    },
    organization: "Summer Dent · Roomify",
    period: "Freelance",
    location: "Remote · Ecuador",
    description: {
      en: "End-to-end development: architecture, backend, frontend, authentication and testing for a clinic system in production and an AI visualization platform.",
      es: "Desarrollo end-to-end: arquitectura, backend, frontend, autenticación y testing para un sistema clínico en producción y una plataforma de visualización con IA.",
    },
    tags: ["React", "Node.js", "Express", "Supabase", "Docker"],
    links: [
      { label: "Summer Dent", url: links.summerdent, color: "#5b8cff" },
      { label: "Roomify", url: "https://github.com/Pa004/roomify", color: "#06b6d4" },
    ],
    accent: "blue",
    current: true,
  },
  {
    id: "espe-distinction",
    role: {
      en: "Software Engineering Student",
      es: "Estudiante de Ingeniería de Software",
    },
    organization: "Universidad de las Fuerzas Armadas — ESPE",
    period: "2022 — Present",
    location: "Sangolquí, Ecuador",
    description: {
      en: "Scholarship for Academic Distinction — top quintile of the cohort. Focus on software architecture, databases, AI and full stack development.",
      es: "Beca por Distinción Académica — quintil superior de la cohorte. Enfoque en arquitectura de software, bases de datos, IA y desarrollo full stack.",
    },
    tags: ["Top quintile", "Scholarship", "Full Stack", "AI"],
    links: [],
    accent: "cyan",
    current: true,
  },
  {
    id: "ieee-bigdata",
    role: {
      en: "Co-author — IEEE BigData 2026 (under review)",
      es: "Coautor — IEEE BigData 2026 (en revisión)",
    },
    organization: "Cyberbullying detection in Ecuadorian Spanish",
    period: "2026",
    location: "Research",
    description: {
      en: "Comparative study of BETO, CNN1D and BiLSTM for automatic cyberbullying detection in social media. Notification: Oct 24, 2026.",
      es: "Estudio comparativo de BETO, CNN1D y BiLSTM para detección automática de ciberacoso en redes sociales. Notificación: 24 oct 2026.",
    },
    tags: ["BETO", "CNN1D", "BiLSTM", "NLP"],
    links: [
      { label: "IEEE BigData", url: "https://bigdataieee.org/BigData2026/calls/papers/", color: "#a78bfa" },
    ],
    accent: "purple",
    current: false,
  },
];
