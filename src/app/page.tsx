"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

type Lang = "en" | "es";

const SectionDivider = () => (
  <div style={{
    height: "1px",
    background: "linear-gradient(to right, transparent, rgba(var(--accent-rgb), 0.15), transparent)",
    margin: "0 24px"
  }} />
);

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
      if (saved) return saved;
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
  };

  return (
    <main data-theme={theme} style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", transition: "background 0.3s, color 0.3s" }}>
      <Navbar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      <Hero lang={lang} />
      <SectionDivider />
      <About lang={lang} />
      <SectionDivider />
      <Skills lang={lang} />
      <SectionDivider />
      <Projects lang={lang} />
      <SectionDivider />
      <Education lang={lang} />
      <SectionDivider />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}