import { Project, Skill } from "@/types";

export const projects: Project[] = [
  {
    id: "summer-dent",
    name: "Summer Dent",
    description: {
      en: "Full Stack dental clinic management system in production. Handles patients, appointments, treatments, inventory and finance modules.",
      es: "Sistema de gestión odontológica Full Stack en producción. Módulos de pacientes, citas, tratamientos, inventario y finanzas.",
    },
    tags: ["React", "Node.js", "Express", "Cypress"],
    liveUrl: "https://aplicacion-summer-dent.vercel.app/login",
    featured: true,
    status: "live",
    imageUrl: "/projects/summer-dent.svg",
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
    status: "deployed",
    imageUrl: "/projects/roomify.png",
  },
  {
    id: "secureauth-mern",
    name: "SecureAuth MERN",
    description: {
      en: "Complete authentication system with JWT, email verification, password recovery and protected routes.",
      es: "Sistema de autenticación completo con JWT, verificación por email, recuperación de contraseña y rutas protegidas.",
    },
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    repoUrl: "https://github.com/Pa004/SecureAuth-MERN",
    featured: false,
    status: "deployed",
  },
  {
    id: "monster-university",
    name: "Monster University",
    description: {
      en: "Academic management system built in two versions — Java + SQL Server and C# + MongoDB — demonstrating language versatility.",
      es: "Sistema de gestión académica en dos versiones — Java + SQL Server y C# + MongoDB — demostrando versatilidad de lenguajes.",
    },
    tags: ["Java", "C#", "MongoDB", "SQL Server"],
    repoUrl: "https://github.com/Pa004/monster-university-java-sqlserver",
    featured: false,
    status: "academic",
  },
];

export const skills: Skill[] = [
  {
    category: { en: "Frontend", es: "Frontend" },
    icon: "layout",
    items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
    color: "blue",
  },
  {
    category: { en: "Backend", es: "Backend" },
    icon: "server",
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "Auth"],
    color: "cyan",
  },
  {
    category: { en: "Databases", es: "Bases de datos" },
    icon: "database",
    items: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server", "Supabase"],
    color: "blue",
  },
  {
    category: { en: "AI / ML", es: "IA / ML" },
    icon: "brain",
    items: ["Python", "TensorFlow", "Neural Networks", "NLP", "Machine Learning"],
    color: "purple",
  },
  {
    category: { en: "Mobile", es: "Mobile" },
    icon: "device-mobile",
    items: ["Flutter", "Dart", "MVVM", "Clean Architecture", "Provider"],
    color: "cyan",
  },
  {
    category: { en: "Tools & DevOps", es: "Herramientas" },
    icon: "tools",
    items: ["Git", "Docker", "Cypress", "Postman", "Vercel", "Render"],
    color: "gray",
  },
  {
    category: { en: "Other Languages", es: "Otros lenguajes" },
    icon: "code",
    items: ["Java", "C#", "C++", "SQL", "Python"],
    color: "gray",
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