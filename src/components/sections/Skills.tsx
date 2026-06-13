"use client";

import { motion } from "framer-motion";

type Lang = "en" | "es";

interface SkillsProps {
  lang: Lang;
}

const skills = [
  {
    category: { en: "Frontend", es: "Frontend" },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
    accent: "blue" as const,
  },
  {
    category: { en: "Backend", es: "Backend" },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "Auth"],
    accent: "cyan" as const,
  },
  {
    category: { en: "Databases", es: "Bases de datos" },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    items: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server", "Supabase"],
    accent: "blue" as const,
  },
  {
    category: { en: "AI / ML", es: "IA / ML" },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
    items: ["Python", "TensorFlow", "Neural Networks", "NLP", "Machine Learning"],
    accent: "purple" as const,
  },
  {
    category: { en: "Mobile", es: "Mobile" },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    items: ["Flutter", "Dart", "MVVM", "Clean Architecture", "Provider"],
    accent: "cyan" as const,
  },
  {
    category: { en: "Tools & DevOps", es: "Herramientas" },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L3 3.5l1.5-1.5L8.5 3.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    items: ["Git", "Docker", "Cypress", "Postman", "Vercel", "Render"],
    accent: "gray" as const,
  },
  {
    category: { en: "Other Languages", es: "Otros lenguajes" },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    items: ["Java", "C#", "C++", "SQL", "Python"],
    accent: "gray" as const,
  },
];

const accentMap = {
  blue: {
    icon: "text-[#3b82f6]",
    tag: "bg-[#3b82f6]/10 text-[#93c5fd] border-[#3b82f6]/20",
    border: "hover:border-[#3b82f6]/30",
  },
  cyan: {
    icon: "text-[#06b6d4]",
    tag: "bg-[#06b6d4]/10 text-[#67e8f9] border-[#06b6d4]/20",
    border: "hover:border-[#06b6d4]/30",
  },
  purple: {
    icon: "text-[#a78bfa]",
    tag: "bg-[#a78bfa]/10 text-[#c4b5fd] border-[#a78bfa]/20",
    border: "hover:border-[#a78bfa]/30",
  },
  gray: {
    icon: "text-zinc-500",
    tag: "bg-white/[0.04] text-zinc-400 border-white/[0.08]",
    border: "hover:border-white/20",
  },
};

const content = {
  en: {
    label: "Expertise",
    title: "Skills & Technologies",
    subtitle: "Technologies I work with across the full development stack.",
  },
  es: {
    label: "Experiencia",
    title: "Skills & Tecnologías",
    subtitle: "Tecnologías con las que trabajo en todo el stack de desarrollo.",
  },
};

export default function Skills({ lang }: SkillsProps) {
  const t = content[lang];

  return (
    <section id="skills" className="relative py-24 px-6">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill, i) => {
            const accent = accentMap[skill.accent];
            return (
              <motion.div
                key={skill.category.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`glass rounded-xl p-5 transition-all duration-300 ${accent.border}`}
              >
                {/* Card header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className={accent.icon}>{skill.icon}</span>
                  <span className="text-xs font-semibold text-zinc-300 tracking-wide">
                    {skill.category[lang]}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className={`text-xs px-2 py-0.5 rounded border ${accent.tag}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}