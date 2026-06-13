"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import TypeWriter from "@/components/ui/TypeWriter";
import AvatarIllustration from "@/components/ui/AvatarIllustration";

type Lang = "en" | "es";

const content = {
  en: {
    badge: "Available for opportunities",
    greeting: "Hi, I'm",
    role: "Software Engineering student at ESPE",
    description:
      "I build modern web experiences and intelligent systems. Focused on Frontend and Full Stack development, exploring AI and mobile.",
    cta_projects: "View projects",
    cta_contact: "Contact me",
    scroll: "Scroll to explore",
  },
  es: {
    badge: "Disponible para oportunidades",
    greeting: "Hola, soy",
    role: "Estudiante de Ingeniería de Software en ESPE",
    description:
      "Construyo experiencias web modernas y sistemas inteligentes. Enfocado en desarrollo Frontend y Full Stack, explorando IA y mobile.",
    cta_projects: "Ver proyectos",
    cta_contact: "Contáctame",
    scroll: "Scroll para explorar",
  },
};

interface HeroProps {
  lang?: Lang;
}

export default function Hero({ lang = "en" }: HeroProps) {
  const t = content[lang];

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="grid-bg absolute inset-0 pointer-events-none" />

      {/* Particles */}
      <ParticleCanvas />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#3b82f6]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-[#06b6d4]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left — text */}
          <div className="flex-1 max-w-xl">
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b82f6]/25 bg-[#3b82f6]/8 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-blink" />
              <span className="text-xs text-[#93c5fd]">{t.badge}</span>
            </motion.div>

            {/* Name */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              <p className="text-sm text-zinc-500 mb-1">{t.greeting}</p>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-100 leading-none mb-3">
                Pablo<br />
                Domínguez<span className="text-[#3b82f6]">.</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg mb-2 h-8 flex items-center"
            >
              <TypeWriter lang={lang} />
            </motion.div>

            {/* Role */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm text-zinc-500 mb-5"
            >
              {t.role}
            </motion.p>

            {/* Description */}
            <motion.p
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-md"
            >
              {t.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
                custom={5}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex flex-wrap gap-3"
            >
                <a
                    href="#projects"
                    className="px-5 py-2.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium transition-colors duration-200"
                >
                    {t.cta_projects}
                </a>

                <a
                    href="#contact"
                    className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm font-medium transition-all duration-200"
                >
                    {t.cta_contact}
                </a>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              custom={7}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-2 mt-12 text-zinc-600"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              <span className="text-xs tracking-widest uppercase">{t.scroll}</span>
            </motion.div>
          </div>

          {/* Right — Avatar */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="hidden md:flex flex-1 justify-center"
          >
            <AvatarIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}