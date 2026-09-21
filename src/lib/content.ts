import { EducationItemData, Project, Skill } from "@/types";

export const projects: Project[] = [
  {
    id: "summer-dent",
    name: "Summer Dent",
    description: {
      en: "Full Stack dental clinic management system in production. Handles patients, appointments, treatments, inventory and finance modules.",
      es: "Sistema de gestión odontológica Full Stack en producción. Módulos de pacientes, citas, tratamientos, inventario y finanzas.",
    },
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Supabase"],
    liveUrl: "https://aplicacion-summer-dent.vercel.app/login",
    featured: true,
    status: "live",
    imageUrl: "/projects/summer-dent-logo.png",
  },
  {
    id: "scikick",
    name: "SciKick",
    description: {
      en: "Live football analytics: per-team Dixon-Coles blended with a LightGBM ensemble, bookmaker value check and scorer view. React + FastAPI on Cloudflare.",
      es: "Analítica de fútbol en vivo: Dixon-Coles por equipo combinado con ensemble LightGBM, value check contra bookmakers y vista de goleadores. React + FastAPI en Cloudflare.",
    },
    tags: ["React", "TypeScript", "FastAPI", "LightGBM", "Python"],
    liveUrl: "https://scikick.pages.dev",
    repoUrl: "https://github.com/Pa004/scikick",
    featured: true,
    status: "live",
    imageUrl: "/projects/scikick.png",
  },
  {
    id: "eventual",
    name: "Eventual",
    description: {
      en: "Event management system built solo end to end: 13/13 requirements, 137 passing tests, RBAC for 4 roles and a complete finance module.",
      es: "Sistema de gestión de eventos construido en solitario de punta a punta: 13/13 requisitos, 137 pruebas en verde, RBAC para 4 roles y módulo financiero completo.",
    },
    tags: ["Flutter", "Node.js", "Express", "Supabase", "BLoC"],
    repoUrl: "https://github.com/Pa004/Eventual",
    featured: true,
    status: "deployed",
    imageUrl: "/projects/eventual.png",
  },
  {
    id: "roomify",
    name: "Roomify",
    description: {
      en: "AI-powered architectural visualization platform that transforms 2D floor plans into realistic rendered spaces.",
      es: "Plataforma de visualización arquitectónica con IA que transforma planos 2D en espacios renderizados realistas.",
    },
    tags: ["React 19", "TypeScript", "Tailwind", "Docker", "Puter"],
    liveUrl: "https://puter.com/app/roomify-eqqi",
    repoUrl: "https://github.com/Pa004/roomify",
    featured: true,
    status: "live",
    imageUrl: "/projects/roomify.png",
  },
  {
    id: "chatcito",
    name: "Chatcito",
    description: {
      en: "Real-time Flutter chat with Firebase: secure auth, private messaging, FCM push notifications, Riverpod and Material 3.",
      es: "Chat Flutter en tiempo real con Firebase: autenticación segura, mensajería privada, push con FCM, Riverpod y Material 3.",
    },
    tags: ["Flutter", "Dart", "Firebase", "Riverpod"],
    repoUrl: "https://github.com/Pa004/chatcito",
    featured: false,
    status: "deployed",
    imageUrl: "/projects/chatcito.svg",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    description: {
      en: "Architecture erosion detector: 8 rules over tree-sitter dependency graphs, violation origins and regression tracking across git history.",
      es: "Detector de erosión de arquitectura: 8 reglas sobre grafos de dependencias tree-sitter, origen de violaciones y regresión en el historial git.",
    },
    tags: ["Python", "React", "FastAPI", "tree-sitter"],
    liveUrl: "https://sentinel-zxr.pages.dev",
    repoUrl: "https://github.com/Pa004/sentinel",
    featured: false,
    status: "live",
    imageUrl: "/projects/sentinel.svg",
  },
  {
    id: "e2e-apis",
    name: "e2e-APIs",
    description: {
      en: "Automated API and UI testing suite with Cypress and TypeScript: Page Object Model, custom commands, Mochawesome reports and GitHub Actions CI.",
      es: "Suite de testing automatizado de APIs y UI con Cypress y TypeScript: Page Object Model, comandos custom, reportes Mochawesome y CI con GitHub Actions.",
    },
    tags: ["Cypress", "TypeScript", "GitHub Actions", "Mochawesome"],
    repoUrl: "https://github.com/Pa004/e2e-APIs",
    featured: false,
    status: "deployed",
    imageUrl: "/projects/e2e-apis.svg",
  },
];

export const skills: Skill[] = [
  {
    category: { en: "Frontend", es: "Frontend" },
    icon: "layout",
    items: ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", "Vite"],
    color: "blue",
  },
  {
    category: { en: "Backend", es: "Backend" },
    icon: "server",
    items: ["Node.js", "Express.js", "Python", "FastAPI", "REST APIs", "JWT", "Auth"],
    color: "cyan",
  },
  {
    category: { en: "Databases", es: "Bases de datos" },
    icon: "database",
    items: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server", "Supabase", "SQLite"],
    color: "blue",
  },
  {
    category: { en: "AI / ML", es: "IA / ML" },
    icon: "brain",
    items: ["Python", "OpenAI API", "Embeddings", "LightGBM", "Neural Networks", "NLP", "Machine Learning"],
    color: "purple",
  },
  {
    category: { en: "Mobile", es: "Mobile" },
    icon: "device-mobile",
    items: ["Flutter", "Dart", "Firebase", "BLoC", "Riverpod", "MVVM", "Clean Architecture"],
    color: "cyan",
  },
  {
    category: { en: "Tools & DevOps", es: "Herramientas" },
    icon: "tools",
    items: ["Git", "Docker", "Cypress", "Postman", "Vercel", "Render", "GitHub Actions", "Jest", "Cloudflare"],
    color: "gray",
  },
  {
    category: { en: "Other Languages", es: "Otros lenguajes" },
    icon: "code",
    items: ["Java", "C#", "C++", "SQL", "Python"],
    color: "gray",
  },
];

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
    links: [
      {
        label: "DataCamp",
        url: "https://www.datacamp.com/certificate/AIEDA0010543717785",
        color: "#03ef62",
      },
    ],
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
    links: [
      {
        label: "DataCamp",
        url: "https://www.datacamp.com/certificate/DE0015585598056",
        color: "#03ef62",
      },
    ],
    accent: "purple",
    current: false,
  },
];

export const links = {
  github: "https://github.com/Pa004",
  linkedin: "https://www.linkedin.com/in/pabl004-dev",
  email: "pablodo004@gmail.com",
  researchgate: "https://www.researchgate.net/profile/Pablo-Dominguez-21",
  orcid: "https://orcid.org/0009-0000-6400-026X",
  summerdent: "https://aplicacion-summer-dent.vercel.app/login",
};