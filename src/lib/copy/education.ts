import type { EducationItemData } from "@/components/ui/EducationItem";

export const educationContent = {
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

export const educationItems: EducationItemData[] = [
  {
    id: "espe",
    type: "degree",
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
    accent: "blue",
    current: true,
  },
  {
    id: "datacamp-ai",
    type: "cert",
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
    accent: "cyan",
    current: false,
  },
  {
    id: "datacamp-de",
    type: "cert",
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
    accent: "purple",
    current: false,
  },
];
